import { Schema, model } from 'mongoose';

export interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
}

export const productSchema = new Schema<ProductEntity>({
  title: String,
  description: String,
  price: Number,
});

export const Product = model('Product', productSchema);
