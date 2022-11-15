import { Response, Request, NextFunction } from 'express';
// import HttpStatus from 'http-status-codes';
import { HTTP_CODES } from '../constants';
import { getInfo, getCardByQuality } from '../services/cards';
import { findBox } from '../services/boxes';
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

    const box = await findBox({
      relations: ['user'],
      where: {
        userId: user.id
      }
    });
    console.log(box);

    const userToFind = await findUser(user.id);
    console.log(userToFind);

    // const box = {
    //   user: user.id
    // };
    // box[0].user = userToFind;
    // console.log(box);

    // const boxBuyed = await createAndSave(box);
    // console.log(boxBuyed);

    // const box = {
    //   user: user.id
    // };
    box[0].user = user;
    console.log(box);
    // await createAndSave(box);

    // userToFind?.boxes = [box];

    res.send(`You buy a ${boxToBuy.qualities[0]} MysteryBox with this Card: ${cardByQuality[random]}`);
  } catch (err) {
    logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
    next;
  }
}

export default {
  addMysteryBox
};
