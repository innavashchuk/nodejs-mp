import express from 'express';
import mongoose from 'mongoose';
import { authMiddleware } from './middleware/auth';
import { errorMiddleware } from './middleware/error';
import { headerMiddleware } from './middleware/header';
import { CART_ROUTE, cartRouter } from './cart/cart.controller';
import { PRODUCT_ROUTE, productRouter } from './product/product.controller';

const PORT = 3005;
const BASE_URL = '/api';

const app = express();
const router = express.Router();
mongoose.connect('mongodb://127.0.0.1:27017/node_gmp', {
  authSource: 'admin',
  user: 'node_gmp',
  pass: 'password123',
});
mongoose.set('debug', true);

app.use(express.json());

app.use(authMiddleware, headerMiddleware);
router.use(CART_ROUTE, cartRouter);
router.use(PRODUCT_ROUTE, productRouter);
app.use(BASE_URL, router);
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`App started and listening on port ${PORT}`);
});

server.on('close', () => {
  mongoose.connection.close();
});
