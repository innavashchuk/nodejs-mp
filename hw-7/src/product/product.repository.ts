import { DI } from '..';

export const ProductModel = {
  async getAll() {
    return DI.productRepository.findAll();
  },
  async getById(productId: string) {
    return DI.productRepository.findOne({ id: productId });
  },
};
