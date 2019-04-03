import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.modules';
import { NgZorroAntdModule } from 'ng-zorro-antd';
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
