export interface IGetGoldPrices {
  startDate: string;
  endDate: string;
} 

export interface IResponseGoldPrices {
  date: string;
  amount: number;
}

export interface IResponseGoldPricesNBP {
  data: string;
  cena: number;
}
