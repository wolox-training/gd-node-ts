import { Repository, getRepository, FindManyOptions } from 'typeorm';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { Set } from '../models/set';
// import { User } from '../models/user';
import { Info, InfoSet } from '../constants';

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

const setRepository = (): Repository<Set> => getRepository(Set);

export const getSetInfo = async (apiPath: string, apiMethod: Method): Promise<Info> => {
  const response = await axios.request(params(apiPath, apiMethod));
  return response.data;
};

export function createAndSave(set: InfoSet): Promise<InfoSet> {
  return setRepository().save(set);
}

export function findSet(options?: FindManyOptions<Set>): Promise<Set[]> {
  return setRepository().find(options);
}

export const createSet = async (set: InfoSet): Promise<InfoSet | undefined> => {
  try {
    await createAndSave(set);
    return set;
  } catch (err) {
    return undefined;
  }
};

export default {
  createAndSave,
  findSet,
  getSetInfo,
  createSet
};
