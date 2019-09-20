import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Observable, Observer, forkJoin } from 'rxjs';

import { MainService, Menu } from '../../../main.service';
import { RoleService, Role } from '../role.service';
import { AbstractDetailComponent } from 'src/app/common/component/abstract-detail.component';
import { NzFormatEmitEvent, NzTreeComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent extends AbstractDetailComponent<Role> implements OnInit {

  menus: Menu[];

  $menusObservable: Observable<Menu[]>;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected service: RoleService,
    protected mainService: MainService,
    protected fb: FormBuilder
  ) {
    super(router, route, service, mainService);

    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      comment: ['', [Validators.required]]
    });

    this.$menusObservable = this.mainService.getMenus();
  }

  ngOnInit() {
    this.mainService.pageChange({
      id: 1021,
      parent: true
    });

    forkJoin(this.$menusObservable).subscribe(([menus]: [Menu[]]) => {
      this.menus = menus;
    })
  }

  submitForm = ($event: any, value: any) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();// 将表单控件值标记为已改变 | markAsPristine 将表单控件值标记为未改变
      this.validateForm.controls[key].updateValueAndValidity();// 重新计算表单控件的值和验证状态
    }
    console.log(value);
  };

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }




  @ViewChild(NzTreeComponent) nzTree: NzTreeComponent;
  defaultCheckedKeys = [];
  defaultSelectedKeys = [];
  defaultExpandedKeys = [];
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nodes = [{
    title: '0-0',
    key: '0-0',
    expanded: true,
    children: [{
      title: '0-0-0',
      key: '0-0-0',
      children: [
        { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
        { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
        { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
      ]
    }, {
      title: '0-0-1',
      key: '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
        { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
        { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
      ]
    }, {
      title: '0-0-2',
      key: '0-0-2',
      isLeaf: true
    }]
  }, {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
      { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
      { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
    ]
  }, {
    title: '0-2',
    key: '0-2',
    isLeaf: true
  }];
}
