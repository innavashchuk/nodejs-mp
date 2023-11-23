import { Collection } from '@mikro-orm/core';
import { CartItem } from './cart.entity';

export function calculateTotalPrice(items: Collection<CartItem>) {
  return items.reduce((sum, item) => sum + item.product.price * item.count, 0);
}
