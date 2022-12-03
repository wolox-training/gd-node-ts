import { Response, Request, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { HTTP_CODES, HTTP_STATUS, successMsg, errorMsg } from '../constants';
import { getSetInfo, findSet, createSet } from '../services/sets';
import { getCard, createAndSave } from '../services/cards';
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

export async function addCardToSet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { deck_id } = req.params;
  const { user, cards } = req.body;
  try {
    const setBuyed = await findSet({
      relations: ['user'],
      where: {
        id: deck_id,
        user: {
          id: user.id
        }
      }
    });

    if (setBuyed.length < 1) res.status(404).json({ message: 'Set not found' });

    const cardList = await Promise.all(
      cards.map(async (el: string) => {
        const cardBuyed = await getCard({
          relations: ['set'],
          where: {
            cardId: el
          }
        });

        if (cardBuyed.length < 1) return `Card: ${el}, must be buy it before add to set`;

        if (setBuyed[0].name === 'Neutral') {
          cardBuyed[0].set = setBuyed[0];
          await createAndSave(cardBuyed[0]);
          return `Card: ${el} with any class added to neutral set`;
        }
        if (cardBuyed[0].playerClass === 'Neutral' || cardBuyed[0].playerClass === setBuyed[0].name) {
          cardBuyed[0].set = setBuyed[0];
          await createAndSave(cardBuyed[0]);
          return `Card: ${el} with class ${cardBuyed[0].playerClass} added to set `;
        }
        return `Card: ${el} with class ${cardBuyed[0].playerClass} can not be added to ${setBuyed[0].name} set`;
      })
    );
    res.send(cardList);
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export default {
  createHSSet,
  addCardToSet
};
