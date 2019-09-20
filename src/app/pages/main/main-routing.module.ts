import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [{
    path: 'demo',
    loadChildren: './demo/demo.module#DemoModule'
  }, {
    path: 'project',
    loadChildren: './project-management/project-management.module#ProjectManagementModule'
  }, {
    path: 'system',
    loadChildren: './system/system.module#SystemModule'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }
