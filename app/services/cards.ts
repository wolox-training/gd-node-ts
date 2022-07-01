import axios, { AxiosRequestConfig } from 'axios';
import { Info, Allcards } from '../constants';

const options = (apiPath: string, apiMethod: string): object =>
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
  const response = await axios.request(options(apiPath, apiMethod));
  return response.data;
};

export const getAllCard = async (apiPath: string, apiMethod: string): Promise<Allcards> => {
  const response = await axios.request(options(apiPath, apiMethod));
  return response.data;
};

export default {
  getInfo,
  getAllCard
};
