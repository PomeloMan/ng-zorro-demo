import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { TinymceEditorService } from './tinymce-editor.service';

/**
 * @tinymce/tinymce-angular
 * https://github.com/tinymce/tinymce-angular
 */
@Component({
  selector: 'app-tinymce-editor',
  templateUrl: './tinymce-editor.component.html',
  styleUrls: ['./tinymce-editor.component.scss']
})
export class TinymceEditorComponent implements OnInit {

  @ViewChild(EditorComponent) editorComponent: EditorComponent;

  /**
   * 文章 ID
   */
  @Input() articleId: string;
  /**
   * 文章内容
   */
  @Input() articleContent: string;

  editorConfig = {
    // 使用本地资源,不适用 tinymce云
    base_url: '/tinymce',
    suffix: '.min',
    // tinymce插件
    /**
     * autoresize 编辑器高度随内容的变化而变化
     */
    plugins: `print preview fullpage importcss searchreplace autolink directionality save
      visualblocks visualchars fullscreen image link media template code codesample
      table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist
      lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons
      lineheight`,
    // 引入外部插件
    external_plugins: {
      lineheight: '/assets/tinymce/plugins/lineheight/plugin.min.js'
    },
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
      ltr rtl`,
    // 语言包可以使用tinymce提供的网址,但是墙的原因,会连不上,所以还是自行下载,放到assets里面
    language_url: 'assets/tinymce/langs/zh_CN.js',
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
      console.log(this.articleContent);
    },
    // 鼠标选中的快捷操作菜单
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    // 用户无法编辑 class带有 mceNonEditable的元素内容
    noneditable_noneditable_class: 'mceNonEditable',
    // 工具栏显示方式
    toolbar_drawer: 'sliding',
    // 右键菜单对以下组件有效
    contextmenu: 'link image imagetools table'
  };

  constructor(
    private el: ElementRef,
    private service: TinymceEditorService
  ) { }

  ngOnInit() {
    this.service.info(this.articleId).subscribe(res => {
      this.articleContent = res;
    });
  }
}
