import { getRepository, FindManyOptions, FindConditions, Repository, DeepPartial } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';

const userRepository = (): Repository<User> => getRepository(User);

export function findUser(options?: FindConditions<User>): Promise<User | undefined> {
  return userRepository().findOne(options);
}

export function createAndSave(user: User): Promise<User> {
  const aux = user;
  if (aux.password) {
    aux.password = bcrypt.hashSync(aux.password, 10);
  }
  return userRepository().save(user);
}

export function findAll(options?: FindManyOptions): Promise<User[]> {
  return userRepository().find(options);
}

export function createMany(users: DeepPartial<User>[]): Promise<User[]> {
  return userRepository().save(users);
}

export default {
  findAll,
  createMany,
  findUser,
  createAndSave
};
