import { Response, Request, NextFunction } from 'express';
import { Info, Allcards } from '../constants';
import { getInfo, getAllCard } from '../services/cards';

export function getHSinfo(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return getInfo()
    .then((info: Info) => res.send(info))
    .catch(next);
}

export function getHScards(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return getAllCard()
    .then((cards: Allcards) => res.send(cards))
    .catch(next);
}
