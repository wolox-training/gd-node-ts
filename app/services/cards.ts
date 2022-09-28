import { Repository, getRepository, FindConditions, FindOneOptions } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import { Card } from '../models/card';
import { User } from '../models/user';
import { Info, Allcards } from '../constants';

const params = (apiPath: string, apiMethod: string): object =>
  ({
    method: apiMethod,
    url: apiPath,
    baseURL: process.env.API_HS_URL,
    headers: {
      'X-RapidAPI-Key': process.env.API_HS_KEY,
      'X-RapidAPI-Host': process.env.API_HS_HOST
    }
  } as AxiosRequestConfig);

export const getInfo = async (apiPath: string, apiMethod: string): Promise<Info> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

export const getAllCard = async (apiPath: string, apiMethod: string): Promise<Allcards> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

const cardRepository = (): Repository<Card> => getRepository(Card);

export function createAndSave(card: Card): Promise<Card> {
  return cardRepository().save(card);
}

export function findCard(options?: FindConditions<Card>): Promise<Card | undefined> {
  return cardRepository().findOne(options);
}

export function findCardByUser(id?: string, options?: FindOneOptions<Card>): Promise<Card | undefined> {
  return cardRepository().findOne(id, options);
}

export const createCard = async (user: User, apiPath: string, apiMethod: string): Promise<Card> => {
  const response = await axios.request(params(apiPath, apiMethod));
  const card = response.data;
  console.log(card, '000');
  console.log(user.id, '001');
  card[0].users = [user];
  const findCardByOwner = await findCardByUser(card.cardId);
  console.log(findCardByOwner, '111');
  // const buyCard = await createAndSave(card);
  // console.log(buyCard, '222');
  return card;
};

export default {
  getInfo,
  getAllCard,
  createCard
};
