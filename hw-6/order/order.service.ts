import { OrderCreateEntity } from './order.entity';
import { OrderModel } from './order.repository';

export function createOrder(userId: string, order: OrderCreateEntity) {
  const newOrder = OrderModel.create(userId, order);

  return {
    order: newOrder,
  };
}
