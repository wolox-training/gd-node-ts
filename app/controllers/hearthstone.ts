import { Response, Request, NextFunction } from 'express';
import { Info, Allcards } from '../constants';
import { getInfo, getAllCard } from '../services/cards';

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

export default {
  getHSinfo,
  getHScards
};
