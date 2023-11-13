import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.message);
  console.error(err.stack);
  res
    .status(500)
    .send({ data: null, error: { message: 'Ooops, something went wrong' } });
}
