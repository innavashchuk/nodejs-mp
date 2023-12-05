import { NextFunction, Request, Response } from 'express';
import { getUser } from '../user/user.service';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.headers['x-user-id'];
  const user = await getUser(userId);

  if (!user) {
    return res.status(401).send({
      data: null,
      error: {
        message: 'Header x-user-id is missing or no user with such id',
      },
    });
  }
  next();
}
