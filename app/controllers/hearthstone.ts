import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { Info, Allcards, HTTP_CODES } from '../constants';
import { getInfo, getAllCard, createCard, getSet } from '../services/cards';
import { findUser } from '../services/users';
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
  const { path, params } = req;
  const { user } = req.body;
  const method = 'GET';
  try {
    const userToFind = await findUser(user);
    if (!userToFind) {
      logger.error(HTTP_CODES.NOT_FOUND);
      res.status(HttpStatus.NOT_FOUND).send(HTTP_CODES.NOT_FOUND);
    }

    const cardByUser = userToFind?.cards.find((card: Card) => card.cardId === params.id);
    if (cardByUser) {
      logger.error(HTTP_CODES.CONFLICT);
      res.status(HttpStatus.CONFLICT).send({ message: 'DUPLICATE CARD' });
    }

    const card = await createCard(user, path, method);
    if (!card) {
      logger.error(HTTP_CODES.BAD_REQUEST);
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'USER OR CARD NOT FOUND' });
    }

    logger.info(HTTP_CODES.CREATED);
    res.status(HttpStatus.CREATED).send(successful.CREATED);
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export function createHSset(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { path, method } = req;
  return getSet(path, method)
    .then((cards: Allcards) => res.send(cards))
    .catch(next);
}

export default {
  getHSinfo,
  getHScards,
  createHScard,
  createHSset
};
