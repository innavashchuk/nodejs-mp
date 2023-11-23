import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: Options<PostgreSqlDriver> = {
  entities: ['hw-7/dist/**/*.entity.js'],
  entitiesTs: ['hw-7/**/*.entity.ts'],
  dbName: 'node_gmp',
  type: 'postgresql',
  user: 'node_gmp',
  password: 'password123',
  migrations: {
    path: 'hw-7/migrations',
  },
  seeder: {
    path: 'hw-7/seeders',
  },
};

export default config;
