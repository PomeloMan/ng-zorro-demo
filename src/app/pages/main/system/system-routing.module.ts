import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'user',
  loadChildren: './user/user.module#UserModule'
}, {
  path: 'role',
  loadChildren: './role/role.module#RoleModule'
}, {
  path: 'menu',
  loadChildren: './menu/menu.module#MenuModule'
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class SystemRoutingModule { }
