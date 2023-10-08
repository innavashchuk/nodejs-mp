import { CartItemEntity } from '../cart/cart.entity';

type OrderStatus = 'created' | 'completed';

export interface OrderEntity {
  id: string; 
  userId: string;
  cartId: string;
  items: CartItemEntity[]; 
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
