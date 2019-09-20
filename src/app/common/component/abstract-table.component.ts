import { Input, ElementRef, HostListener } from '@angular/core';
import { Paginator } from '../interface/paginator.interface';
import { AbstractPageComponent } from './abstract-page.component';

export class AbstractTableComponent<T> extends AbstractPageComponent implements Paginator {

  /**
   * nz-table props
   */
  private _dataSource: T[] = []; // table dataset
  isFrontPagination = true; // front paging if true
  isTreenode = false; // show treenode mode if true
  isLoading = false; // show loading if true
  scroll: object; //

  /**
   * nz-table select & expand
   */
  selectionId = 'id'; // row id/key
  isAllChecked = false; // all row checked if true
  isIndeterminate = false; // at least one row checked if true
  checkedIds: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  mapOfTreenodeData: { [key: string]: T[] } = {};

  /**
   * nz-table exts
   */
  private _visibleColumns: { key }[] = [];
  mapOfVisibleColumn: { [key: string]: boolean } = {};

  constructor(
    protected el: ElementRef
  ) {
    super();
  }

  /**
   * 监听 dataSource 跟新
   */
  @Input()
  set dataSource(value) {
    this._dataSource = value;
    if (this.isTreenode) {
      // convert dataSource to treenode format
      this._dataSource.forEach((r: any) => {
        this.mapOfTreenodeData[r[this.selectionId]] = this.convertTreeToList(r);
      });
    }
  }

  get dataSource() {
    return this._dataSource;
  }

  @Input()
  set visibleColumns(value) {
    this._visibleColumns = value;
    this._visibleColumns.forEach(item => {
      this.mapOfVisibleColumn[item.key] = true;
    });
  }

  get visibleColumns() {
    return this._visibleColumns;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize();
  }

  // ngOnInit(): void {
  //   // 监听浏览器大小变化
  //   fromEvent(window, 'resize').pipe(
  //     debounceTime(100)
  //   ).subscribe((event) => {
  //     this.resize();
  //   });
  // }

  /**
   * 全选
   * @param value
   */
  checkAll(value: boolean): void {
    if (this.isTreenode) {
      // 树形数据
      this.checkAllWithChildren(this._dataSource, value);
    } else {
      // 默认表格数据
      this._dataSource.filter((item: any) => !item.disabled)
        .forEach((item: any) => { this.mapOfCheckedId[item[this.selectionId]] = value; });
    }
    this.refreshStatus();
  }

  /**
   * 全选(树形数据)
   * @param array
   * @param value
   */
  checkAllWithChildren(array, value: boolean) {
    array.forEach(item => {
      if (!item.disabled) {
        this.mapOfCheckedId[item[this.selectionId]] = value;
        if (item.children) {
          this.checkAllWithChildren(item.children, value);
        }
      }
    });
  }

  /**
   * 跟新选中状态
   */
  refreshStatus(): void {
    let dataSource = [];
    if (this.isTreenode) {
      // 树形数据
      const keys = Object.keys(this.mapOfTreenodeData);
      keys.forEach(key => {
        dataSource = [...dataSource, ...this.mapOfTreenodeData[key]];
      });
    } else {
      // 默认表格数据
      dataSource = this._dataSource;
    }
    // refresh checkedIds
    this.checkedIds = Object.keys(this.mapOfCheckedId).filter(key => this.mapOfCheckedId[key]);
    // check status
    this.isAllChecked = dataSource.filter((item: any) => !item.disabled)
      .every((item: any) => this.mapOfCheckedId[item[this.selectionId]]);
    this.isIndeterminate = dataSource.filter((item: any) => !item.disabled)
      .some((item: any) => this.mapOfCheckedId[item[this.selectionId]]) && !this.isAllChecked;
  }

  /**
   * 展开/收缩 行(树形数据)
   * @param array
   * @param data
   * @param $event
   */
  collapse(array: any[], data: any, $event: boolean): void {
    if ($event === false) {
      if (data.children && array) {
        data.children.forEach(d => {
          const target = array.find(a => a[this.selectionId] === d[this.selectionId]);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  stopPropagation(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * 重新设置 table 内容高度
   * @param differ
   */
  resize(differ?) {
    const _tableWrap: HTMLElement = this.el.nativeElement.querySelector('.table-wrap');
    const _tableTitle: HTMLElement = _tableWrap.querySelector('div.ant-table-title');
    const _tableThead: HTMLElement = _tableWrap.querySelector('thead.ant-table-thead');
    this.scroll = {
      y: _tableWrap.clientHeight -
        (_tableTitle ? _tableTitle.clientHeight : 0) -
        (_tableThead ? _tableThead.clientHeight : 0) -
        (differ ? differ : 0) + 'px'
    };
  }
  /******************** private methods ********************/

  /**
   * 构建树形数据
   * @param root
   */
  private convertTreeToList(root: object): T[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        node.expand = true;
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }
    return array;
  }

  private visitNode(node: any, hashMap: { [key: string]: any }, array: T[]): void {
    if (!hashMap[node[this.selectionId]]) {
      hashMap[node[this.selectionId]] = true;
      array.push(node);
    }
  }
}
