/* eslint-disable @typescript-eslint/no-explicit-any */

import { calculateProfit } from "./gold.service";


describe('test gold', () => {

  it('should get the best moment', async () => {
    const {amountAfterSell,amountToInvist,max,min} = await calculateProfit();

    expect(min).toStrictEqual({data: '2018-09-28', cena: 139.32});
    
    expect(max).toStrictEqual({data: '2021-11-22', cena: 248.08});

    expect(amountAfterSell).toStrictEqual("1068389.32");

    expect(amountToInvist).toStrictEqual(600000);
  });

});
