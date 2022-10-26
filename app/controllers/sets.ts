import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { HTTP_CODES } from '../constants';
import { getSetInfo, findSet, createSet } from '../services/sets';
import logger from '../logger';

import { successful } from '../constants/messages';

export async function createHSSet(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const path = 'info';
  const method = 'GET';
  const { user, set } = req.body;
  console.log(req.body);
  try {
    const classesToFind = await getSetInfo(path, method);
    const classesOfSet = classesToFind.classes;
    const setToFind = classesOfSet.find((el: string) => el === set);
    if (setToFind) {
      console.log('1', set);
      const classesExists = await findSet({
        where: {
          name: set
        }
      });
      console.log('2', classesExists);
      if (classesExists === set) {
        console.log('3');
        logger.error(HTTP_CODES.CONFLICT);
        res.status(HttpStatus.CONFLICT).send({ message: 'DUPLICATE SET' });
      } else {
        console.log('4');
        // set.user = user;
        const classesToCreate = await createSet(set, user);
        console.log(classesToCreate);
        if (classesToCreate) {
          console.log('5');
          logger.info(HTTP_CODES.CREATED);
          res.status(HttpStatus.CREATED).send(successful.CREATED);
        } else {
          console.log('6');
          logger.error(HTTP_CODES.BAD_REQUEST);
          res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
        }
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
