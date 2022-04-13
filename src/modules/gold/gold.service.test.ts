/* eslint-disable @typescript-eslint/no-explicit-any */

import { calculateProfit } from "./gold.service";


describe('test gold', () => {

  it('should get the best moment', async () => {
    const {amountAfterSell,amountToInvist,max,min} = await calculateProfit();

    expect(min).toStrictEqual({date: '2018-01-02', amount: 145.1});
    
    expect(max).toStrictEqual({date: '2021-01-04', amount: 228.1});

    expect(amountAfterSell).toStrictEqual("943211.58");

    expect(amountToInvist).toStrictEqual(600000);
  });

});
