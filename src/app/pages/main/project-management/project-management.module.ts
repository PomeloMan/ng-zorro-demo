import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { RouterModule, Route } from '@angular/router';

const routes: Route[] = [{
  path: '',
  component: ProjectManagementComponent
}, {
  path: ':id',
  component: ProjectManagementComponent
}]

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
