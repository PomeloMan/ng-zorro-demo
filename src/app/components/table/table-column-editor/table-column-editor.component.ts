import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-column-editor',
  templateUrl: './table-column-editor.component.html',
  styleUrls: ['./table-column-editor.component.scss']
})
export class TableColumnEditorComponent implements OnInit {

  /**
   * 是否可编辑
   */
  _editable: boolean;

  /**
   * 编辑模式
   */
  @Input() mode: 'string' | 'select' | 'tree-select';

  /**
   * 额外参数，mode='select'时用 external.option 来传 select options
   */
  @Input() external: any;

  /**
   * 原值（即 editable=true 时的值）
   */
  @Input() origin: any;

  /**
   * 最新值
   */
  @Input() value: any;

  /**
   * tree-select 选中项
   */
  @Input() selectedValue: any;

  /**
   * 双向绑定
   */
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  // @Input()
  // set restore(value) {
  //   if (!!value) {
  //     this.value = this.origin;
  //     this.valueChange.emit(this.value);
  //   }
  // }

  @Input()
  set editable(value) {
    this._editable = value;
    if (!!value) {
      this.origin = this.value;

      if (this.mode === 'tree-select') {
        this.selectedValue = this.value.map(i => (i.id));
      }
    }
  }

  get editable() {
    return this._editable;
  }

  constructor() { }

  ngOnInit() {
    if (this.mode === 'tree-select') {
      this.iteratorTreeData();
    }
  }

  valueChanged($value) {
    this.valueChange.emit(this.value);
  }

  selectedValueChanged($value) {
    this.value = this.external._options.filter(o => this.selectedValue.includes(o.id));
    this.valueChange.emit(this.value);
  }


  /**
   * 遍历树数据，转成数组
   */
  private iteratorTreeData() {
    this.external._options = [];
    this.external.options.forEach(item => {
      this.visitNode(item);
    });
  }

  private visitNode(node) {
    this.external._options.push(node);
    if (node.children) {
      node.children.forEach(item => {
        this.visitNode(item);
      });
    }
  }
}
