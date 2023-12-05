import { type UserEntity } from '../../src/user/user.entity';

export {};

declare global {
  namespace Express {
    interface Request {
      user: UserEntity;
    }
  }
}
