import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonDirectiveModule } from 'src/app/common/directive/common-directive.module';

import { RoleManagementComponent } from './role-mgt.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleManagementService } from './role-mgt.service';

const routes: Route[] = [{
  path: '',
  component: RoleManagementComponent
}, {
  path: 'role/:id',
  component: RoleDetailComponent
}]

@NgModule({
  declarations: [
    RoleManagementComponent,
    RoleDetailComponent
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
    RoleManagementService
  ]
})
export class RoleManagementModule { }
