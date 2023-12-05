import { CartModel } from './cart.repository';
import { calculateTotalPrice } from './cart.utils';

export async function getCart(userId: string) {
  const cart = await CartModel.get(userId);

  if (cart === null) return cart;

  return {
    cart: { id: cart.id, items: cart.items },
    totalPrice: calculateTotalPrice(cart.items),
  };
}

export async function createCart(userId: string) {
  const newCart = await CartModel.create(userId);

  return {
    cart: {
      id: newCart.id,
      items: newCart.items,
    },
    totalPrice: 0,
  };
}

export async function updateCart(
  userId: string,
  { productId, count }: { productId: string; count: number }
) {
  const updatedCart = await CartModel.update(userId, { productId, count });

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

export async function deleteCart(userId: string) {
  await CartModel.delete(userId);

  return {
    success: true,
  };
}
