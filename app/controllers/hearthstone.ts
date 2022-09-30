import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { Info, Allcards, HTTP_CODES } from '../constants';
import { getInfo, getAllCard, createCard } from '../services/cards';
import { findUser } from '../services/users';
import { Card } from '../models/card';
import { User } from '../models/user';
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
    if (userToFind.cards.length) {
      const cardByUser = userToFind.cards.find((card: Card) => card.cardId === params.id);
      if (cardByUser) {
        logger.error(HTTP_CODES.CONFLICT);
        res.status(HttpStatus.CONFLICT).send({ message: 'DUPLICATE CARD' });
      } else {
        const card = await createCard(userToFind, path, method);
        if (card) {
          logger.info(HTTP_CODES.CREATED);
          res.status(HttpStatus.CREATED).send(successful.CREATED);
        } else {
          logger.error(HTTP_CODES.BAD_REQUEST);
          res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
        }
      }
    } else {
      const card = await createCard(userToFind, path, method);
        if (card) {
          logger.info(HTTP_CODES.CREATED);
          res.status(HttpStatus.CREATED).send(successful.CREATED);
        } else {
          logger.error(HTTP_CODES.BAD_REQUEST);
          res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
        }
    }
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
  // await findUser(user).then(async (userFounded: User) => {
  //   if (userFounded.cards.length) {
  //     const cardByUser = userFounded.cards.find((card: Card) => card.cardId === params.id);
  //     if (cardByUser) {
  //       logger.error(HTTP_CODES.CONFLICT);
  //       res.status(HttpStatus.CONFLICT).send({ message: 'DUPLICATE CARD' });
  //     } else {
  //       await createCard(userFounded, path, method)
  //         .then((card: Card) => {
  //           if (card) {
  //             logger.info(HTTP_CODES.CREATED);
  //             res.status(HttpStatus.CREATED).send(successful.CREATED);
  //           } else {
  //             logger.error(HTTP_CODES.BAD_REQUEST);
  //             res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
  //           }
  //         })
  //         .catch((err: Error) => {
  //           logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
  //           next;
  //         });
  //     }
  //   } else {
  //     await createCard(userFounded, path, method)
  //       .then((card: Card) => {
  //         if (card) {
  //           logger.info(HTTP_CODES.CREATED);
  //           res.status(HttpStatus.CREATED).send(successful.CREATED);
  //         } else {
  //           logger.error(HTTP_CODES.BAD_REQUEST);
  //           res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
  //         }
  //       })
  //       .catch((err: Error) => {
  //         logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
  //         next;
  //       });
  //   }
  // });
}

export default {
  getHSinfo,
  getHScards,
  createHScard
};
