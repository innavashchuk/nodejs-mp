import { randomUUID } from 'node:crypto';
import { CartEntity, CartItemEntity } from './cart.entity';

const carts: CartEntity[] = [];

export const CartModel = {
  get(userId: string): CartEntity | null {
    return (
      carts.find((cart) => !cart.isDeleted && cart.userId === userId) ?? null
    );
  },
  create(userId: string): CartEntity {
    const newCart: CartEntity = {
      id: randomUUID(),
      isDeleted: false,
      items: [],
      userId,
    };

    const oldCart = carts.find(
      (cart) => !cart.isDeleted && cart.userId === userId
    );

    if (oldCart) oldCart.isDeleted = true;

    carts.push(newCart);

    return newCart;
  },
  update(
    userId: string,
    { id, items }: { id: string; items: CartItemEntity[] }
  ) {
    const cartToUpdate = carts.find(
      (cart) => !cart.isDeleted && cart.id === id && cart.userId === userId
    );

    if (cartToUpdate) {
      cartToUpdate.items = items;
    }

    return cartToUpdate ?? null;
  },
  delete(userId: string) {
    const cartToDelete = carts.find(
      (cart) => !cart.isDeleted && cart.userId === userId
    );

    if (cartToDelete) cartToDelete.isDeleted = true;

    return cartToDelete ?? null;
  },
};
