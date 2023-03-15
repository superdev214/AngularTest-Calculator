import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Expense } from '../../types/Expense';

@Component({
  selector: 'data-list',
  templateUrl: './dataList.component.html',
  styleUrls: ['./dataList.component.scss'],
})
export class DataList implements OnInit {
  @Input() dataList: Expense[] = new Array<Expense>();
  @Output() onItemDelete: EventEmitter<Expense> = new EventEmitter<Expense>();

  ngOnInit() {}

  deleteItem(item: Expense) {
    this.onItemDelete.emit(item);
  }
}
