import { Response, Request, NextFunction } from 'express';
// import HttpStatus from 'http-status-codes';
import { HTTP_CODES } from '../constants';
import { getInfo, getCardByQuality, createCard } from '../services/cards';
// import { createAndSave } from '../services/boxes';
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
    console.log(cardByQuality.length);

    const random = Math.floor(Math.random() * cardByQuality.length);
    console.log(random, cardByQuality[random]);

    const userToFind = await findUser(user.id);

    if (!userToFind) {
      res.send('User not found');
    }
    console.log(userToFind);
    console.log('123', user, cardByQuality[random].cardId, method, '123');

    const cardObtenaied = await createCard(user, cardByQuality[random].cardId, method);

    console.log(cardObtenaied);

    // try {
    //   const box = await createAndSave(user);

    //   console.log(box);
    // } catch (error) {
    //   console.log(error);
    // }

    res.send(`You buy a ${boxToBuy.qualities[0]} MysteryBox with this Card: ${cardByQuality[random]}`);
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export default {
  addMysteryBox
};
