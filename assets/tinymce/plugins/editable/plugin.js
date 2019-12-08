tinymce.addI18n('zh_CN', {
  'Editable plugin': '不可编辑'
});

(function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var register = function (editor) {
    editor.addCommand('mceEditable', function () {
      // var dom = editor.dom;
      var blocks = editor.selection.getSelectedBlocks();
      var lhv = 0;
      global$1.each(blocks, function (block) {
        if (lhv == 0) {
          if (block.classList.contains('mceNonEditable')) {
            block.classList.remove('mceNonEditable');
            block.setAttribute('contenteditable', true);
          } else {
            block.classList.add('mceNonEditable');
            block.setAttribute('contenteditable', false);
          }
        }
      });
    });
  };
  var Commands = { register: register };

  var register$1 = function (editor) {
    editor.ui.registry.addToggleButton('editable', {
      text: '<svg t="1569302240901" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3762" width="24" height="24" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M695.68 384.192l43.968-43.968L622.08 222.592 216.128 628.416l-11.776 129.472 129.472-11.776L448 631.936v108.608l-79.552 79.552-248.96 22.592 22.656-248.896L685.248 50.752a64 64 0 0 1 90.496 0l135.744 135.744a64 64 0 0 1 0 90.496l-125.376 125.44a191.232 191.232 0 0 0-90.368-18.24zM448 902.144H140.8a38.4 38.4 0 0 0 0 76.8H448v-76.8z m228.288-733.888l117.696 117.696 54.144-54.208-117.632-117.632-54.208 54.144zM576 640V576h76.8v64h211.2a32 32 0 0 1 32 32v275.2a32 32 0 0 1-32 32h-320a32 32 0 0 1-32-32v-275.2a32 32 0 0 1 32-32H576z m12.8 262.4h230.4v-185.6H588.8v185.6zM755.2 576c0-31.104-21.312-51.2-51.2-51.2s-51.2 19.52-51.2 51.2H576a128 128 0 1 1 256 0h-76.8z m0 0H832v64h-76.8V576z" fill="#222f3e" p-id="3763"></path></svg>',
      tooltip: 'Editable plugin',
      onAction: function () {
        return editor.execCommand('mceEditable');
      },
      onSetup: function (buttonApi) {
        var editorEventCallback = function (eventApi) {
          if (eventApi.element.getAttribute('contenteditable') === 'false') {
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
    global.add('editable', function (editor) {
      Commands.register(editor);
      Buttons.register(editor);
      editor.addShortcut('Meta+E', '', 'mceEditable');
    });
  }

  Plugin();

}());
