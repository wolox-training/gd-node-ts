import { Repository, getRepository, FindConditions } from 'typeorm';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { Card } from '../models/card';
import { User } from '../models/user';
import { Allcards, Info } from '../constants';

const params = (apiPath: string, apiMethod: Method): object =>
  ({
    method: apiMethod,
    url: apiPath,
    baseURL: process.env.API_HS_URL,
    headers: {
      'X-RapidAPI-Key': process.env.API_HS_KEY,
      'X-RapidAPI-Host': process.env.API_HS_HOST
    }
  } as AxiosRequestConfig);

export const getInfo = async (apiPath: string, apiMethod: Method): Promise<Info> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

export const getAllCard = async (apiPath: string, apiMethod: Method): Promise<Allcards> => {
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

export const createCard = async (
  user: User,
  apiPath: string,
  apiMethod: Method
): Promise<Card | undefined> => {
  try {
    const response = await axios.request(params(apiPath, apiMethod));
    const card = response.data;
    card[0].users = [user];
    await createAndSave(card);
    return card;
  } catch (err) {
    return undefined;
  }
};

export default {
  getInfo,
  getAllCard,
  createCard
};
