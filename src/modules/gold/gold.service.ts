// business logic

import Bluebird from "bluebird";
import getGoldPrices, { IGetGoldPrices, IResponseGoldPrices } from "../../helpers/NBP/get.gold.prices";

export async function calculateProfit() {
    const goldPrices: IResponseGoldPrices[] = await getGoldPricesLastFiveYears();
    const { min, max } = getMinAndMaxPrice(goldPrices);
    const { amountAfterSell, amountToInvist } = getBestMomentForSell(min, max);
    // console.log(`
    // Best Moment For Buy: Date: ${min.data} - - Min: ${min.cena} \n
    // Best Moment For Sale: Date: ${max.data} - - Max: ${max.cena} \n 
    // Profit: ${Number(amountAfterSell) - amountToInvist} \n 
    // totalAmountAfterInvest: ${amountAfterSell} \n
    // `);
  
    return { min, max, amountAfterSell, amountToInvist };
  }
  
  export function getBestMomentForSell(min: IResponseGoldPrices, max: IResponseGoldPrices) {
    const amountToInvist = 600000;
    const amountOfGoldAfterBuy = (amountToInvist / min.cena);
    const amountAfterSell = (amountOfGoldAfterBuy * max.cena).toFixed(2);
    
    return ({ amountAfterSell, amountToInvist });
  }
  
  export function getMinAndMaxPrice(goldPrices: IResponseGoldPrices[]) {
    goldPrices.sort((a: IResponseGoldPrices, b: IResponseGoldPrices) => a.cena - b.cena);
  
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
    const goldPrices: IResponseGoldPrices[] = [];
    await Bluebird.map(intervals, async (interval: IGetGoldPrices) => {
      const goldPrice = await getGoldPrices(interval);
      goldPrices.push(...goldPrice.goldPrices);
    });
    return goldPrices;
  }
  
  