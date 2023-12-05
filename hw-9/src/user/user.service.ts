import { compare, hash } from 'bcryptjs';
import { UserCreateInput } from './user.entity';
import { UserModel } from './user.repository';
import { sign } from 'jsonwebtoken';

export async function getUserById(id?: string | string[]) {
  return UserModel.getById(id);
}

export async function getUserByEmail(email: string) {
  return UserModel.getByEmail(email);
}

export async function createUser(createUserInput: UserCreateInput) {
  const { name, email, password: unencryptedPassword } = createUserInput;

  const password = await hash(unencryptedPassword, 10);

  return UserModel.create({ name, email: email.toLowerCase(), password });
}

export async function loginUser(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (user && (await compare(password, user.password))) {
    const token = sign(
      { user_id: user._id, email, role: user.role },
      process.env.TOKEN_KEY!,
      {
        expiresIn: '2h',
      }
    );

    return token;
  }

  return null;
}
