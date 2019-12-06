import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

import { ProjectManagementComponent } from './project-management.component';
import { BREADCRUMBS } from 'src/app/constants/breadcrumbs';

const routes: Route[] = [{
  path: '',
  component: ProjectManagementComponent,
  data: {
    breadcrumbs: BREADCRUMBS.PROJECT
  }
}, {
  path: ':id',
  component: ProjectManagementComponent
}];

@NgModule({
  declarations: [
    ProjectManagementComponent
  ],
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectManagementModule { }
