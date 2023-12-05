import { validateId } from '../utils';
import { User, UserCreateInput } from './user.entity';

export const UserModel = {
  async getById(id?: string | string[]) {
    if (!validateId(id)) return null;

    return await User.findById(id).exec();
  },

  async getByEmail(email: string) {
    return await User.findOne({ email });
  },

  async create(createUserInput: UserCreateInput) {
    return await User.create(createUserInput);
  },
};
