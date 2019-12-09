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
      lineheight editable form checkbox`,
    // 可编辑元素 class 名称
    noneditable_editable_class: 'mceEditable',
    // 用户无法编辑 class带有 mceNonEditable的元素内容
    noneditable_noneditable_class: 'mceNonEditable',
    // 引入外部插件
    external_plugins: {
      lineheight: environment.url + '/assets/tinymce/plugins/lineheight/plugin.min.js',
      editable: environment.url + '/assets/tinymce/plugins/editable/plugin.js',
      form: environment.url + '/assets/tinymce/plugins/form/plugin.js',
      checkbox: environment.url + '/assets/tinymce/plugins/checkbox/plugin.js'
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
      ltr rtl | table editable form checkbox`,
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

      this.dataContent.replace(new RegExp('>&nbsp;</td>', 'g'), ' contenteditable="true">&nbsp;</td>');
      this.dataContent.replace(new RegExp('>&nbsp;</th>', 'g'), ' contenteditable="true">&nbsp;</th>');
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
    // this.readonly = true;
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

    // 监听 click checkbox 事件
    this.editorComponent.editor.on('click', (event) => {
      // let node = this.editorComponent.editor.selection.getNode();
      const el = event.target;
      if (el.tagName === 'IMG') {
        const node = el.parentElement;
        if (node && node.classList.contains('checkbox')) {
          if (node.classList.contains('checkbox-active')) {
            // 选中 -> 未选中
            node.classList.remove('checkbox-active');
            // node.innerHTML = '<svg t="1569424599980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2241" width="24" height="24" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z" p-id="2242" fill="#222f3e"></path></svg>';
            // node.innerHTML = '<img src="/assets/tinymce/img/checkbox_unchecked.svg" />';
            // node.firstChild.style.cursor = 'pointer';
            node.firstElementChild.src = environment.url + '/assets/tinymce/img/checkbox_unchecked.svg';
          } else {
            // 未选中 -> 选中
            node.classList.add('checkbox-active');
            // node.innerHTML = '<svg t="1569424628360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2771" width="24" height="24" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M726.976697 393.184142c-12.54369-12.447359-32.831716-12.320065-45.248112 0.25631L448.447252 629.248757l-103.26354-106.112189c-12.352748-12.703669-32.60809-12.927295-45.248112-0.639914-12.672705 12.320065-12.959978 32.60809-0.639914 45.248112l126.016611 129.503454c0.063647 0.096331 0.192662 0.096331 0.25631 0.192662 0.063647 0.063647 0.096331 0.192662 0.159978 0.25631 2.016073 1.983389 4.512082 3.19957 6.880796 4.544765 1.247144 0.672598 2.239699 1.792447 3.519527 2.303346 3.872168 1.599785 8.000645 2.399677 12.096439 2.399677 4.06483 0 8.12794-0.799892 11.967424-2.33603 1.247144-0.512619 2.208735-1.536138 3.392232-2.176052 2.399677-1.343475 4.895686-2.528692 6.944443-4.544765 0.063647-0.063647 0.096331-0.192662 0.192662-0.25631 0.063647-0.096331 0.159978-0.127295 0.25631-0.192662l256.223626-259.008628C739.647682 425.888563 739.520387 405.631501 726.976697 393.184142z" p-id="2772"></path><path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z" p-id="2773"></path></svg>';
            // node.innerHTML = '<img src="/assets/tinymce/img/checkbox_checked.svg" />';
            // node.firstChild.style.cursor = 'pointer';
            node.firstElementChild.src = environment.url + '/assets/tinymce/img/checkbox_checked.svg';
          }
        }
      }
    });
  }
}
