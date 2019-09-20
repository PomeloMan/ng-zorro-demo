import { Paginator } from '../interface/paginator.interface';
import { isNullOrUndefined } from 'util';

export class AbstractPageComponent implements Paginator {

  /**
   * determine if paging is possible
   */
  pageble = true;

  total = 0;
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  sortName = '';
  sortValue: 'descend' | 'ascend' | null = null;

  /**
   * request body
   */
  body: any = {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  };

  constructor() { }

  /**
   * 根据字段排序
   * @param sort.key 字段名称
   * @param sort.value descend:倒序 | ascend:顺序 | null:默认
   */
  sort(sort: { key: string; value: 'descend' | 'ascend' | null }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.page();
  }

  filter(filter: { key: string, value: any }) {
    this.pageIndex = 1; // reset page index
    this.body[filter.key] = filter.value;
    this.page();
  }

  /**
   * 分页查询
   * @param callback 回调函数
   */
  page(callback?) {}

  /**
   * 列表查询 (前端分页)
   * @param callback 回调函数
   */
  list(callback?) { }

  /**
   * 查询（添加查询条件）
   * @param body request body
   * @param resetPageIndex set pageIndex = 1 if true
   */
  getData(body?, resetPageIndex: boolean = false) {
    if (!isNullOrUndefined(body)) { this.body = body; }
    console.log(this.body);
    if (this.pageble) {
      if (resetPageIndex) { this.pageIndex = 1; }
      this.page();
    } else {
      this.list();
    }
  }

  /**
   * 页面跳转
   * @param pageIndex 当前跳转页
   */
  pageIndexChange(pageIndex) {
    this.pageIndex = pageIndex;
    this.getData();
  }

  /**
   * 每页显示条数更新
   * @param pageSize 每页显示条数
   */
  pageSizeChange(pageSize) {
    this.pageSize = pageSize;
    this.pageIndex = 1;
    this.getData();
  }
}
