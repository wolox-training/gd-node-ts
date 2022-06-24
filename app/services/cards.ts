import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: process.env.API_HEARTH_STONE,
//   headers: {
//     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//     'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// console.log(response.data);
// }).catch(function (error) {
// console.error(error);
// });

export async function hearthStoneInfo(text: string) {
  const result =  await axios({
    method: 'GET',
    url: text,
    baseURL: process.env.API_HEARTH_STONE,
    headers: {
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
    }
  });
  return result;
}

export default {
  hearthStoneInfo
};
