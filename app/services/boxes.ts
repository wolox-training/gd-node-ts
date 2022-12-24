import { Repository, getRepository, FindManyOptions } from 'typeorm';
import { Box } from '../models/box';
// import { User } from '../models/user';
import { BoxMistery } from '../constants';

const boxRepository = (): Repository<Box> => getRepository(Box);

export function findBox(options?: FindManyOptions<Box>): Promise<Box[]> {
  return boxRepository().find(options);
}

export function countBox(options?: FindManyOptions<Box>): Promise<[Box[], number]> {
  return boxRepository().findAndCount(options);
}

export function createAndSave(box: BoxMistery): Promise<Box> {
  return boxRepository().save(box);
}

export const createBox = async (box: BoxMistery): Promise<Box | undefined> => {
  try {
    const boxCrated = await createAndSave(box);
    return boxCrated;
  } catch (err) {
    return undefined;
  }
};

export default {
  findBox,
  countBox,
  createBox
};
