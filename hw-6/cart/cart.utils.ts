import { CartItemEntity } from "./cart.entity";

export function calculateTotalPrice(items: CartItemEntity[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.count, 0);
}
