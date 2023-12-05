import { validateId } from '../utils';
import { User } from './user.entity';

export const UserModel = {
  async getById(id?: string | string[]) {
    if (!validateId(id)) return null;

    return await User.findById(id).exec();
  },
};
