import { Repository, getRepository, FindConditions, FindManyOptions } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import { Card } from '../models/card';
import { User } from '../models/user';
import { Allcards, Info, Common } from '../constants';

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

export const getCardByQuality = async (apiPath: string, apiMethod: string): Promise<Common[]> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

export const getAllCard = async (apiPath: string, apiMethod: string): Promise<Allcards> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

export const getOneCard = async (apiPath: string, apiMethod: string): Promise<Card> => {
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

export function getCard(options?: FindManyOptions<Card>): Promise<Card[]> {
  return cardRepository().find(options);
}

export const createCard = async (
  user: User,
  apiPath: string,
  apiMethod: string
): Promise<Card | undefined> => {
  try {
    console.log('888', await axios.request(params(apiPath, apiMethod)));

    const response = await axios.request(params(apiPath, apiMethod));
    console.log('889', response);

    const card = response.data;
    console.log('890');

    card[0].users = [user];
    console.log('891');

    await createAndSave(card);
    return card;
  } catch (err) {
    return undefined;
  }
};

export default {
  getInfo,
  getCardByQuality,
  getAllCard,
  getOneCard,
  createCard
};
