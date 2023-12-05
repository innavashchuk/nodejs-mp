import 'dotenv/config';

import express, { Router } from 'express';
import mongoose from 'mongoose';
import { errorMiddleware } from './middleware/error';
import { headerMiddleware } from './middleware/header';
import { CART_ROUTE, cartRouter } from './cart/cart.controller';
import { PRODUCT_ROUTE, productRouter } from './product/product.controller';
import { verifyToken } from './middleware/verifyToken';
import { AUTH_ROUTE, userRouter } from './user/user.controller';

const PORT = 3005;
const BASE_URL = '/api';

const app = express();
const pubRouter = Router();
const authRouter = Router();
mongoose.connect('mongodb://127.0.0.1:27017/node_gmp_auth', {
  authSource: 'admin',
  user: 'node_gmp_auth',
  pass: 'password123',
});
mongoose.set('debug', true);

app.use(express.json());

app.use(headerMiddleware);

pubRouter.use(AUTH_ROUTE, userRouter);

authRouter.use(CART_ROUTE, verifyToken, cartRouter);
authRouter.use(PRODUCT_ROUTE, verifyToken, productRouter);

app.use(BASE_URL, pubRouter, authRouter);
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`App started and listening on port ${PORT}`);
});

server.on('close', () => {
  mongoose.connection.close();
});
