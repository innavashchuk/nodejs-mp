import { type NextFunction, type Request, type Response } from 'express';
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
): Response<any, Record<string, any>> | undefined {
  const result = userBodySchema.validate(req.body, { abortEarly: false });

  if (result.error != null) {
    return res.status(400).send({
      data: null,
      error: result.error,
    });
  }

  next();
}
