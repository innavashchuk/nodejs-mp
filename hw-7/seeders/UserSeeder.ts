import type { EntityManager, RequiredEntityData } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../src/user/user.entity';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    ['John Doe', 'Jane Doe', 'Charles Xavier', 'Diana Prince'].forEach(
      (name, index) => {
        const newUser: RequiredEntityData<User> = {
          name,
        };

        if (index === 0) newUser.id = '0450f1d1-9461-4db9-8946-9407f9b28614';

        em.create(User, newUser);
      }
    );
  }
}
