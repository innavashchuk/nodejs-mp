import { ProductModel } from './product.repository';

export function getProducts() {
  return ProductModel.getAll() ?? [];
}

export function getProductById(productId: string) {
  return ProductModel.getById(productId);
}
