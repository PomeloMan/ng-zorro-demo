import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxPrintModule } from 'ngx-print';
import { EditorModule } from '@tinymce/tinymce-angular';

import { DemoComponent } from './demo.component';
import { TinymceEditorComponent } from './tinymce-editor/tinymce-editor.component';

import { TinymceEditorService } from './tinymce-editor/tinymce-editor.service';

const routes: Route[] = [{
  path: '',
  component: DemoComponent
}, {
  path: 'tinymce-editor',
  component: TinymceEditorComponent
}];

@NgModule({
  entryComponents: [
  ],
  declarations: [
    DemoComponent,
    TinymceEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    NgxPrintModule,
    EditorModule
  ],
  providers: [
    TinymceEditorService
  ]
})
export class DemoModule { }
