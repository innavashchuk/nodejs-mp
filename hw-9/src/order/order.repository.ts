import { Order, OrderCreateEntity } from './order.entity';
import { calculateTotalPrice } from '../cart/cart.utils';

export const OrderModel = {
  async create(user: string, order: OrderCreateEntity) {
    const newOrder = {
      user,
      totalPrice: calculateTotalPrice(order.items),
      ...order,
    };

    return await Order.create(newOrder);
  },
};
