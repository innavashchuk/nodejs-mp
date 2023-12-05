import 'dotenv/config';

import { connect, disconnect } from 'mongoose';
import { seedProducts } from './seedProducts';
import { seedUsers } from './seedUsers';

const connectionUrl = `${process.env.MONGO_URL}/${process.env.MONGO_DB}`;

connect(connectionUrl, {
  authSource: 'admin',
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
})
  .then(async () => {
    console.log(`connected to db in ${process.env.NODE_ENV} environment`);
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
