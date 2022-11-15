import { Repository, getRepository, FindManyOptions } from 'typeorm';
import { Box } from '../models/box';
// import { User } from '../models/user';
// import { Allcards, Info, Common } from '../constants';

const boxRepository = (): Repository<Box> => getRepository(Box);

export function findBox(options?: FindManyOptions<Box>): Promise<Box[]> {
  return boxRepository().find(options);
}

export function createAndSave(box: Box): Promise<Box> {
  return boxRepository().save(box);
}

export default {
  findBox,
  createAndSave
};
