import { Router } from 'express';
import debug from 'debug';
import { createOrder } from '../order/order.service';
import { isAdmin } from '../middleware/isAdmin';
import { createCart, deleteCart, getCart, updateCart } from './cart.service';
import { cartValidation, checkoutValidation } from './cart.validation';

const checkoutDebugLog = debug('checkout');

export const CART_ROUTE = '/profile/cart';

const cartRouter = Router();

cartRouter.post('/', (req, res) => {
  void (async () => {
    const userId = req.headers['x-user-id'] as string;
    const newCartData = await createCart(userId);

    res.status(201).send({
      data: newCartData,
      error: null,
    });
  })();
});

cartRouter.get('/', (req, res) => {
  void (async () => {
    const userId = req.headers['x-user-id'] as string;
    const cartData = await getCart(userId);

    if (cartData === null) {
      return res.status(404).send({ data: null, error: 'No cart found' });
    }

    res.send({ data: cartData, error: null });
  })();
});

cartRouter.put('/', cartValidation, (req, res) => {
  void (async () => {
    const userId = req.headers['x-user-id'] as string;
    const { productId, count } = req.body;
    const updatedCartData = await updateCart(userId, { productId, count });

    if (updatedCartData === null) {
      return res.status(404).send({ data: null, error: 'No cart found' });
    }

    res.send({ data: updatedCartData, error: null });
  })();
});

cartRouter.delete('/', isAdmin, (req, res) => {
  void (async () => {
    const userId = req.headers['x-user-id'] as string;

    const deleteResult = await deleteCart(userId);

    res.send({
      data: deleteResult,
      error: null,
    });
  })();
});

cartRouter.post('/checkout', checkoutValidation, (req, res) => {
  void (async () => {
    const userId = req.headers['x-user-id'] as string;
    const cartData = await getCart(userId);
    const { payment, delivery, comments } = req.body;

    if (cartData === null) {
      checkoutDebugLog('No cart found');
      return res.status(404).send({ data: null, error: 'No cart found' });
    }

    const { cart } = cartData;

    const orderData = await createOrder(userId, {
      cart: cart.id,
      items: cart.items,
      payment,
      delivery,
      comments,
    });

    checkoutDebugLog('Checkout completed with\n' + String(orderData));

    res.send({ data: orderData, error: null });
  })();
});

export { cartRouter };
