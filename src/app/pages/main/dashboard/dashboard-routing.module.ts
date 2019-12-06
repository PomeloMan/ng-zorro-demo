import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

import { DashboardComponent } from './dashboard.component';
import { AntvG2Component } from './antv-g2/antv-g2.component';
import { EchartsComponent } from './echarts/echarts.component';
import { BREADCRUMBS } from 'src/app/constants/breadcrumbs';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  data: {
    breadcrumbs: BREADCRUMBS.DASHBOARD
  }
}, {
  path: 'antv-g2',
  component: AntvG2Component,
  data: {
    breadcrumbs: BREADCRUMBS.DASHBOARD_ANTV_G2
  }
}, {
  path: 'echarts',
  component: EchartsComponent,
  data: {
    breadcrumbs: BREADCRUMBS.DASHBOARD_ECHARTS
  }
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
