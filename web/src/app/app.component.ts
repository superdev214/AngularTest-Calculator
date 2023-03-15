import { Component } from '@angular/core';
import { Expense } from '../types/Expense';
import { HttpClient } from '@angular/common/http';
import { PayoutsResponse } from '../types/PayoutsResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  Book: string = 'Book';
  Song: string = 'Song';
  expenses: Expense[] = [];
  songs: Expense[] = [];
  payouts: string = '';

  private SettleUpUrl = 'http://localhost:3000/payouts';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onItemAdded(item: Expense) {
    this.expenses.push(item);
  }

  onItemDelete(item: Expense) {
    this.expenses = this.expenses.filter((s) => s.name !== item.name);
  }

  onSettledUp() {
    this.http
      .post(this.SettleUpUrl, {
        expenses: this.expenses,
      })
      .subscribe((resp) => {
        this.payouts = JSON.stringify(resp, null, 2);
      });
  }
}
