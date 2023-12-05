import { connect, disconnect } from 'mongoose';
import { seedProducts } from './seedProducts';
import { seedUsers } from './seedUsers';

connect('mongodb://127.0.0.1:27017/node_gmp_auth', {
  authSource: 'admin',
  user: 'node_gmp_auth',
  pass: 'password123',
})
  .then(async () => {
    console.log('connected to db in development environment');
    console.log('running seeds');
    await Promise.all(
      [seedProducts, seedUsers].map(async (seeder) => {
        await seeder();
      })
    );
    console.log('closing connection');
    await disconnect();
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.log(error.stack);
    }
    process.exit(1);
  });
