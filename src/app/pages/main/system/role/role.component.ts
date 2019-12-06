import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Page, CommonService } from 'src/app/configs/interface/service.interface';
import { convert, message } from 'src/app/utils';
import { environment } from 'src/environments/environment';

import { AbstractTableComponent } from 'src/app/components/abstract-table.component';

import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuService, Menu } from '../menu/menu.service';
import { Role, RoleService } from './role.service';
import { RoleMockService } from './role-mock.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends AbstractTableComponent<Role> implements OnInit {

  // super variables
  selectionId = 'name';
  isFrontPagination = false;
  rowEditable = true;

  // table column filter
  listOfStatus = [{ text: 'Valid', value: '1' }, { text: 'Invalid', value: '2' }];

  /** -- self variables -- */
  // 根据环境选择服务
  targetRoleServ: CommonService<Role>;

  menus: any[] = [];

  // i18n message data
  message: any = {};
  // loading
  downloading = false;

  constructor(
    protected el: ElementRef,
    private router: Router,
    private service: RoleService,
    private mockService: RoleMockService,
    private translate: TranslateService,
    private menuService: MenuService,
    private nzMessageService: NzMessageService
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
      this.targetRoleServ = this.mockService;
    } else {
      this.isFrontPagination = false;
      this.targetRoleServ = this.service;
    }

    // 初始数据
    const $menuObv = this.menuService.list();
    const $pageObv = this.page();
    forkJoin([$menuObv, $pageObv]).subscribe(
      ([menus, roles]: [Menu[], Page<Role[]>]) => {
        this.initMenuTree(menus);

        // to do with roles...
      });
  }

  ngOnInit() {
  }

  /**
   * 分页
   */
  page(): Observable<Page<Role[]>> {
    return this.targetRoleServ.page({
      ...this.body,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }).pipe(tap((res: Page<Role[]>) => {
      this.dataSource = res.content.slice();
      this.total = res.totalElements;

      if (this.layout === 'table') {
        // 跟新表格样式 setTimeout 让子组件元素渲染完成后执行
        setTimeout(() => {
          this.resize();
        });
      }
      return res;
    }));
  }

  /**
   * 删除行数据（非编辑状态下的操作按钮）
   * @param row
   */
  delete(row) {
    return this.targetRoleServ.delete([row[this.selectionId]]).subscribe(res => {
      message(this.nzMessageService, 'success', this.message['COMMON.DELETE_SUCCESS']);
      this.getData();
    }, err => {
      message(this.nzMessageService, 'error', this.message['COMMON.DELETE_FAILURE']);
    });
  }

  /**
   * @override
   * 保存编辑行
   */
  saveRow(row) {
    return this.targetRoleServ.save(row).pipe(
      tap(() => {
        message(this.nzMessageService, 'success', this.message['COMMON.SAVE_SUCCESS']);
      }),
      catchError((err) => {
        message(this.nzMessageService, 'error', this.message['COMMON.SAVE_FAILURE']);
        // return of(null);
        throw err;
      }));
  }

  /******************** 头部菜单栏事件 ********************/
  addRole() {
    const role = new Role();
    this.dataSource = [...this.dataSource, role];
  }

  /******************** 底部菜单栏事件 ********************/
  download() {
    this.downloading = true;
    setTimeout(() => {
      this.downloading = false;
      message(this.nzMessageService, 'success', this.message['COMMON.DOWNLOAD_SUCCESS']);
    }, 500);
  }

  /******************** private methods ********************/
  /**
   * 初始菜单树
   * @param menus
   */
  private initMenuTree(menus) {
    this.menus = convert({
      id: '0',
      name: 'Root Menu',
      children: menus.slice()
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
  }
}
