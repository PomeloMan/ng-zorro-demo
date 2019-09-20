import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { MainService } from './main.service';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgZorroAntdModule
  ],
  providers: [
    MainService
  ]
})
export class MainModule { }
