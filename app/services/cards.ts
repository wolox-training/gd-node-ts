import axios from 'axios';

const urlApi = `${process.env.API_HEARTH_STONE}?format=json`;

export const getInfo = async () => 
  axios
    .get(urlApi)
    .then((response: any) => response)
    .catch((error: any) => error);

export default {
  getInfo
};
