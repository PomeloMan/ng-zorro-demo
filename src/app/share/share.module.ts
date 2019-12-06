import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxPrintModule } from 'ngx-print';
import { TranslateModule } from '@ngx-translate/core';
import { CommonDirectiveModule } from '../directives/common-directive.module';
import { CommonComponentModule } from '../components/common-component.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    NgxPrintModule,
    TranslateModule,
    CommonDirectiveModule,
    CommonComponentModule,
    PerfectScrollbarModule
  ],
  exports: [
    CommonModule,
    FormsModule, // 表单模块
    ReactiveFormsModule, // 响应式表单模块
    RouterModule, // 路由模块
    NgZorroAntdModule, // ng-zorro组件库模块
    NgxPrintModule, // 打印组件模块
    TranslateModule,
    CommonDirectiveModule, // 通用指令模块
    CommonComponentModule, // 通用组件模块
    PerfectScrollbarModule
  ]
})
export class ShareModule { }
