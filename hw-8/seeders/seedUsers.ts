import { User } from '../src/user/user.entity';

const users = [
  new User({ name: 'John Doe' }),
  new User({ name: 'Jane Doe' }),
  new User({ name: 'Charles Xavier' }),
  new User({ name: 'Diana Prince' }),
];

export async function seedUsers() {
  await User.deleteMany().exec();
  await Promise.all([users.map(async (user) => await user.save())]);
}
