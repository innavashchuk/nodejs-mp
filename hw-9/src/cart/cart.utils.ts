import { ProductEntity } from '../product/product.entity';
import { CartItemEntity } from './cart.entity';

export function calculateTotalPrice(
  items: { product: ProductEntity; count: number }[]
): number {
  return items.reduce((sum, item) => sum + item.product.price * item.count, 0);
}
