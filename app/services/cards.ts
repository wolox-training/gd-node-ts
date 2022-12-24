import { Repository, getRepository, FindOneOptions, FindManyOptions } from 'typeorm';
import axios, { AxiosRequestConfig, Method } from 'axios';
import NodeCache from 'node-cache';
import { Card } from '../models/card';
import { User } from '../models/user';
import { Allcards, Info, Common } from '../constants';

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

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
  const value: Info | undefined = myCache.get('myKey');
  if (value === undefined) {
    const response = await axios.request(params(apiPath, apiMethod));
    myCache.set('myKey', response.data, 10000);
    return response.data;
  }
  return value;
};

export const getCardByQuality = async (apiPath: string, apiMethod: Method): Promise<Common[]> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

export const getAllCard = async (apiPath: string, apiMethod: Method): Promise<Allcards> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

export const getOneCard = async (apiPath: string, apiMethod: Method): Promise<Card> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

const cardRepository = (): Repository<Card> => getRepository(Card);

export function createAndSave(card: Card): Promise<Card> {
  return cardRepository().save(card);
}

export function findCard(id?: number, options?: FindOneOptions<Card>): Promise<Card | undefined> {
  return cardRepository().findOne(id, options);
}

export function getCard(options?: FindManyOptions<Card>): Promise<Card[]> {
  return cardRepository().find(options);
}

export const createCard = async (
  user: User,
  apiPath: string,
  apiMethod: Method
): Promise<Card | undefined> => {
  try {
    // console.log('888', await axios.request(params(apiPath, apiMethod)));

    const response = await axios.request(params(apiPath, apiMethod));
    // console.log('889', response);

    const card = response.data;
    // console.log('890');

    card[0].users = [user];
    // console.log('891');

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
