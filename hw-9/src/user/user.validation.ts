import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const userBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).alphanum().required(),
}).strict();

export function userValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = userBodySchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    return res.status(400).send({
      data: null,
      error: result.error,
    });
  }

  next();
}
