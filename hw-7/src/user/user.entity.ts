import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';
import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity';

export interface UserEntity {
  id: string;
}

@Entity()
export class User {
  @PrimaryKey()
  id: string = randomUUID();

  @Property()
  name!: string;

  @OneToMany('Cart', 'user')
  carts = new Collection<Cart>(this);

  @OneToMany('Order', 'user')
  orders = new Collection<Order>(this);
}
