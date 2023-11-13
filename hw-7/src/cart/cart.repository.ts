import { Cart, CartItemEntity } from './cart.entity';
import { DI } from '..';
import { wrap } from '@mikro-orm/core';

export const CartModel = {
  async get(userId: string) {
    return DI.cartRepository.findOne({ user: userId, isDeleted: false });
  },
  async create(userId: string) {
    const newCart = {
      isDeleted: false,
      items: [],
      userId,
    };

    const createdCart = DI.em.create(Cart, { ...newCart, user: userId });
    await DI.em.persistAndFlush(createdCart);

    return createdCart;
  },
  async update(
    userId: string,
    { id, items }: { id: string; items: CartItemEntity[] }
  ) {
    const cartToUpdate = await DI.cartRepository.findOne({
      isDeleted: false,
      user: userId,
      id,
    });

    if (cartToUpdate) {
      wrap(cartToUpdate).assign({ ...cartToUpdate, items });
      await DI.em.persistAndFlush(cartToUpdate);
    }

    return cartToUpdate ?? null;
  },
  async delete(userId: string) {
    const cartToDelete = await DI.cartRepository.findOne({ user: userId });

    wrap(cartToDelete).assign({ ...cartToDelete, isDeleted: true });

    await DI.em.flush();

    return cartToDelete ?? null;
  },
};
