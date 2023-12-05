import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';

type UserRole = 'user' | 'admin';

export interface UserEntity {
  _id: Schema.Types.UUID;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UserCreateInput = Pick<UserEntity, 'name' | 'email' | 'password'>;

export const userSchema = new Schema<UserEntity>({
  _id: {
    type: Schema.Types.UUID,
    default: randomUUID,
  },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'user',
  },
});

export const User = model('User', userSchema);
