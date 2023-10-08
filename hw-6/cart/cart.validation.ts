import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const itemsSchema = Joi.array()
  .required()
  .label('items')
  .items(
    Joi.object({
      product: Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
      }).required(),
      count: Joi.number().required(),
    })
  )
  .strict();

export function cartValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = itemsSchema.validate(req.body.items, { abortEarly: false });

  if (result.error) {
    return res.status(400).send({
      data: null,
      error: result.error,
    });
  }

  next();
}

const checkoutBodySchema = Joi.object({
  payment: Joi.object({
    type: Joi.string().required(),
    address: Joi.string(),
    creditCard: Joi.string(),
  }),
  delivery: Joi.object({
    type: Joi.string().required(),
    address: Joi.string().required(),
  }),
  comments: Joi.string().required(),
});

export function checkoutValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = checkoutBodySchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    return res.status(400).send({
      data: null,
      error: result.error,
    });
  }

  next();
}
