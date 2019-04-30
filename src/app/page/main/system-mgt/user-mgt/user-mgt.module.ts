import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { UserManagementComponent } from './user-mgt.component';

const routes: Route[] = [{
  path: '',
  component: UserManagementComponent
}, {
  path: ':id',
  component: UserManagementComponent
}]

@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ]
})
export class UserManagementModule { }
