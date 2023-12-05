import { type NextFunction, type Response } from 'express';

export function isAdmin(req: any, res: Response, next: NextFunction) {
  const currentUser = req.user;

  if (currentUser.role !== 'admin') {
    return res.status(403).send({
      data: null,
      error: { message: 'You must be an admin to delete the cart' },
    });
  }

  next();
}
