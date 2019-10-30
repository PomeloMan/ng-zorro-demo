tinymce.addI18n('zh_CN', {
  'Checkbox plugin': '复选框'
});

(function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var register = function (editor) {
    editor.addCommand('mceCheckbox', function () {
      // var dom = editor.dom;
      var blocks = editor.selection.getSelectedBlocks();
      var lhv = 0;
      global$1.each(blocks, function (block) {
        if (lhv == 0) {
          let el = block;
          if (el.tagName === 'TD') {
            if (el.classList.contains('checkbox')) {
              el.innerHTML = '<br>';
              el.classList.remove('checkbox');
              el.classList.remove('checkbox-active');
            } else {
              // el.innerHTML = '<svg t="1569424599980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2241" width="24" height="24" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z" p-id="2242" fill="#222f3e"></path></svg>'
              el.innerHTML = '<img src="/assets/tinymce/img/checkbox_unchecked.svg" />';
              el.style.textAlign = 'center';
              el.firstChild.style.width = '24px';
              el.firstChild.style.height = '24px';
              el.firstChild.style.cursor = 'pointer';
              el.classList.add('checkbox');
            }
          }
        }
      });
    });
  };
  var Commands = { register: register };

  var register$1 = function (editor) {
    editor.ui.registry.addToggleButton('checkbox', {
      text: '<svg t="1569424628360" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2771" width="24" height="24" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M726.976697 393.184142c-12.54369-12.447359-32.831716-12.320065-45.248112 0.25631L448.447252 629.248757l-103.26354-106.112189c-12.352748-12.703669-32.60809-12.927295-45.248112-0.639914-12.672705 12.320065-12.959978 32.60809-0.639914 45.248112l126.016611 129.503454c0.063647 0.096331 0.192662 0.096331 0.25631 0.192662 0.063647 0.063647 0.096331 0.192662 0.159978 0.25631 2.016073 1.983389 4.512082 3.19957 6.880796 4.544765 1.247144 0.672598 2.239699 1.792447 3.519527 2.303346 3.872168 1.599785 8.000645 2.399677 12.096439 2.399677 4.06483 0 8.12794-0.799892 11.967424-2.33603 1.247144-0.512619 2.208735-1.536138 3.392232-2.176052 2.399677-1.343475 4.895686-2.528692 6.944443-4.544765 0.063647-0.063647 0.096331-0.192662 0.192662-0.25631 0.063647-0.096331 0.159978-0.127295 0.25631-0.192662l256.223626-259.008628C739.647682 425.888563 739.520387 405.631501 726.976697 393.184142z" p-id="2772"></path><path d="M832 928.00086l-640 0c-52.9288 0-96.00086-43.07206-96.00086-95.99914l0-640c0-52.9288 43.07206-96.00086 96.00086-96.00086l640 0c52.92708 0 95.99914 43.07206 95.99914 96.00086l0 640C928.00086 884.9288 884.9288 928.00086 832 928.00086zM192 160.00086c-17.632039 0-32.00086 14.368821-32.00086 32.00086l0 640c0 17.664722 14.368821 31.99914 32.00086 31.99914l640 0c17.664722 0 31.99914-14.336138 31.99914-31.99914l0-640c0-17.632039-14.336138-32.00086-31.99914-32.00086L192 160.00086z" p-id="2773"></path></svg>',
      tooltip: 'Checkbox plugin',
      onAction: function () {
        return editor.execCommand('mceCheckbox');
      },
      onSetup: function (buttonApi) {
        var editorEventCallback = function (eventApi) {
          let el = eventApi.element;
          if (el && el.classList.contains('checkbox')) {
            buttonApi.setActive(true);
          } else {
            buttonApi.setActive(false);
          }
        };
        editor.on('NodeChange', editorEventCallback);
        return function (buttonApi) {
          editor.off('NodeChange', editorEventCallback);
        }
      }
    });
  };
  var Buttons = { register: register$1 };

  function Plugin() {
    global.add('checkbox', function (editor) {
      Commands.register(editor);
      Buttons.register(editor);
      editor.addShortcut('Meta+C', '', 'mceCheckbox');
    });
  }

  Plugin();

}());
