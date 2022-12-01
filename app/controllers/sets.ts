import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { HTTP_CODES, HTTP_STATUS, successMsg, errorMsg } from '../constants';
import { getSetInfo, findSet, createSet } from '../services/sets';
import logger from '../logger';

export async function createHSSet(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const path = 'info';
  const method = 'GET';
  const { user, setName } = req.body;
  try {
    const classesToFind = await getSetInfo(path, method);
    const classesOfSet = classesToFind.classes;

    const setToFind = classesOfSet.find((el: string) => el === setName);
    if (!setToFind) {
      logger.info(HTTP_CODES.NOT_FOUND);
      res.status(HttpStatus.NOT_FOUND).send(HTTP_STATUS.NOT_FOUND);
    }

    const classesExists = await findSet({
      relations: ['user'],
      where: {
        name: setName,
        user: {
          id: user.id
        }
      }
    });

    if (classesExists.length >= 1) {
      logger.error(HTTP_CODES.CONFLICT);
      res.status(HttpStatus.CONFLICT).send(errorMsg.DUPLICAATE_SET);
    }

    const set = {
      name: setName,
      user
    };
    await createSet(set);

    logger.info(HTTP_CODES.CREATED);
    res.status(HttpStatus.CREATED).send(successMsg.CREATED);
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export default {
  createHSSet
};
