import { Schema, model } from 'mongoose';

export interface UserEntity {
  name: string;
}

export const userSchema = new Schema<UserEntity>({
  name: String,
});

export const User = model('User', userSchema);
