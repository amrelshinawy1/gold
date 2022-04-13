import axios from 'axios';
import { IGetGoldPrices, IResponseGoldPrices, IResponseGoldPricesNBP } from './nbp.interface';

async function getGoldPrices ({ startDate, endDate }:IGetGoldPrices): Promise<IResponseGoldPrices[]> {
  const response = await axios.get(`https://api.nbp.pl/api/cenyzlota/${startDate}/${endDate}/?format=json`);
  const goldPrices = response.data.map((goldPrice: IResponseGoldPricesNBP) => ({ date: goldPrice.data, amount: goldPrice.cena }));
  return goldPrices;
}

export default getGoldPrices;