import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { convert, notify, message } from 'src/app/utils';
import { environment } from 'src/environments/environment';

import { NzTableComponent, NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { AbstractTableComponent } from 'src/app/components/abstract-table.component';
import { FormItemType, FormItem } from 'src/app/components/form/form.component';

import { MenuService, Menu, MenuSearchForm } from './menu.service';
import { MenuMockService } from './menu-mock.service';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { isNullOrUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/configs/interface/service.interface';

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
  scroll = { x: '1200px', y: 0 };

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
  // 查询条件
  formItems: FormItem[] = [{
    type: FormItemType.INPUT,
    label: 'MENU.INFO.MENU',
    name: 'name',
    value: ''
  }, {
    type: FormItemType.CHECKBOX,
    label: 'MENU.INFO.TYPE',
    name: 'type',
    value: [
      { label: '菜单', value: '1', checked: true },
      { label: '目录', value: '2', checked: true },
      { label: '操作', value: '3', checked: true }
    ]
  }];

  // 根据环境选择服务
  targetMenuServ: CommonService<Menu>;
  // i18n message data
  message: any = {};
  // loading
  downloading = false; // 点击下载按钮显示加载

  constructor(
    protected el: ElementRef,
    private router: Router,
    private service: MenuService,
    private mockService: MenuMockService,
    private translate: TranslateService,
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService,
    private nzNotificationService: NzNotificationService
  ) {
    super(el);

    // 初始话国际化数据
    this.translate.get([
      'COMMON.DOWNLOAD_SUCCESS',
      'COMMON.DOWNLOAD_FAILURE',
      'COMMON.SAVE_SUCCESS',
      'COMMON.SAVE_FAILURE',
      'COMMON.DELETE_SUCCESS',
      'COMMON.DELETE_FAILURE'
    ]).subscribe(value => {
      this.message = value;
    });

    // 根据环境选择相应服务
    if (environment.useMockData) {
      this.isFrontPagination = true;
      this.targetMenuServ = this.mockService;
    } else {
      this.isFrontPagination = false;
      this.targetMenuServ = this.service;
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * 列表
   */
  list() {
    this.isLoading = true;
    this.targetMenuServ.list().subscribe((menus: Menu[]) => {
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
      notify(this.nzNotificationService, 'error', '加载失败!', error);
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
   * 删除菜单
   */
  delete(ids) {
    this.checkedIds = ids;
    this.targetMenuServ.delete(ids).subscribe(res => {
      message(this.nzMessageService, 'success', this.message['COMMON.DELETE_SUCCESS']);
      this.getData();
    }, err => {
      message(this.nzMessageService, 'error', this.message['COMMON.DELETE_FAILURE']);
    });
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
        return this.targetMenuServ.save(component.form).subscribe(res => {
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
   * 保存/跟新
   */
  saveOrUpdate(menu: Menu) {
    if (isNullOrUndefined(menu.id)) {
      // save
      this.targetMenuServ.save(menu).subscribe(() => {
        message(this.nzMessageService, 'success', this.message['COMMON.SAVE_SUCCESS']);
      }, err => {
        message(this.nzMessageService, 'error', this.message['COMMON.SAVE_FAILURE']);
      });
    } else {
      // update
      this.targetMenuServ.update(menu).subscribe(() => {
        message(this.nzMessageService, 'success', this.message['COMMON.SAVE_SUCCESS']);
      }, err => {
        message(this.nzMessageService, 'error', this.message['COMMON.SAVE_FAILURE']);
      });
    }
  }

  /******************** 头部菜单栏事件 ********************/

  /******************** 底部菜单栏事件 ********************/
  download() {
    this.downloading = true;
    setTimeout(() => {
      this.downloading = false;
      message(this.nzMessageService, 'success', this.message['COMMON.DOWNLOAD_SUCCESS']);
    }, 500);
  }
}
