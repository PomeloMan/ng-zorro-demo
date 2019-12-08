import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxPrintModule } from 'ngx-print';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SiderComponent } from './sider/sider.component';
import { FormComponent } from './form/form.component';
import { TableColumnEditorComponent } from './table/table-column-editor/table-column-editor.component';
import { TableColumnFilterComponent } from './table/table-column-filter/table-column-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    NgxPrintModule,
    TranslateModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SiderComponent,
    FormComponent,
    TableColumnEditorComponent,
    TableColumnFilterComponent,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SiderComponent,
    FormComponent,
    TableColumnEditorComponent,
    TableColumnFilterComponent,
  ]
})
export class CommonComponentModule { }
