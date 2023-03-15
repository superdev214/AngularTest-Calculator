import { Expense, Payout, PayoutResult } from '../models/payout';

class PayoutsCalculator {
  private expenses: Expense[];

  constructor(expenses: Expense[]) {
    this.expenses = expenses;
  }

  calculate(): PayoutResult {
    // Calculate the total expenses incurred
    const totalExpenses = this.expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    // Calculate the equal share for each person
    const numPeople = new Set(this.expenses.map((expense) => expense.name))
      .size;
    const equalShare = totalExpenses / numPeople;

    // Calculate the amount each person owes or is owed
    const balances: { [name: string]: number } = {};
    this.expenses.forEach((expense) => {
      if (balances[expense.name]) {
        balances[expense.name] += expense.amount - equalShare;
      } else {
        balances[expense.name] = expense.amount - equalShare;
      }
    });

    // Generate the payouts array
    const payouts: Payout[] = [];
    Object.keys(balances).forEach((name1) => {
      const balance1 = balances[name1];
      if (balance1 > 0) {
        Object.keys(balances).forEach((name2) => {
          const balance2 = balances[name2];
          if (balance2 < 0) {
            const amount = Math.min(balance1, -balance2);
            payouts.push({ owes: name2, owed: name1, amount });
            balances[name1] -= amount;
            balances[name2] += amount;
          }
        });
      }
    });

    // Return the response object
    const response: PayoutResult = {
      total: totalExpenses,
      equalShare,
      payouts,
    };
    return response;
  }
}

export { PayoutsCalculator };
