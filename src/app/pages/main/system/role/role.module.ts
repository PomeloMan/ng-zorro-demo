import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

import { RoleComponent } from './role.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleService } from './role.service';
import { MenuService } from '../menu/menu.service';

const routes: Route[] = [{
  path: '',
  component: RoleComponent
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
    MenuService
  ]
})
export class RoleModule { }
