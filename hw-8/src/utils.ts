import { Types } from 'mongoose';

export function validateId(id: unknown) {
  return typeof id === 'string' && Types.ObjectId.isValid(id);
}
