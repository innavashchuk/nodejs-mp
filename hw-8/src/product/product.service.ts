import { ProductModel } from './product.repository';

export async function getProducts() {
  return (await ProductModel.getAll()) ?? [];
}

export async function getProductById(productId: string) {
  return await ProductModel.getById(productId);
}
