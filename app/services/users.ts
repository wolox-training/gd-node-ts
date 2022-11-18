import {
  getRepository,
  FindManyOptions,
  FindConditions,
  Repository,
  DeepPartial,
  UpdateResult
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';

const userRepository = (): Repository<User> => getRepository(User);

export function findUser(options?: FindConditions<User>): Promise<User | undefined> {
  return userRepository().findOne(options, {
    relations: ['cards']
  });
}

export function createAndSave(user: User): Promise<User> {
  user.password = bcrypt.hashSync(user.password, 10);
  return userRepository().save(user);
}

export function findAll(options?: FindManyOptions): Promise<User[]> {
  return userRepository().find(options);
}

export function updateOne(id: number, user: User): Promise<UpdateResult> {
  const aux = user;
  if (aux.password) {
    aux.password = bcrypt.hashSync(aux.password, 10);
  }
  return userRepository().update(id, user);
}

export function createMany(users: DeepPartial<User>[]): Promise<User[]> {
  return userRepository().save(users);
}

export default {
  findAll,
  createMany,
  findUser,
  createAndSave,
  updateOne
};
