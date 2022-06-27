import axios from 'axios';

export interface Info {
  type: string;
  properties: Properties;
}

export interface Properties {
  patch: Patch;
  classes: Classes;
  sets: Classes;
  types: Classes;
  factions: Classes;
  qualities: Classes;
  races: Classes;
  locales: Classes;
}

export interface Classes {
  type: string;
  items: Patch;
}

export interface Patch {
  type: string;
}

// export interface Options {
//   method:  string;
//   url:     UrlApi;
//   headers: Headers;
// }

// export interface Headers {
//   "X-RapidAPI-Key":  string;
//   "X-RapidAPI-Host": string;
// }

// export interface UrlApi {
//   type: string;
// }

const urlApi = `${process.env.API_HEARTH_STONE}?format=json`;

const options = {
  method: 'GET',
  url: urlApi,
  headers: {
    'X-RapidAPI-Key': process.env.API_HEARTH_STONE_KEY,
    'X-RapidAPI-Host': process.env.API_HEARTH_STONE_HOST
  }
} as const;

export const getInfo = async (): Promise<Info> => {
  const response = await axios.request(options);
  return response.data;
};

export default {
  getInfo
};
