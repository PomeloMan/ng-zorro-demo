import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { TinymceEditorService } from './tinymce-editor.service';
import { environment } from 'src/environments/environment';

/**
 * @tinymce/tinymce-angular
 * https://github.com/tinymce/tinymce-angular
 */
@Component({
  selector: 'app-tinymce-editor',
  templateUrl: './tinymce-editor.component.html',
  styleUrls: ['./tinymce-editor.component.scss']
})
export class TinymceEditorComponent implements OnInit, AfterViewInit {

  @ViewChild(EditorComponent) editorComponent: EditorComponent;
  /**
   * 文章 ID
   */
  @Input() articleId: string;
  /**
   * 文章内容
   */
  @Input() dataContent: string;

  @Input() readonly = false;

  editorConfig: any = {
    // 使用本地资源,不适用 tinymce云
    base_url: environment.url + '/tinymce',
    suffix: '.min',
    // icons_url: '/icons/material/icons.js', // load icon pack
    // icons: 'material', // use icon pack
    // tinymce插件
    /**
     * autoresize 编辑器高度随内容的变化而变化
     */
    plugins: `print preview fullpage importcss searchreplace autolink directionality save
      visualblocks visualchars fullscreen image link media template code codesample
      table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist
      lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons
      lineheight`,
    // 可编辑元素 class 名称
    noneditable_editable_class: 'mceEditable',
    // 用户无法编辑 class带有 mceNonEditable的元素内容
    noneditable_noneditable_class: 'mceNonEditable',
    // 引入外部插件
    external_plugins: {
      lineheight: environment.url + '/assets/tinymce/plugins/lineheight/plugin.min.js'
    },
    // 自定义 css 文件 @ref https://www.tiny.cloud/docs/demo/format-custom/
    content_css: [
      environment.url + '/assets/tinymce/css/custom.css'
    ],
    // menubar: '',
    // 定义快捷栏的操作, | 用来分隔显示
    toolbar: `save undo redo |
      bold italic underline strikethrough |
      fontselect fontsizeselect formatselect |
      lineheight |
      alignleft aligncenter alignright alignjustify |
      outdent indent |
      numlist bullist |
      forecolor backcolor removeformat |
      pagebreak |
      charmap emoticons |
      fullscreen preview print |
      image media template link anchor code codesample |
      ltr rtl | table`,
    // 语言包可以使用tinymce提供的网址,但是墙的原因,会连不上,所以还是自行下载,放到assets里面
    language_url: environment.url + 'assets/tinymce/lang/zh_CN.js',
    language: 'zh_CN',
    image_advtab: true,
    height: '100%',
    resize: 'both',
    // 上传图片
    images_upload_handler: (blobInfo, success, failure) => {
      let xhr: XMLHttpRequest;
      let formData: FormData;
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'postAcceptor.php');
      xhr.onload = () => {
        let json;
        if (xhr.status !== 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        if (!json || typeof json.location !== 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
        success(json.location);
      };
      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      xhr.send(formData);
    },
    // 保存内容
    save_onsavecallback: (event) => {
      console.log(this.dataContent);
    },
    // 鼠标选中的快捷操作菜单
    quickbars_selection_toolbar: false,
    // quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    // 工具栏显示方式
    toolbar_drawer: 'sliding',
    // 右键菜单对以下组件有效
    contextmenu: false,
    // contextmenu: 'link image imagetools table',
    // 初始化完成回调
    init_instance_callback: (editor) => {
      editor.getBody().setAttribute('contenteditable', !this.readonly);
    }
  };

  constructor(
    private el: ElementRef,
    private service: TinymceEditorService
  ) {
    // this.editorConfig.menubar = '';
    // this.editorConfig.toolbar = '';
    // this.editorConfig.contextmenu = '';
  }

  ngOnInit() {
    this.service.info(this.articleId).subscribe(res => {
      this.dataContent = res;
    });
  }

  ngAfterViewInit(): void {
    this.initEditorEventListener();
  }

  initEditorEventListener() {
    // 监听 Backspace（8），Delete（46），对于不可编辑元素不执行删除操作
    this.editorComponent.editor.on('keydown', (event) => {
      const node = this.editorComponent.editor.selection.getNode();

      if ((8 === event.keyCode || 46 === event.keyCode) && node.getAttribute('contenteditable') === 'false') {
        event.preventDefault();
        return false;
      }
    });
  }
}
