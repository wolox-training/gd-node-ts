import { Response, Request, NextFunction } from 'express';
// import HttpStatus from 'http-status-codes';
import { HTTP_CODES, HTTP_STATUS, errorMsg, successMsg } from '../constants';
import { getInfo, getCardByQuality, getOneCard, createAndSave } from '../services/cards';
import { createBox } from '../services/boxes';
// import { getSetInfo } from '../services/sets';
import { findUser } from '../services/users';
import logger from '../logger';

// import { successful } from '../constants/messages';

export async function addMysteryBox(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const path = 'info';
  const method = 'GET';
  const { user } = req.body;
  try {
    const boxToBuy = await getInfo(path, method);

    const pathQualities = `cards/qualities/${boxToBuy.qualities[0]}`;

    const cardByQuality = await getCardByQuality(pathQualities, method);

    const random = Math.floor(Math.random() * cardByQuality.length);

    const userToFind = await findUser(user.id);

    if (!userToFind) {
      logger.info(errorMsg.NOT_FOUND_USER);
      res.status(HTTP_CODES.NOT_FOUND).send(HTTP_STATUS.NOT_FOUND);
    }

    const cardToFind = await getOneCard(`cards/${cardByQuality[random].cardId}`, method);

    const box = {
      user,
      card: cardToFind
    };

    box.user = userToFind;
    box.card = cardToFind;

    const boxBuyed = await createBox(box);

    if (!boxBuyed) {
      logger.info(errorMsg.FAIL);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const cardObtenaied = await createAndSave(cardToFind);

    logger.info(successMsg.CREATED);
    res
      .status(HTTP_CODES.CREATED)
      .send(`You buy a ${boxToBuy.qualities[0]} MysteryBox with this Card: ${cardObtenaied[0].cardId}`);
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export default {
  addMysteryBox
};
