import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart } from "./cart.service";
import { createOrder } from "../order/order.service";
import { cartValidation, checkoutValidation } from "./cart.validation";

export const CART_ROUTE = "/profile/cart";

const cartRouter = Router();

cartRouter.post("/", (req, res) => {
  const userId = req.headers["x-user-id"] as string;
  const newCartData = createCart(userId);

  res.status(201).send({
    data: newCartData,
    error: null,
  });
});

cartRouter.get("/", (req, res) => {
  const userId = req.headers["x-user-id"] as string;
  const cartData = getCart(userId);

  if (cartData === null) {
    return res.status(404).send({ data: null, error: "No cart found" });
  }

  res.send({ data: cartData, error: null });
});

cartRouter.put("/", cartValidation, (req, res) => {
  const userId = req.headers["x-user-id"] as string;
  const { id, items } = req.body;
  const updatedCartData = updateCart(userId, { id, items });

  if (updatedCartData === null) {
    return res.status(404).send({ data: null, error: "No cart found" });
  }

  res.send({ data: updatedCartData, error: null });
});

cartRouter.delete("/", (req, res) => {
  const userId = req.headers["x-user-id"] as string;

  const deleteResult = deleteCart(userId);

  res.send({
    data: deleteResult,
    error: null,
  });
});

cartRouter.post("/checkout", checkoutValidation, (req, res) => {
  const userId = req.headers["x-user-id"] as string;
  const cartData = getCart(userId);
  const { payment, delivery, comments } = req.body;

  if (cartData === null) {
    return res.status(404).send({ data: null, error: "No cart found" });
  }

  const { cart } = cartData;

  const orderData = createOrder(userId, {
    cartId: cart.id,
    items: cart.items,
    payment,
    delivery,
    comments,
  });

  res.send({ data: orderData, error: null });
});

export { cartRouter };
