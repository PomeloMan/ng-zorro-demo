import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { ProjectManagementComponent } from './project-management.component';

const routes: Route[] = [{
  path: '',
  component: ProjectManagementComponent
}, {
  path: ':id',
  component: ProjectManagementComponent
}];

@NgModule({
  declarations: [
    ProjectManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectManagementModule { }
