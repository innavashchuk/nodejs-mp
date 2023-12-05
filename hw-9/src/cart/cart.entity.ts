import { Schema, model } from 'mongoose';
import { type ProductEntity } from '../product/product.entity';
import { type UserEntity } from '../user/user.entity';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
  cart: CartEntity;
}

export interface CartEntity {
  user: UserEntity;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export const cartItemSchema = new Schema<CartItemEntity>({
  count: Number,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
});

export const cartSchema = new Schema<CartEntity>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  isDeleted: Boolean,
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CartItem',
    },
  ],
});

export const Cart = model('Cart', cartSchema);
export const CartItem = model('CartItem', cartItemSchema);
