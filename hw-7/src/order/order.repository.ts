import { Order, OrderCreateEntity } from './order.entity';
import { calculateTotalPrice } from '../cart/cart.utils';
import { DI } from '..';

export const OrderModel = {
  async create(userId: string, order: OrderCreateEntity) {
    const {
      cartId,
      items,
      payment: {
        type: paymentType,
        address: paymentAddress,
        creditCard: paymentCreditCard,
      },
      delivery: { address: deliveryAddress, type: deliveryType },
      comments,
    } = order;
    const newOrder = {
      items,
      paymentType,
      paymentAddress,
      paymentCreditCard,
      deliveryAddress,
      deliveryType,
      comments,
      status: 'created' as const,
      totalPrice: calculateTotalPrice(items as any),
    };
    const user = await DI.userRepository.findOne({ id: userId });
    const cart = await DI.cartRepository.findOne({ id: cartId });

    if (!cart || !user) throw new Error('Something went wrong');

    const createdOrder = DI.em.create(
      Order,
      { ...newOrder, user, cart },
      { persist: true }
    );

    return createdOrder;
  },
};
