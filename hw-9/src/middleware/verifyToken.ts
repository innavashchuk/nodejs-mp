import * as jwt from 'jsonwebtoken';
import { type Response, type NextFunction } from 'express';
import debug from 'debug';

import { type UserEntity } from '../user/user.entity';

const authDebugLog = debug('auth');

export function verifyToken(
  // NOTE: nodemon does not pick up the type for some reason
  req: any,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined || authHeader === null || authHeader === '') {
    authDebugLog('Invalid Auth header');

    res.status(403).send({
      data: null,
      error: {
        message: 'You must be authorized user',
      },
    });

    return;
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    authDebugLog('Invalid token type');

    res.status(403).send({
      data: null,
      error: {
        message: 'You must be authorized user',
      },
    });

    return;
  }

  try {
    const user = jwt.verify(
      token,
      process.env.TOKEN_KEY as jwt.Secret
    ) as UserEntity;

    req.user = user;
  } catch (err) {
    authDebugLog('Unauthorised user:\n' + String(err));

    res.status(401).send({
      data: null,
      error: {
        message: 'User is not authorized',
      },
    });

    return;
  }
  next();
}
