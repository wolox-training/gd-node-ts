import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { HTTP_CODES, HTTP_STATUS } from '../constants';
import { getSetInfo, findSet, createSet } from '../services/sets';
import logger from '../logger';

import { successful } from '../constants/messages';

export async function createHSSet(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const path = 'info';
  const method = 'GET';
  const { user, setName } = req.body;
  try {
    const classesToFind = await getSetInfo(path, method);
    const classesOfSet = classesToFind.classes;
    const setToFind = classesOfSet.find((el: string) => el === setName);
    const classesExists = await findSet({
      relations: ['user'],
      where: {
        name: setName,
        user: {
          id: user.id
        }
      }
    });
    if (setToFind) {
      if (classesExists.length >= 1) {
        logger.error(HTTP_CODES.CONFLICT);
        res.status(HttpStatus.CONFLICT).send({ message: 'Duplicate Set not allow' });
      } else {
        const set = {
          name: setName,
          // eslint-disable-next-line object-shorthand
          user: user
        };
        await createSet(set);
        logger.info(HTTP_CODES.CREATED);
        res.status(HttpStatus.CREATED).send(successful.CREATED);
      }
    } else {
      logger.info(HTTP_CODES.NOT_FOUND);
      res.status(HttpStatus.NOT_FOUND).send(HTTP_STATUS.NOT_FOUND);
    }
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export async function addCardToSet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const path = 'info';
  const method = 'GET';
  try {
    const result = await getSetInfo(path, method);
    res.send(result);
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export default {
  createHSSet,
  addCardToSet
};
