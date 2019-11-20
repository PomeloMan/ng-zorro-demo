import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonDirectiveModule } from 'src/app/directives/common-directive.module';

import { MainComponent } from './main.component';

// import { MainService } from './main.service';

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
    // MainService
  ]
})
export class MainModule { }
