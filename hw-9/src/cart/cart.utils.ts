import { type ProductEntity } from '../product/product.entity';

export function calculateTotalPrice(
  items: Array<{ product: ProductEntity; count: number }>
): number {
  return items.reduce((sum, item) => sum + item.product.price * item.count, 0);
}
