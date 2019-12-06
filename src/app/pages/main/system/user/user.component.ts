import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { message } from 'src/app/utils';

import { AbstractTableComponent } from 'src/app/components/abstract-table.component';
import { FormItem, FormItemType } from 'src/app/components/form/form.component';
import { AddModalComponent } from './add-modal/add-modal.component';

import { User, UserService } from './user.service';
import { UserMockService } from './user-mock.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Page, CommonService } from 'src/app/configs/interface/service.interface';
import { RoleService, Role } from '../role/role.service';
import { RoleMockService } from '../role/role-mock.service';
import { Observable, forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  // 查询条件
  formItems: FormItem[];

  /** -- self variables -- */
  // 根据环境选择服务
  targetUserServ: CommonService<User>;
  targetRoleServ: CommonService<Role>;
  // 角色列表
  roles: Role[] = [];

  // i18n message data
  message: any = {};
  // loading
  downloading = false; // 点击下载按钮显示加载

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

    // 初始话国际化数据
    this.translate.get([
      'COMMON.DOWNLOAD_SUCCESS',
      'COMMON.DOWNLOAD_FAILURE',
      'COMMON.DELETE_SUCCESS',
      'COMMON.DELETE_FAILURE'
    ]).subscribe(value => {
      this.message = value;
    });

    // 根据环境选择相应服务
    if (environment.useMockData) {
      this.isFrontPagination = true;
      this.targetUserServ = this.mockService;
      this.targetRoleServ = this.roleMockService;
    } else {
      this.isFrontPagination = false;
      this.targetUserServ = this.service;
      this.targetRoleServ = this.roleService;
    }

    // 构建数据
    const $roleObv: Observable<Role[]> = this.targetRoleServ.list();
    const $pageObv: Observable<Page<User[]>> = this.page();
    forkJoin([$roleObv, $pageObv]).subscribe(([roles, pageUser]: [Role[], Page<User[]>]) => {
      this.roles = roles;
      // 构建动态表单数据
      const roleOptions = this.roles.map(role => ({
        label: role.name,
        value: role.name
      }));
      roleOptions.unshift({
        label: 'All',
        value: ''
      });
      this.formItems = [{
        type: FormItemType.INPUT,
        label: 'USER.INFO.DISPLAY_NAME',
        name: 'displayName',
        value: ''
      }, {
        type: FormItemType.RADIO_BUTTON,
        label: 'USER.INFO.ROLE',
        name: 'role',
        value: '',
        external: {
          options: roleOptions
        }
      }];

      // to do with pageUser...
    });
  }

  ngOnInit() {
  }

  /**
   * 分页 -- 调用方法返回 Observable，page().subscribe() 执行请求
   * @returns Observable<Page<User[]>>
   */
  page(): Observable<Page<User[]>> {
    return this.targetUserServ.page({
      ...this.body,
      pageIndex: this.pageIndex - 1,
      pageSize: this.pageSize
    }).pipe(tap((data: Page<User[]>) => {
      this.dataSource = data.content.slice();
      this.total = data.totalElements;

      if (this.layout === 'table') {
        setTimeout(() => {
          this.resize();
        });
      }
      return data;
    }));
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
    this.targetUserServ.delete(this.checkedIds).subscribe(res => {
      message(this.nzMessageService, 'success', this.message['COMMON.DELETE_SUCCESS']);
      this.getData();
    }, err => {
      console.error(err);
      message(this.nzMessageService, 'error', this.message['COMMON.DELETE_FAILURE']);
    });
  }

  /**
   * 下载用户信息
   */
  download() {
    console.log(this.checkedIds, this.mapOfCheckedId);
    this.downloading = true;
    setTimeout(() => {
      this.downloading = false;
      message(this.nzMessageService, 'success', this.message['COMMON.DOWNLOAD_SUCCESS']);
    }, 500);
  }

  /** 用户页面头部操作列表 */
  /**
   * 新增用户
   */
  addUser() {
    const modal = this.nzModalService.create({
      nzContent: AddModalComponent,
      nzComponentParams: {
        roleList: this.roles
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
