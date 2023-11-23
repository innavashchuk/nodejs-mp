import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  Ref,
} from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';
import { Cart, CartItem, CartItemEntity } from '../cart/cart.entity';
import { User } from '../user/user.entity';

type OrderStatus = 'created' | 'completed';

export interface OrderEntity {
  id: string; // uuid
  userId: string;
  cartId: string;
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
  status: OrderStatus;
  totalPrice: number;
}

export type OrderCreateEntity = Omit<
  OrderEntity,
  'id' | 'userId' | 'status' | 'totalPrice'
>;

@Entity()
export class Order {
  @PrimaryKey()
  id: string = randomUUID();

  @ManyToOne('User', { ref: true })
  user!: Ref<User>;

  @OneToOne('Cart', { ref: true })
  cart!: Ref<Cart>;

  @ManyToMany()
  items = new Collection<CartItem>(this);

  @Property()
  paymentType!: string;

  @Property()
  paymentAddress?: string;

  @Property()
  paymentCreditCard?: string;

  @Property()
  deliveryType!: string;

  @Property()
  deliveryAddress!: string;

  @Property()
  comments!: string;

  @Enum({ items: ['created', 'completed'] })
  status = 'created';

  @Property()
  totalPrice!: number;
}
