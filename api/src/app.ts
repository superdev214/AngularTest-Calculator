import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Expense } from './models/payout';
import { PayoutsCalculator } from './services/payout';

const app = express();
const port = 3000;

app
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

app.post('/payouts', (req: Request, res: Response) => {
  const expenses: Expense[] = req.body.expenses;

  // Validate request parameters
  if (!expenses || !Array.isArray(expenses)) {
    res.status(400).send('Invalid parameters');
    return;
  }

  // Calculate the payouts
  const payoutsCalculator = new PayoutsCalculator(expenses);
  res.json(payoutsCalculator.calculate());
});

const server = app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`server started at http://localhost:${port}`);
});

export { app, server };
