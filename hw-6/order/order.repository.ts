import { randomUUID } from 'node:crypto';
import { OrderCreateEntity, OrderEntity } from './order.entity';
import { calculateTotalPrice } from '../cart/cart.utils';

const orders: OrderEntity[] = [];

export const OrderModel = {
  create(userId: string, order: OrderCreateEntity) {
    const { cartId, items, payment, delivery, comments } = order;
    const newOrder = {
      id: randomUUID(),
      userId,
      cartId,
      items,
      payment,
      delivery,
      comments,
      status: 'created' as const,
      totalPrice: calculateTotalPrice(items),
    };

    orders.push(newOrder);

    return newOrder;
  },
};
