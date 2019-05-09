import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { UserManagementComponent } from './user-mgt.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManagementService } from './user-mgt.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonDirectiveModule } from 'src/app/common/directive/common-directive.module';
import { UserDetailBasicComponent } from './user-detail-basic/user-detail-basic.component';

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
    UserDetailComponent,
    UserDetailBasicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    CommonDirectiveModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserManagementService
  ]
})
export class UserManagementModule { }
