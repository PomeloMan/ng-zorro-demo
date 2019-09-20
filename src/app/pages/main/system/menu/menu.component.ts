import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { convert, createNotification, showConfirm, showMessage } from 'src/app/utils';

import { NzTableComponent, NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { AbstractTableComponent } from 'src/app/common/component/abstract-table.component';
import { FormItemType, FormItem } from 'src/app/components/form/form.component';

import { MenuService, Menu, MenuSearchForm } from './menu.service';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { isNullOrUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends AbstractTableComponent<Menu> implements OnInit {

  @ViewChild('table') tableComponent: NzTableComponent;
  // override
  isFrontPagination = false;
  isTreenode = true;
  pageble = false;

  // self properties
  body: MenuSearchForm = new MenuSearchForm();
  menu: Menu = new Menu();

  // menu treenode
  nodes = [];

  // 显示/隐藏列
  visibleColumns = [
    { label: 'Menu', key: 'name', disabled: true },
    { label: 'Parent Menu', key: 'parent' },
    { label: 'Url', key: 'url' },
    { label: 'Type', key: 'type' },
    { label: 'Order', key: 'order' },
    { label: 'Auth', key: 'auth' }
  ];

  // app-header 头部信息
  breadcrumbs: { label: string, url: string }[] = [];

  // 查询条件
  formItems: FormItem[] = [{
    type: FormItemType.input,
    label: 'Menu',
    name: 'name',
    value: ''
  }, {
    type: FormItemType.checkbox,
    label: 'Type',
    name: 'type',
    value: [
      { label: '菜单', value: '1', checked: true },
      { label: '目录', value: '2', checked: true },
      { label: '操作', value: '3', checked: true }
    ]
  }];

  // service
  $menusObservable: Observable<Menu[]>;
  $saveObservable: Observable<Menu>;
  $updateObservable: Observable<Menu>;
  $deleteObservable: Observable<any>;

  constructor(
    protected el: ElementRef,
    private router: Router,
    private service: MenuService,
    private translate: TranslateService,
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService,
    private nzNotificationService: NzNotificationService
  ) {
    super(el);
    this.$menusObservable = this.service.list(this.body);
    this.$saveObservable = this.service.save(this.menu);
    this.$updateObservable = this.service.update(this.menu);
    this.$deleteObservable = this.service.delete(this.checkedIds);

    this.translate.get('MENU.BREADCRUMBS').subscribe(value => {
      Object.keys(value).forEach(key => {
        this.breadcrumbs.push(JSON.parse(value[key]));
      });
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  list() {
    this.isLoading = true;
    forkJoin([this.$menusObservable]).subscribe(([menus]: [Menu[]]) => {
      this.dataSource = menus.slice();
      this.nodes = convert({
        id: '0',
        name: 'Root Menu',
        children: this.dataSource
      }, (node) => ({
        ...node,
        title: node.name,
        key: node.id,
        parent: node.parent,
        isLeaf: true
      }), (array, hashMap) => {
        array.forEach(item => {
          item.children = hashMap[item.key];
          if (item.children) {
            delete item.isLeaf;
          }
        });
        return array.filter(item => !item.parent);
      });
      // 跟新表格样式
      setTimeout(() => {
        // setTimeout 让子组件元素渲染完成后执行
        this.resize();
      }, 0);
    }, error => {
      console.error(error);
      createNotification(this.nzNotificationService, 'error', '加载失败!', error);
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }, () => {
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }); // 在一个流的生命周期中，error和complete只会触发其中一个
  }

  /**
   * 详情模态框
   */
  openDetailModal(menu?) {
    const modal: any = this.nzModalService.create({
      nzContent: DetailModalComponent,
      nzComponentParams: {
        nodes: this.nodes, // 菜单选择树
        menu
      },
      nzOnOk: (component) => {
        modal.nzOkLoading = true;
        return this.$deleteObservable.subscribe(res => {
          return false;
        }, err => {
          return false;
        });
        // return false;
      }
    });
    modal.open();
  }

  /**
   * 删除菜单
   */
  delete(menu?) {
    showConfirm(this.nzModalService, () => {
      this.checkedIds = [menu.id];
      this.$deleteObservable.subscribe(res => {
        showMessage(this.nzMessageService, 'success', '操作成功!');
        this.getData();
      }, err => {
        createNotification(this.nzNotificationService, 'error', null, err);
      });
    });
  }

  /**
   * 保存/跟新
   */
  saveOrUpdate() {
    if (isNullOrUndefined(this.menu.id)) {
      // save
      this.$saveObservable.subscribe((menu: Menu) => {

      });
    } else {
      // update
      this.$updateObservable.subscribe((menu: Menu) => {

      });
    }
  }
}
