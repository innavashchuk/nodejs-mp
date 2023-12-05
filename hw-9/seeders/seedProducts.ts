import { Product } from '../src/product/product.entity';

const products = [
  new Product({
    title: 'Book',
    description: 'Interesting book',
    price: 200,
  }),
  new Product({
    title: 'Pen',
    description: 'Cute pen',
    price: 20,
  }),
];

export async function seedProducts() {
  await Product.deleteMany().exec();
  await Promise.all(products.map(async (product) => await product.save()));
}
