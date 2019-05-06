import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { UserManagementComponent } from './user-mgt.component';
import { UserManagementService } from './user-mgt.service';

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
  ],
  providers: [
    UserManagementService
  ]
})
export class UserManagementModule { }
