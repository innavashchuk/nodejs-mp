import { UserModel } from './user.repository';

export async function getUser(id?: string | string[]) {
  return UserModel.getById(id);
}
