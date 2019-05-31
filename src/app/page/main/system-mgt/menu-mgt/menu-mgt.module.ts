import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuManagementComponent } from './menu-mgt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonDirectiveModule } from 'src/app/common/directive/common-directive.module';
import { RouterModule, Route } from '@angular/router';
import { MenuManagementService } from './menu-mgt.service';

const routes: Route[] = [{
  path: '',
  component: MenuManagementComponent
}];

@NgModule({
  declarations: [MenuManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    CommonDirectiveModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MenuManagementService
  ]
})
export class MenuManagementModule { }
