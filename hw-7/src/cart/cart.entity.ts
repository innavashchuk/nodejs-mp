import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Ref,
} from '@mikro-orm/core';
import { Product, ProductEntity } from '../product/product.entity';
import { randomUUID } from 'node:crypto';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

@Entity()
export class Cart {
  @PrimaryKey()
  id: string = randomUUID();

  @ManyToOne('User', { ref: true })
  user!: Ref<User>;

  @Property()
  isDeleted!: boolean;

  @OneToMany('CartItem', 'cart')
  items = new Collection<CartItem>(this);
}

@Entity()
export class CartItem {
  @PrimaryKey()
  id: string = randomUUID();

  @ManyToOne('Product', { ref: true })
  product!: Ref<Product>;

  @Property()
  count!: number;

  @ManyToOne('Cart')
  cart!: Cart;

  @ManyToMany()
  order!: Order;
}
