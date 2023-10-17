import express from 'express';

import { CART_ROUTE, cartRouter } from './cart/cart.controller';
import { PRODUCT_ROUTE, productRouter } from './product/product.controller';
import { authMiddleware } from './order/middleware/auth';
import { headerMiddleware } from './order/middleware/header';
import { errorMiddleware } from './order/middleware/error';

const PORT = 3005;
const BASE_URL = '/api';

const app = express();
const router = express.Router();

app.use(express.json());

app.use(authMiddleware, headerMiddleware);
router.use(CART_ROUTE, cartRouter);
router.use(PRODUCT_ROUTE, productRouter);
app.use(BASE_URL, router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
