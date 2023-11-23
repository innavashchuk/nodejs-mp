import { Router } from 'express';
import { getProductById, getProducts } from './product.service';

export const PRODUCT_ROUTE = '/products';

const productRouter = Router();

productRouter.get('/', async (_req, res) => {
  const products = await getProducts();

  return res.send({
    data: products,
    error: null,
  });
});

productRouter.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);

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
