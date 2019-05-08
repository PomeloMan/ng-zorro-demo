import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { UserManagementComponent } from './user-mgt.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManagementService } from './user-mgt.service';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [{
  path: '',
  component: UserManagementComponent
}, {
  path: 'user/:id',
  component: UserDetailComponent
}]

@NgModule({
  declarations: [
    UserManagementComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserManagementService
  ]
})
export class UserManagementModule { }
