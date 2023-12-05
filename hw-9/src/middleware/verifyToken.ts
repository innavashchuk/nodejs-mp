import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserEntity } from '../user/user.entity';

export async function verifyToken(
  req: any,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send({
      data: null,
      error: {
        message: 'You must be authorized user',
      },
    });
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(403).send({
      data: null,
      error: {
        message: 'You must be authorized user',
      },
    });
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as UserEntity;

    req.user = user;
  } catch (err) {
    return res.status(401).send({
      data: null,
      error: {
        message: 'User is not authorized',
      },
    });
  }
  return next();
}
