import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

import { RoleComponent } from './role.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleService } from './role.service';
import { RoleMockService } from './role-mock.service';
import { MenuService } from '../menu/menu.service';

import { BREADCRUMBS } from 'src/app/constants/breadcrumbs';

const routes: Route[] = [{
  path: '',
  component: RoleComponent,
  data: {
    breadcrumbs: BREADCRUMBS.ROLE
  }
}, {
  path: 'role/:id',
  component: RoleDetailComponent
}];

@NgModule({
  declarations: [
    RoleComponent,
    RoleDetailComponent
  ],
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    RoleService,
    RoleMockService,
    MenuService
  ]
})
export class RoleModule { }
