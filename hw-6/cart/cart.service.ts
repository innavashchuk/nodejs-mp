import { CartItemEntity } from './cart.entity';
import { CartModel } from './cart.repository';
import { calculateTotalPrice } from './cart.utils';

export function getCart(userId: string) {
  const cart = CartModel.get(userId);

  if (cart === null) return cart;

  return {
    cart: { id: cart.id, items: cart.items },
    totalPrice: calculateTotalPrice(cart.items),
  };
}

export function createCart(userId: string) {
  const newCart = CartModel.create(userId);

  return {
    cart: {
      id: newCart.id,
      items: newCart.items,
    },
    totalPrice: 0,
  };
}

export function updateCart(
  userId: string,
  { id, items }: { id: string; items: CartItemEntity[] }
) {
  const updatedCart = CartModel.update(userId, { id, items });

  if (updatedCart === null) {
    return updatedCart;
  }

  return {
    cart: {
      id: updatedCart.id,
      items: updatedCart.items,
    },
    totalPrice: calculateTotalPrice(updatedCart.items),
  };
}

export function deleteCart(userId: string) {
  CartModel.delete(userId);

  return {
    success: true,
  };
}
