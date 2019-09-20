import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  /**
   * default: 主页模式 / table: 表格模式 / custom: 自定义内容
   */
  @Input() mode: 'default' | 'table' | 'custom' = 'default';

  /**
   * 显示分页
   */
  @Input() showPagination: boolean;

  /**
   * 总共条数
   */
  @Input() total: number;

  /**
   * 当前页
   */
  @Input() pageIndex: number;

  /**
   * 每页显示条数
   */
  @Input() pageSize: number;

  /**
   * 表格模式时左边菜单栏模板
   */
  @Input() menusTemplateRef: TemplateRef<any>;

  @Output() pageIndexChanged: EventEmitter<number> = new EventEmitter();
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  pageIndexChange(pageIndex) {
    this.pageIndexChanged.emit(pageIndex);
  }

  pageSizeChange(pageSize) {
    this.pageSizeChanged.emit(pageSize);
  }
}
