import { Response, Request, NextFunction } from 'express';
import { HTTP_CODES, HTTP_STATUS, errorMsg, successMsg, Common } from '../constants';
import { getInfo, getCardByQuality, getOneCard, createAndSave } from '../services/cards';
import { createBox, countBox } from '../services/boxes';
import { findUser } from '../services/users';
import { Box } from '../models/box';
import logger from '../logger';

// eslint-disable-next-line max-statements
export async function addMysteryBox(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const path = 'info';
  const method = 'GET';
  const { user } = req.body;
  try {
    const userToFind = await findUser(user.id);
    if (!userToFind) {
      logger.info(errorMsg.NOT_FOUND_USER);
      res.status(HTTP_CODES.NOT_FOUND).send(HTTP_STATUS.NOT_FOUND);
    }

    const evaluatePossibilities = async (possibility: number): Promise<Box | void> => {
      const boxToBuy = await getInfo(path, method);
      const allCard: Common[] = [];

      for (let i = 0; i < possibility; i++) {
        const pathQualities = `cards/qualities/${boxToBuy.qualities[i]}`;
        const cardByQuality = await getCardByQuality(pathQualities, method);
        cardByQuality.map((element: Common) => allCard.push(element));
      }

      const random = Math.floor(Math.random() * allCard.length);
      const cardToFind = await getOneCard(`cards/${allCard[random].cardId}`, method);

      await createAndSave(cardToFind);

      const box = {
        user,
        card: cardToFind
      };

      box.user = userToFind;

      const boxBuyed = await createBox(box);

      return boxBuyed;
    };

    const boxToCount = await countBox();

    if (boxToCount[1] > 19) {
      evaluatePossibilities(4);
    } else if (boxToCount[1] > 14) {
      evaluatePossibilities(3);
    } else if (boxToCount[1] > 9) {
      evaluatePossibilities(2);
    } else if (boxToCount[1] > 4) {
      evaluatePossibilities(1);
    } else {
      evaluatePossibilities(0);
    }
    logger.info(successMsg.CREATED);
    res.status(HTTP_CODES.CREATED).send(successMsg.CREATED);
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export default {
  addMysteryBox
};
