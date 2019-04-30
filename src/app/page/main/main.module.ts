import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonDirectiveModule } from 'src/app/common/directive/common-directive.module';
import { MainRoutingModule } from './main-routing.modules';

import { MainComponent } from './main.component';
import { MainService } from './main.service';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgZorroAntdModule,
    CommonDirectiveModule
  ],
  providers: [
    MainService
  ]
})
export class MainModule { }
