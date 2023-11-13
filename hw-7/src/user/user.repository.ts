import { DI } from '..';

export const UserModel = {
  async getById(id?: string | string[]) {
    return DI.userRepository.findOne({ id });
  },
};
