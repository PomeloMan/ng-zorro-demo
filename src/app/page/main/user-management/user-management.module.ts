import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { Route, RouterModule } from '@angular/router';

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
    RouterModule.forChild(routes)
  ]
})
export class UserManagementModule { }
