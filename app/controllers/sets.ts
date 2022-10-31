import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { HTTP_CODES } from '../constants';
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
    console.log('111', setToFind);
    console.log('222', classesExists);
    if (setToFind) {
      if (classesExists.length >= 1) {
        logger.error(HTTP_CODES.CONFLICT);
        res.status(HttpStatus.CONFLICT).send({ message: 'Duplicate Set not allow' });
      } else {
        console.log('333');
        const set = {
          name: setName,
          ...user
        };
        await createSet(set);
        logger.info(HTTP_CODES.CREATED);
        res.status(HttpStatus.CREATED).send(successful.CREATED);
      }
    } else {
      res.send('Not Found');
    }
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
  // return getInfo(path, method)
  //   .then((info: Info) => res.send(info))
  //   .catch(next);
}

export default {
  createHSSet
};
