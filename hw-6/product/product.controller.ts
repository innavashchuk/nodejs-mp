import { Router } from 'express';
import { getProductById, getProducts } from './product.service';

export const PRODUCT_ROUTE = '/products';

const productRouter = Router();

productRouter.get('/', (_req, res) => {
  const products = getProducts();

  return res.send({
    data: products,
    error: null,
  });
});

productRouter.get('/:productId', (req, res) => {
  const { productId } = req.params;
  const product = getProductById(productId);

  if (product === null) {
    return res.status(404).send({
      data: null,
      error: {
        message: 'No product with such id',
      },
    });
  }

  return res.send({
    data: product,
    error: null,
  });
});

export { productRouter };
