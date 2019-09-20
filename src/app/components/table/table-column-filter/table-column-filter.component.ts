import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-column-filter',
  templateUrl: './table-column-filter.component.html',
  styleUrls: ['./table-column-filter.component.scss']
})
export class TableColumnFilterComponent implements OnInit {

  /**
   * 原始值，用于 reset 还原
   */
  origin: any;

  /**
   * 查询方式
   */
  @Input() mode: 'input' | 'select';

  /**
   * 查询绑定值
   */
  @Input() value: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @Output() submited: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.origin = this.value;
  }

  submit(reset: boolean = false) {
    if (!!reset) {
      this.value = this.origin;
    }
    this.valueChange.emit(this.value);
    this.submited.emit(this.value);
  }
}
