import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ShareModule } from 'src/app/share/share.module';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailBasicComponent } from './user-detail-basic/user-detail-basic.component';
import { AddModalComponent } from './add-modal/add-modal.component';

import { UserService } from './user.service';
import { UserMockService } from './user-mock.service';
import { RoleService } from '../role/role.service';
import { RoleMockService } from '../role/role-mock.service';

import { BREADCRUMBS } from 'src/app/constants/breadcrumbs';

const routes: Route[] = [{
  path: '',
  component: UserComponent,
  data: {
    breadcrumbs: BREADCRUMBS.USER
  }
}, {
  path: ':id',
  component: UserDetailComponent,
  data: {
    breadcrumbs: BREADCRUMBS.USER_DETAIL
  }
}, {
  path: 'new'
}];

@NgModule({
  entryComponents: [
    AddModalComponent
  ],
  declarations: [
    UserComponent,
    UserDetailComponent,
    UserDetailBasicComponent,
    AddModalComponent
  ],
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService,
    UserMockService,
    RoleService,
    RoleMockService
  ]
})
export class UserModule { }
