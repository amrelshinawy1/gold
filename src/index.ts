import express from 'express';
import { calculateProfit } from './modules/gold/gold.service';

const app = express();

app.listen(3000, async () => {
  await calculateProfit();
});

