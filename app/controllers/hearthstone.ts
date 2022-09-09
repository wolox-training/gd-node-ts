import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { Info, Allcards, HTTP_CODES } from '../constants';
import { getInfo, getAllCard, createCard } from '../services/cards';
import { Card } from '../models/card';
import logger from '../logger';

import { successful } from '../constants/messages';

export function getHSinfo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { path, method } = req;
  return getInfo(path, method)
    .then((info: Info) => res.send(info))
    .catch(next);
}

export function getHScards(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { path, method } = req;
  return getAllCard(path, method)
    .then((cards: Allcards) => res.send(cards))
    .catch(next);
}

export async function createHScard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  console.log(req.body, '110');
  const { path } = req;
  const { userId } = req.body;
  const method = 'GET';
  console.log(userId, path, method, '111');
  await createCard(userId, path, method)
    .then((card: Card) => {
      if (card) {
        logger.info(HTTP_CODES.CREATED);
        res.status(HttpStatus.CREATED).send(successful.CREATED);
      } else {
        logger.error(HTTP_CODES.BAD_REQUEST);
        res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
      }
    })
    .catch((err: Error) => {
      console.log('112', err);
      logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
      next;
    });
}
