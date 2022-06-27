import axios from 'axios';

export interface Info {
  type:       string;
  properties: Properties;
}

export interface Properties {
  patch:     Patch;
  classes:   Classes;
  sets:      Classes;
  types:     Classes;
  factions:  Classes;
  qualities: Classes;
  races:     Classes;
  locales:   Classes;
}

export interface Classes {
  type:  string;
  items: Patch;
}

export interface Patch {
  type: string;
}


const urlApi = `${process.env.API_HEARTH_STONE}?format=json`;

export const getInfo = async (): Promise<Info> => 
  await axios
    .get(urlApi)
    .then((response: any) => response)
    .catch((error: any) => error);

// export default {
//   getInfo
// };
