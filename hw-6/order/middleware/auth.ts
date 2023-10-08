import { NextFunction, Request, Response } from 'express';

const users = ['0450f1d1-9461-4db9-8946-9407f9b28614'];

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.headers['x-user-id'];

  if (typeof userId !== 'string' || !users.includes(userId)) {
    return res.status(401).send({
      data: null,
      error: {
        message: 'Header x-user-id is missing or no user with such id',
      },
    });
  }
  next();
}
