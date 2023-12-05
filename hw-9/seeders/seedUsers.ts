import { hash } from 'bcryptjs';
import { User } from '../src/user/user.entity';

async function createPassword() {
  const unencryptedPassword = 'secret123';
  const password = await hash(unencryptedPassword, 10);

  return password;
}

const createUsers = async () => {
  return [
    new User({
      name: 'John Doe',
      email: 'john.doe@someco.com',
      password: await createPassword(),
    }),
    new User({
      name: 'Jane Doe',
      email: 'jane.doe@someco.com',
      password: await createPassword(),
    }),
    new User({
      name: 'Charles Xavier',
      email: 'charles.xavier@someco.com',
      password: await createPassword(),
      role: 'admin',
    }),
    new User({
      name: 'Diana Prince',
      email: 'diana.prince@someco.com',
      password: await createPassword(),
    }),
  ];
};

export async function seedUsers() {
  await User.deleteMany().exec();
  const users = await createUsers();
  await Promise.all(users.map(async (user) => await user.save()));
}
