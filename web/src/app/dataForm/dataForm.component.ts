import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../types/Expense';

@Component({
  selector: 'data-form',
  templateUrl: './dataForm.component.html',
  styleUrls: ['./dataForm.component.scss'],
})
export class DataForm implements OnInit {
  @Output() onItemAdded: EventEmitter<Expense> = new EventEmitter<Expense>();
  @Output() onSettledUp: EventEmitter<void> = new EventEmitter<void>();
  name: string = '';
  amount: number = 0;

  ngOnInit() {}

  onSubmit() {
    const { name, amount } = this;
    this.onItemAdded.emit({
      name,
      amount,
    });

    this.name = '';
    this.amount = 0;
  }

  onSettleUp() {
    this.onSettledUp.emit();
  }

  selectType() {}
}
