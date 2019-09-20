import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxPrintModule } from 'ngx-print';
import { EditorModule } from '@tinymce/tinymce-angular';

import { DemoComponent } from './demo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TinymceEditorComponent } from './tinymce-editor/tinymce-editor.component';
import { TinymceEditorService } from './tinymce-editor/tinymce-editor.service';

const routes: Route[] = [{
  path: '',
  component: DemoComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'tinymce-editor',
  component: TinymceEditorComponent
}];

@NgModule({
  entryComponents: [
  ],
  declarations: [
    DemoComponent,
    DashboardComponent,
    TinymceEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    NgxPrintModule,
    EditorModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    TinymceEditorService
  ]
})
export class DemoModule { }
