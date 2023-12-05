import 'dotenv/config';

import express, { Router } from 'express';
import mongoose from 'mongoose';
import debug from 'debug';
import { type Socket } from 'net';

// Middleware
import { errorMiddleware } from './middleware/error';
import { headerMiddleware } from './middleware/header';
import { verifyToken } from './middleware/verifyToken';
import { loggerMiddleware } from './middleware/logger';

// Routers
import { CART_ROUTE, cartRouter } from './cart/cart.controller';
import { PRODUCT_ROUTE, productRouter } from './product/product.controller';
import { AUTH_ROUTE, userRouter } from './user/user.controller';

const PORT = process.env.PORT ?? 3000;
const BASE_URL = process.env.BASE_URL ?? '';

const app = express();
const pubRouter = Router();
const authRouter = Router();
const connectionUrl = `${process.env.MONGO_URL}/${process.env.MONGO_DB}`;

void (async () => {
  await mongoose.connect(connectionUrl, {
    authSource: 'admin',
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  });
})();
mongoose.set('debug', process.env.DEBUG_MODE === 'enabled');

app.use(express.json());

app.use(headerMiddleware);
app.use(loggerMiddleware);

const healthDebugLog = debug('health');

app.get('/health', (_req, res) => {
  void (async () => {
    try {
      await mongoose.connection.db.command({ ping: 1 });
      res
        .status(200)
        .send({ data: { message: 'Application is healthy' }, error: null });
    } catch (error) {
      healthDebugLog('Failed to connect to database:\n' + String(error));
      res.status(500).send({
        data: null,
        error: { message: 'Error connecting to database' },
      });
    }
  })();
});

pubRouter.use(AUTH_ROUTE, userRouter);

authRouter.use(CART_ROUTE, verifyToken, cartRouter);
authRouter.use(PRODUCT_ROUTE, verifyToken, productRouter);

app.use(BASE_URL, pubRouter, authRouter);
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`App started and listening on port ${PORT}`);
});

server.on('close', () => {
  void (async () => {
    await mongoose.connection.close();
  })();
});

// Graceful shutdown
let connections: Socket[] = [];

server.on('connection', (connection) => {
  // register connections
  connections.push(connection);

  // remove/filter closed connections
  connection.on('close', () => {
    connections = connections.filter(
      (currentConnection) => currentConnection !== connection
    );
  });
});

function shutdown(): void {
  console.log('Received kill signal, shutting down gracefully');

  void (async () => {
    await mongoose.connection.close();
  })();

  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down'
    );
    process.exit(1);
  }, 20000);

  // end current connections
  connections.forEach((connection) => connection.end());

  // then destroy connections
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
