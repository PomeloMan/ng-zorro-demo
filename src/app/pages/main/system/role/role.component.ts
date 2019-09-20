import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { convert, showMessage } from 'src/app/utils';
import { FormItem } from 'src/app/components/form/form.component';

import { AbstractTableComponent } from 'src/app/common/component/abstract-table.component';

import { MenuService, Menu } from '../menu/menu.service';
import { Role, RoleService } from './role.service';
import { forkJoin } from 'rxjs';
import { Page } from 'src/app/common/interface/service.interface';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends AbstractTableComponent<Role> implements OnInit {

  // super variables
  form: FormGroup;
  selectionId = 'name';
  isFrontPagination = false;

  // variables
  role: Role = new Role();
  menus: any[] = [];

  // app-header
  breadcrumbs: { label: string, url: string }[] = [];
  // formItems: FormItem[] = [];

  // table

  constructor(
    protected el: ElementRef,
    private router: Router,
    private service: RoleService,
    private translate: TranslateService,
    private menuService: MenuService,
    private fb: FormBuilder,
    private nzMessageService: NzMessageService
  ) {
    super(el);
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      menus: [null, [Validators.required]]
    });

    this.translate.get('ROLE.BREADCRUMBS').subscribe(value => {
      Object.keys(value).forEach(key => {
        this.breadcrumbs.push(JSON.parse(value[key]));
      });
    });
  }

  ngOnInit() {
    const $pageObservable = this.service.page({ ...this.body, pageIndex: this.pageIndex, pageSize: this.pageSize });
    const $menulistObservable = this.menuService.list();
    forkJoin([$menulistObservable, $pageObservable]).subscribe(
      ([menus, roles]: [Menu[], Page<Role[]>]) => {
        this.initMenuTree(menus);
        this.dataHandler(roles);
        // 跟新表格样式 setTimeout 让子组件元素渲染完成后执行
        setTimeout(() => {
          this.resize();
        }, 0);
      });
  }

  page() {
    this.service.page({
      ...this.body,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }).subscribe((res: Page<Role[]>) => {
      this.dataHandler(res);
    });
  }

  /**
   * 编辑行数据（非编辑状态下的操作按钮）
   * @param row 行数据对象
   */
  edit(row) {
    row.origin = { ...row };
    row.editable = true;
  }

  /**
   * 删除行数据（非编辑状态下的操作按钮）
   * @param row 
   */
  delete(row) {
    debugger
  }

  /**
   * 提交编辑（编辑状态下的操作按钮）
   * @param row 行数据对象
   */
  handleEditSubmit(row, index) {
    delete row.origin;
    delete row.editable;
    console.log(row);
    this.service.save(row).subscribe(res => {
      this.dataSource.splice(index, 1, row);
      showMessage(this.nzMessageService, 'success', '保存成功!');
    });
  }

  /**
   * 取消编辑，还原数据（编辑状态下的操作按钮）
   * @param row 行数据对象
   */
  handleEditCancel(row, index) {
    // 将 row 对象还原成 row.origin 对象
    Object.keys(row).forEach(key => {
      if (!!row.origin[key]) {
        row[key] = row.origin[key];
      } else {
        // if (key !== 'origin') {
        //   delete row[key];
        // }
      }
    });
    delete row.origin;
    delete row.editable;
    this.dataSource.splice(index, 1, row);
  }

  /**
   * 处理分页数据
   * @param data Page<Role[]>对象
   */
  private dataHandler(data: Page<Role[]>) {
    this.dataSource = data.content.slice();
    this.total = data.totalElements;
  }

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
