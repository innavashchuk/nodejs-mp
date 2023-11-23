import express from 'express';
import { Server } from 'http';
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { authMiddleware } from './middleware/auth';
import { errorMiddleware } from './middleware/error';
import { headerMiddleware } from './middleware/header';
import { CART_ROUTE, cartRouter } from './cart/cart.controller';
import { PRODUCT_ROUTE, productRouter } from './product/product.controller';
import config from './mikro-orm.config';
import { Cart } from './cart/cart.entity';
import { Product } from './product/product.entity';
import { Order } from './order/order.entity';
import { User } from './user/user.entity';

const PORT = 3005;
const BASE_URL = '/api';

export const DI = {} as {
  server: Server;
  orm: MikroORM;
  em: EntityManager;
  cartRepository: EntityRepository<Cart>;
  productRepository: EntityRepository<Product>;
  orderRepository: EntityRepository<Order>;
  userRepository: EntityRepository<User>;
};

const app = express();
const router = express.Router();

export const init = (async () => {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.orderRepository = DI.orm.em.getRepository(Order);
  DI.userRepository = DI.orm.em.getRepository(User);

  app.use(express.json());
  app.use(async (_req, _res, next) => {
    const orm = await MikroORM.init<PostgreSqlDriver>(config);
    RequestContext.create(orm.em, next);
  });
  app.use(authMiddleware, headerMiddleware);
  router.use(CART_ROUTE, cartRouter);
  router.use(PRODUCT_ROUTE, productRouter);
  app.use(BASE_URL, router);
  app.use(errorMiddleware);

  DI.server = app.listen(PORT, () => {
    console.log(`App started and listening on port ${PORT}`);
  });
})();
