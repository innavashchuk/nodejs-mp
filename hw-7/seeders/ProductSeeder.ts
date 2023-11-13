import type { EntityManager, RequiredEntityData } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../src/product/product.entity';

const products: RequiredEntityData<Product>[] = [
  {
    id: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
    title: 'Book',
    description: 'Interesting book',
    price: 200,
  },
  {
    id: 'afdd68c4-d359-45e6-b9fd-c8fdb2a162a0',
    title: 'Pen',
    description: 'Cute pen',
    price: 20,
  },
];

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    products.forEach((product) => {
      em.create(Product, product);
    });
  }
}
