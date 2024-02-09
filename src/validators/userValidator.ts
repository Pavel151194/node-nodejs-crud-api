import { User } from '../core/typings';

export const validateUser = (user: Partial<User>): boolean =>
  user.username &&
  user.age &&
  user.hobbies &&
  typeof user.username === 'string' &&
  typeof user.age === 'number' &&
  Array.isArray(user.hobbies);
