import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

import { DashboardComponent } from './dashboard.component';
import { AntvG2Component } from './antv-g2/antv-g2.component';
import { EchartsComponent } from './echarts/echarts.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}, {
  path: 'antv-g2',
  component: AntvG2Component
}, {
  path: 'echarts',
  component: EchartsComponent
}];

@NgModule({
  declarations: [
    DashboardComponent,
    AntvG2Component,
    EchartsComponent
  ],
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class DashboardRoutingModule { }
