import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { showMessage } from 'src/app/utils';

import { AbstractTableComponent } from 'src/app/common/component/abstract-table.component';
import { FormItem, FormItemType } from 'src/app/components/form/form.component';
import { AddModalComponent } from './add-modal/add-modal.component';

import { User, UserService } from './user.service';
import { UserMockService } from './user-mock.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Page } from 'src/app/common/interface/service.interface';
import { RoleService, Role } from '../role/role.service';
import { RoleMockService } from '../role/role-mock.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends AbstractTableComponent<User> implements OnInit {

  @ViewChild('avatarTemplate') avatarTemplate: TemplateRef<void>;

  // super variables
  selectionId = 'username';
  scroll = { x: '1200px', y: 0 };

  // app-header 头部信息
  breadcrumbs: { label: string, url: string }[] = [];

  // 查询条件
  formItems: FormItem[] = [{
    type: FormItemType.input,
    label: 'Display Name',
    name: 'displayName',
    value: ''
  }];

  // self variables
  targetService: any;

  roleList: Role[] = [];


  // temp props
  mocklist: any[] = [];

  constructor(
    protected el: ElementRef,
    private router: Router,
    private service: UserService,
    private mockService: UserMockService,
    private roleService: RoleService,
    private roleMockService: RoleMockService,
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService,
    private translate: TranslateService
  ) {
    super(el);

    for (let index = 0; index < 100; index++) {
      this.mocklist.push(index);
    }

    this.translate.get('USER.BREADCRUMBS').subscribe(value => {
      Object.keys(value).forEach(key => {
        this.breadcrumbs.push(JSON.parse(value[key]));
      });
    });

    if (environment.useMockData) {
      this.isFrontPagination = true;
      this.targetService = mockService;
    } else {
      this.isFrontPagination = false;
      this.targetService = service;
    }
  }

  ngOnInit() {
    this.roleMockService.list().subscribe(res => {
      this.roleList = res;
    });

    this.page();
  }

  ngAfterViewInit(): void {
    debugger
  }

  page() {
    this.targetService.page({
      ...this.body,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }).subscribe((data: Page<User[]>) => {
      this.dataSource = data.content.slice();
      this.total = data.totalElements;

      // transfer data
      this.dataSource.forEach((user: any) => {
        user.roleAlias = user.roles.map(r => (r.name));
      });
      if (this.layout === 'table') {
        setTimeout(() => {
          this.resize();
        });
      }
    });
  }

  /**
   * 编辑用户
   * @param row 指定用户对象
   */
  toUserDetail(row?) {
    if (!row) {
      row = new User(-1);
    }
    this.router.navigate(['/main/system/user', row.username]);
  }

  /**
   * 删除用户
   * @param row 指定用户对象
   */
  delete(row) {
    this.checkedIds = [row.username];
    this.targetService.delete().subscribe(res => {
      showMessage(this.nzMessageService, 'success', '操作成功!');
      this.getData();
    }, err => {
      showMessage(this.nzMessageService, 'error', err);
    });
  }

  /**
   * 下载用户信息
   */
  download() {
    console.log(this.checkedIds, this.mapOfCheckedId);
  }

  /** 用户页面头部操作列表 */
  /**
   * 新增用户
   */
  addUser() {
    const modal = this.nzModalService.create({
      nzContent: AddModalComponent,
      nzComponentParams: {
        roleList: this.roleList
      },
      nzClosable: false, // 显示右上角‘X’按钮
      nzMaskClosable: false, // 点击遮罩层关闭模态框
      nzOnOk: (component) => {
        component.validate();
        if (component.formGroup.valid) {
          return true;
        } else {
          return false;
        }
      }
    });
    modal.open();
  }

  // /**
  //  * 更换布局
  //  * @param layout table | grid
  //  */
  // changeLayout(layout: 'table' | 'grid') {
  //   this.layout = layout;
  // }

}
