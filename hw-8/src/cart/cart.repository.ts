import { Cart, CartItem } from './cart.entity';
import { Product } from '../product/product.entity';

export const CartModel = {
  async get(user: string) {
    return await Cart.findOne({ isDeleted: false, user })
      .populate({ path: 'items', populate: { path: 'product' } })
      .exec();
  },

  async create(user: string) {
    await Cart.findOneAndUpdate(
      { user, isDeleted: false },
      { isDeleted: true }
    ).exec();

    return await Cart.create({
      isDeleted: false,
      items: [],
      user,
    });
  },

  async update(
    user: string,
    { productId: id, count }: { productId: string; count: number }
  ) {
    const product = await Product.findById(id).exec();
    const item = await CartItem.create({
      product,
      count,
    });
    const cart = await Cart.findOneAndUpdate(
      { isDeleted: false, user },
      { $push: { items: item } }
    ).exec();

    return Cart.findById(cart?.id).populate({
      path: 'items',
      populate: { path: 'product' },
    });
  },

  async delete(user: string) {
    return await Cart.findOneAndUpdate(
      { isDeleted: false, user },
      { isDeleted: true }
    ).exec();
  },
};
