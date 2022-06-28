import axios from 'axios';
import { Info, Allcards } from '../constants';

const info = {
  method: 'GET',
  url: process.env.API_HEARTH_STONE_INFO,
  headers: {
    'X-RapidAPI-Key': process.env.API_HEARTH_STONE_KEY,
    'X-RapidAPI-Host': process.env.API_HEARTH_STONE_HOST
  }
} as const;

const allCards = {
  method: 'GET',
  url: process.env.API_HEARTH_STONE_CARDS,
  headers: {
    'X-RapidAPI-Key': process.env.API_HEARTH_STONE_KEY,
    'X-RapidAPI-Host': process.env.API_HEARTH_STONE_HOST
  }
} as const;

export const getInfo = async (): Promise<Info> => {
  const response = await axios.request(info);
  return response.data;
};

export const getAllCard = async (): Promise<Allcards> => {
  const response = await axios.request(allCards);
  return response.data;
};

export default {
  getInfo,
  getAllCard
};
