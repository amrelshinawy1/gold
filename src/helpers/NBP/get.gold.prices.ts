import axios from 'axios';
export interface IGetGoldPrices {
  startDate: string;
  endDate: string;
} 

export interface IResponseGoldPrices {
  data: string;
  cena: number;
}
async function getGoldPrices ({ startDate, endDate }:IGetGoldPrices) {
  const response = await executeRequest({ startDate, endDate });
  return { case: 1, message: 'Found gold price successfully.', goldPrices: response.data };
}

async function executeRequest ({ startDate, endDate }:IGetGoldPrices) {
  return await axios.get(`https://api.nbp.pl/api/cenyzlota/${startDate}/${endDate}/?format=json`);
}

export default getGoldPrices;