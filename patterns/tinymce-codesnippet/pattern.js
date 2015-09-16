/* tinymce-codesnippet
 *
 * Options:
 *    text(string): The text, which should be shown.
 *
 * Documentation:
 *   # tinymce-codesnippet
 *
 *
 *   {{ example }}
 *
 * Example: example
 *    <form>
 *      <textarea class="pat-tinymce"
 *          data-pat-tinymce='{"relatedItems": {"vocabularyUrl": "/relateditems-test.json" },
 *                            "upload": {"baseUrl": "/", "relativePath": "upload"}
 *                            }'>
 *          <p>test content</p>
 *                                <p>bla <b>bla</b> bla</p>
 *                                <pre id="codesnippet_1"
 *                                         contenteditable="false"
 *                                         class="pat-texteditor codesnippet"
 *                                         data-pat-texteditor="theme:dawn;readOnly:true;showPrintMargin:true;mode:javascript;width:600;height:150;">
 * var foo = 'bar';
 * function foobar() {
 *   return foo;
 * }
 * </pre>
 *          <p>first bla</p>
 *          <p>second bla</p>
 *        </textarea>
 *    </form>
 */

define([
  'jquery',
  'underscore',
  'mockup-patterns-base',
  'mockup-patterns-relateditems',
  'mockup-patterns-modal',
  'tinymce',
  'mockup-patterns-autotoc',
  'text!mockup-patterns-tinymce-url/templates/result.xml',
  'text!mockup-patterns-tinymce-url/templates/selection.xml',
  'mockup-utils',
  'mockup-patterns-tinymce',
  'mockup-patterns-tinymce-url/js/links',
  'mockup-i18n',
  'translate',
  'pat-registry',
  'text!mockup-patterns-tinymce-codesnippet-url/templates/code.xml',
  'ace',
  'ace-mode-css',
  'ace-mode-c_cpp',
  'ace-mode-html',
  'ace-mode-lua',
  'ace-mode-java',
  'ace-mode-javascript',
  'ace-mode-python',
  'ace-mode-text',
  'ace-mode-xml',
  'ace-theme-dawn',
  'ace-theme-monokai',
  'mockup-patterns-texteditor',
  'tinymce-modern-theme',
  'tinymce-advlist',
  'tinymce-anchor',
  'tinymce-autolink',
  'tinymce-autoresize',
  'tinymce-autosave',
  'tinymce-bbcode',
  'tinymce-charmap',
  'tinymce-code',
  'tinymce-colorpicker',
  'tinymce-contextmenu',
  'tinymce-directionality',
  'tinymce-emoticons',
  'tinymce-fullpage',
  'tinymce-fullscreen',
  'tinymce-hr',
  'tinymce-image',
  'tinymce-importcss',
  'tinymce-insertdatetime',
  'tinymce-layer',
  'tinymce-legacyoutput',
  'tinymce-link',
  'tinymce-lists',
  'tinymce-media',
  'tinymce-nonbreaking',
  'tinymce-noneditable',
  'tinymce-pagebreak',
  'tinymce-paste',
  'tinymce-preview',
  'tinymce-print',
  'tinymce-save',
  'tinymce-searchreplace',
  'tinymce-spellchecker',
  'tinymce-tabfocus',
  'tinymce-table',
  'tinymce-template',
  'tinymce-textcolor',
  'tinymce-textpattern',
  'tinymce-visualblocks',
  'tinymce-visualchars',
  'tinymce-wordcount',
  'tinymce-compat3x',
  'mockup-patterns-upload',
  'text!mockup-patterns-tinymce-url/templates/link.xml',
  'text!mockup-patterns-tinymce-url/templates/image.xml'
], function ($, _,
            Base, RelatedItems, Modal, tinymce,
            AutoTOC, ResultTemplate, SelectionTemplate,
            utils, TinymcePattern, LinkModal, I18n, _t, Registry, CodeTemplate) {
  'use strict';

  var Codesnippet = Base.extend({
    name: 'codesnippet'
  });
  tinymce.registry = Registry;
  tinymce.modal = Modal;
  tinymce.on('AddEditor', function(evt){
    var editor = evt.editor;
    editor.addCodeClicked = function() {
      var self = this;
      if (self.codeModal === undefined) {
        var $el = $('<div/>').insertAfter(editor.getElement());
        self.codeModal = new CodeModal($el,
          $.extend(true, {}, self.options, {
            tinypattern: self,
            editor: editor
          })
        );
        self.codeModal.show();
      } else {
        self.codeModal.reinitialize();
        self.codeModal.show();
      }
    };
    var CodeModal = Base.extend({
      init: function() {
        var self = this;
        self.setAttributes();
        self.modal = tinymce.modal.init(self.$el, {
          html: this.generateModalHtml(),
          content: null,
          buttons: '.plone-btn'
        });
        self.initWidth = parseInt(self.modal.options.width) || 600;
        self.modal.on('shown', function(e) {
          var aceed = ace.edit('code');
          self.modal.options.width = Math.max(self.initWidth, self.width + 30);
          self.modal.positionModal();
          $('#mode').val(self.mode);
          $('#mode').on('change', function(){
            var mode = $('#mode').val();
            aceed.getSession().setMode("ace/mode/"+ mode);
          });
          $('#code').append('<i class="mce-ico mce-i-resize handle" style="position:absolute;right:0;bottom:0;cursor:nwse-resize;z-index: 10;"/>');
          $('#code').drag("start",function( ev, dd ){
            dd.width = $( this ).width() + 25;
            dd.height = $( this ).height() + 25;
          })
          .drag(function( ev, dd ){
            $( this ).css({
              width: Math.max( 20, dd.width + dd.deltaX ),
              height: Math.max( 20, dd.height + 2*dd.deltaY )
            });
            $( this ).parent().css({
              width: Math.max( 20, dd.width + dd.deltaX ),
              height: Math.max( 20, dd.height + 2*dd.deltaY )
            });
            self.width = parseInt( $( this ).css('width'));
            self.height = parseInt( $( this ).css('height'));
            $('input[name="width"]', self.modal.$modal).val(self.width);
            $('input[name="height"]', self.modal.$modal).val(self.height);
            self.modal.options.width = Math.max(self.initWidth, self.width + 30);
            self.modal.positionModal();
            aceed.resize();
          },{ handle:'.handle' });
          $('input[name="width"]', self.modal.$modal).on('input', function(evt){
            $('#code').css({width: Math.max( 20, $(this).val())});
            $('#code').parent().css({width: Math.max( 20, $(this).val())});
            self.modal.options.width = Math.max(self.initWidth, self.width + 30);
            self.modal.positionModal();
            aceed.resize();
          });
          $('input[name="height"]', self.modal.$modal).on('input', function(evt){
            $('#code').css({height: Math.max( 20, $(this).val())});
            $('#code').parent().css({height: Math.max( 20, $(this).val())});
            self.modal.options.width = Math.max(self.initWidth, self.width + 30);
            self.modal.positionModal();
            aceed.resize();
          });

          self.$insbutton = $('input[name="insert"]', self.modal.$modal);
          self.$canbutton = $('input[name="cancel"]', self.modal.$modal);
          self.$insbutton.off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var codeString = ace.edit('code').getValue();
            if($(self.options.editor.selection.getNode()).is('#mcepastebin')){
              var selNode = editor.lastSelNode;
            }else{
              var selNode = $(self.options.editor.selection.getNode());
            }
            var mode = $('select#mode', self.modal.$modal).val();
            var width = $('input[name="width"]', self.modal.$modal).val();
            var height = $('input[name="height"]', self.modal.$modal).val();
            if(selNode.is('.codesnippet')){
              selNode.text(codeString);
              selNode.attr('data-pat-texteditor', 'theme:dawn;readOnly:true;mode:' + mode + ';width:' + width + ';height:' + height + ';');
            }else{
              var uniqID = function(idlength) {
                  var charstoformid = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
                  if (! idlength) {
                      idlength = Math.floor(Math.random() * charstoformid.length);
                  }
                  var uniqid = '';
                  for (var i = 0; i < idlength; i++) {
                      uniqid += charstoformid[Math.floor(Math.random() * charstoformid.length)];
                  }
                  // one last step is to check if this ID is already taken by an element before 
                  if(jQuery("#"+uniqid).length == 0)
                      return uniqid;
                  else
                      return uniqID(20)
              }
              var newPre = $('<pre style="background-color:white;color:inherit;" id="codesnippet_' + uniqID(8) + '" contenteditable="false" class="pat-texteditor codesnippet" data-pat-texteditor="theme:dawn;readOnly:true;mode:' + mode + ';width:' + width + ';height:' + height + ';">').text(codeString);
              selNode.after(newPre);
              selNode = newPre;
            }
            if(selNode.next().length == 0){
              selNode.after('<p><br/></p>');
            }
            editor.updateOverlay();
            editor.posCodeElements();
            self.hide();
          });
          self.$canbutton.off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.hide();
          });
        });
      },
      show: function() {
        this.modal.show();
      },

      hide: function() {
        this.modal.hide();
      },
      reinitialize: function() {
        this.setAttributes();
        this.modal.options.html = this.generateModalHtml();
      },
      setAttributes: function(){
        var self = this;
        self.selNode = $(this.options.editor.selection.getNode());
        var texteditorOptions = self.selNode.attr('data-pat-texteditor');
        self.mode = 'text';
        self.width = 500;
        self.height = 200;
        if(texteditorOptions){
          $.each(texteditorOptions.split(';'), function(i,e){
            if(e.startsWith('mode')){
              self.mode = e.split(':')[1];
            }
            if(e.startsWith('width')){
              self.width = parseInt(e.split(':')[1]);
            }
            if(e.startsWith('height')){
              self.height = parseInt(e.split(':')[1]);
            }
          });
        }
      },
      generateModalHtml: function() {
        var self = this;
        if(self.selNode.is('.codesnippet')){
          var content = self.selNode.text();
        }else{
          var content = editor.pasteText || '';
        }

        return _.template(CodeTemplate)({
          content: content,
          mode: self.mode,
          width: self.width,
          height: self.height,
          widthText: _t('Width'),
          heightText: _t('Height'),
          cancelBtn: _t('Cancel'),
          insertBtn: _t('Insert')
        });
      }
    });

    editor.addButton('codesnippet', {
      icon: 'code',
      tooltip: 'Insert/edit code snippet',
      onclick: editor.addCodeClicked,
      stateSelector: '.pat-texteditor',
      classes: 'widget btn code-button'
    });
    editor.addMenuItem('codesnippet', {
      icon: 'code',
      text: 'Code snippet',
      context: 'insert',
      tooltip: 'Insert/edit code snippet',
      onclick: editor.addCodeClicked,
      stateSelector: '.pat-texteditor',
      prependToContext: true
    });
    editor.settings.toolbar = editor.settings.toolbar.replace('ploneimage', 'ploneimage codesnippet');
    editor.settings.contextmenu = 'codesnippet | ' + (editor.settings.contextmenu || 'link image inserttable | cell row column deletetable');
    editor.on('LoadContent', function(evt) {
      this.updateOverlay();
    });
    editor.updateOverlay = function(){
      $('.codesnippetoverlay', $(this.getElement()).parent()).remove();
      var overlay = $('<div class="codesnippetoverlay" style="position:absolute;overflow:hidden;background:transparent;" />');
      overlay.height($(this.iframeElement).height());
      overlay.width($(this.contentDocument).width());
      overlay.css('top', $(this.iframeElement).position().top + $(this.iframeElement).parents('.mce-tinymce').position().top + 1);
      overlay.css('pointer-events', 'none'); // TODO: IE < 11 doesn't support this disable the whole overlay in IE < 11
      $(this.getElement()).parent().append(overlay);
      $(this.getElement()).parent().css('position', 'relative');

      $('.codesnippet', this.contentDocument).each(function(i, code_element){
        var code_clone = $(code_element).clone();
        overlay.append(code_clone);
        tinymce.registry.scan(code_clone);
        $(code_element).css('height', code_clone.height());
        $(code_element).css('width', code_clone.width());
        $('.ace_scrollbar-v').css('pointer-events', 'auto');
        $('.ace_scrollbar-h').css('pointer-events', 'auto');
        $(code_element).css('overflow', 'hidden');
      });
    }
    editor.on('init', function(evt) {
      var self = this;
      self.posCodeElements = function(){
        var editor = this;
        $('.codesnippet', editor.contentDocument).each(function(i, code_element){
          $('#' + code_element.id, editor.contentAreaContainer.parent).parent().css('position', 'absolute'); // TODO: can I prevent that this gets set in the first place?
          $('#' + code_element.id, editor.contentAreaContainer.parent).css(
            'top', $(code_element).position().top - $(editor.contentDocument).scrollTop());
          $('#' + code_element.id, editor.contentAreaContainer.parent).css(
            'left', $(editor.contentDocument).find('html').position().left + $(code_element).offset().left);
        });
      };
      // TODO: find the right event to do this instead of a timeout
      setTimeout(function(){
        self.updateOverlay();
        self.posCodeElements();
      }, 100);
      $(this.contentWindow).resize(function(e){
        $('.codesnippetoverlay').height($(this).height());
      });
      // tinymce.on('change'...)' is not enough
      $(this.contentDocument).on('keydown', function(e){
        var $el = $(self.selection.getNode());
        self.lastSelNode = $el; // tinymce paste plugin sets selection to a pastebin element on keydown so I remember the element here

        if((e.keyCode == 46 || e.keyCode == 8) && $el.hasClass('codesnippet')){
          $el.remove();
          e.preventDefault();
          self.updateOverlay();
        }
        self.posCodeElements();
      });

      $(self.getWin()).scroll(function(){
        self.posCodeElements();
      });
    });
    editor.on('change', function(evt){
      this.updateOverlay();
      this.posCodeElements();
    });
    editor.on('undo', function(evt){
      this.updateOverlay();
      this.posCodeElements();
    });
    editor.on('redo', function(evt){
      this.updateOverlay();
      this.posCodeElements();
    });
    editor.on('paste', function(evt) {
      var cbText = evt.clipboardData.getData('Text');
      var textLength = cbText.length;
      var lineCount = (cbText.match(/\n/g) || []).length;
      var codeCharCount = (cbText.match(/({|}|\[|\]|\<|\>|;|=|\/)/g) || []).length;
      var codeEOLCharCount = (cbText.match(/(\,\\s*\r?\n)|(\{\s*\r?\n)|(\;\s*\r?\n)|(\)\s*\r?\n)/g) || []).length +
        // empty lines (no double empty lines)
        (cbText.match(/(\r?\n){2,}/g) || []).length;
      var indentCount = 
        // empty lines (no double empty lines)
        (cbText.match(/(\r?\n){2,}/g) || []).length + 
        // space indent
        (cbText.match(/\n {2,}/g) || []).length + 
        // tab indent
        (cbText.match(/\n\t+/g) || []).length;
      // TODO: improve code detection heuristic!?
      if(indentCount/lineCount > 0.5 ||
         codeEOLCharCount/lineCount > 0.5){
        if(confirm(_t('This text looks like source code!\n') + _t('Do you want to paste it as a codesnippet block?'))){
          editor.pasteText = cbText;
          editor.addCodeClicked();
          return false;
        }
      }
      return true;
    });
  });

  return Codesnippet;
});
