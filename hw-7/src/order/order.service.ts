import { OrderCreateEntity } from './order.entity';
import { OrderModel } from './order.repository';

export async function createOrder(userId: string, order: OrderCreateEntity) {
  const newOrder = await OrderModel.create(userId, order);

  return {
    order: newOrder,
  };
}
