import { type NextFunction, type Request, type Response } from 'express';

export function headerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.is('application/json') === false) {
    return res
      .status(406)
      .send({ data: null, error: { message: 'Not Acceptable' } });
  }
  next();
}
