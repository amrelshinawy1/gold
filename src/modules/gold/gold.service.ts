// business logic

import Bluebird from "bluebird";
import { IGetGoldPrices, IResponseGoldPrices } from "../../helpers/NBP/nbp.interface";
import getGoldPrices from "../../helpers/NBP/nbp.service";

export async function calculateProfit() {
  const goldPrices = await getGoldPricesLastFiveYears();
  const { min, max } = getMinAndMaxPrice(goldPrices);
  const { amountAfterSell, amountToInvist } = getBestMomentForSell(min.amount, max.amount);

  return { min, max, amountAfterSell, amountToInvist };
}

export function getBestMomentForSell(min: number, max: number) {
  const amountToInvist = 600000;
  const amountOfGoldAfterBuy = (amountToInvist / min);
  const amountAfterSell = (amountOfGoldAfterBuy * max).toFixed(2);

  return ({ amountAfterSell, amountToInvist });
}

export function getMinAndMaxPrice(goldPrices: IResponseGoldPrices[]) {
  goldPrices.sort((a: IResponseGoldPrices, b: IResponseGoldPrices) => a.amount - b.amount);

  const min = goldPrices[0];
  const max = goldPrices[goldPrices.length - 1];
  return { min, max };
}

export async function getGoldPricesLastFiveYears() {
  const intervals: IGetGoldPrices[] = [
    { startDate: '2017-01-01', endDate: '2017-12-31' },
    { startDate: '2018-01-01', endDate: '2018-12-31' },
    { startDate: '2019-01-01', endDate: '2019-12-31' },
    { startDate: '2020-01-01', endDate: '2020-12-31' },
    { startDate: '2021-01-01', endDate: '2021-12-31' },
  ];
  const goldPrices = await Bluebird.map(intervals, async (interval: IGetGoldPrices) => {
    const [goldPrices] = await getGoldPrices(interval);
    return goldPrices
  });
  return goldPrices;
}

