import { ProductModel } from './product.repository';

export async function getProducts() {
  return ProductModel.getAll() ?? [];
}

export function getProductById(productId: string) {
  return ProductModel.getById(productId);
}
