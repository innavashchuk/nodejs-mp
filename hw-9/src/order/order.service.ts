import { type OrderCreateEntity } from './order.entity';
import { OrderModel } from './order.repository';

export async function createOrder(user: string, order: OrderCreateEntity) {
  const newOrder = await OrderModel.create(user, order);

  return {
    order: newOrder,
  };
}
