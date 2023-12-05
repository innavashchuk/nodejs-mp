import { validateId } from '../utils';
import { Product } from './product.entity';

export const ProductModel = {
  async getAll() {
    const products = await Product.find().exec();
    return products;
  },

  async getById(id: string) {
    if (!validateId(id)) return null;

    const product = await Product.findById(id).exec();
    return (
      product && {
        id: product.id.toString(),
        description: product.description,
        title: product.title,
        price: product.price,
      }
    );
  },
};
