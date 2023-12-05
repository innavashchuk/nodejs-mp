import { Schema, model } from 'mongoose';

import { type CartItemEntity } from '../cart/cart.entity';

type OrderStatus = 'created' | 'completed';

export interface OrderEntity {
  user: Schema.Types.ObjectId;
  cart: Schema.Types.ObjectId;
  items: CartItemEntity[]; // products from CartEntity
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status?: OrderStatus;
  totalPrice: number;
}

export type OrderCreateEntity = Omit<
  OrderEntity,
  'id' | 'user' | 'status' | 'totalPrice'
>;

export const orderSchema = new Schema<OrderEntity>({
  user: Schema.Types.ObjectId,
  cart: Schema.Types.ObjectId,
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CartItem',
    },
  ],
  payment: {
    type: { type: String },
    address: String,
    creditCard: String,
  },
  delivery: {
    type: { type: String },
    address: String,
  },
  comments: String,
  status: { type: String, enum: ['created', 'completed'], default: 'created' },
});

export const Order = model('Order', orderSchema);
