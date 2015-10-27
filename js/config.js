 /* globals module:true */

(function() {
  'use strict';

  var requirejsOptions = {
    baseUrl: './',
    optimize: 'none',
    paths: {
      // This pattern's dependencies
      'jquery': 'bower_components/jquery/dist/jquery',
      'pat-compat': 'bower_components/patternslib/src/core/compat',
      'pat-utils': 'bower_components/patternslib/src/core/utils',
      'pat-jquery-ext': 'bower_components/patternslib/src/core/jquery-ext',
      'pat-logger': 'bower_components/patternslib/src/core/logger',
      'pat-registry': 'bower_components/patternslib/src/core/registry',
      'pat-base': 'bower_components/patternslib/src/core/base',
      'logging': 'bower_components/logging/src/logging',
      'mockup-patterns-minimalpattern': 'patterns/minimalpattern/pattern',
      'mockup-bundles-widgets': 'js/bundles/widgets',
      'mockup-bundles-docs': 'js/bundles/docs',
      'mockup-patterns-passwordstrength': 'bower_components/mockup/mockup/patterns/passwordstrength/pattern',
      'mockup-patterns-passwordstrength-url': 'bower_components/mockup/mockup/patterns/passwordstrength',
      'mockup-patterns-pickadate': 'bower_components/mockup/mockup/patterns/pickadate/pattern',
      'picker': 'bower_components/pickadate/lib/picker',
      'picker.date': 'bower_components/pickadate/lib/picker.date',
      'picker.time': 'bower_components/pickadate/lib/picker.time',
      //'mockup-patterns-recurrence': 'bower_components/mockup/mockup/patterns/recurrence/pattern',
      //'jquery.recurrenceinput': 'bower_components/jquery.recurrenceinput.js/src/jquery.recurrenceinput',
      //'jquery.tools.dateinput': 'bower_components/jquery.recurrenceinput.js/lib/jquery.tools.dateinput',
      //'jquery.tools.overlay': 'bower_components/jquery.recurrenceinput.js/lib/jquery.tools.overlay',
      //'jquery.tmpl': 'bower_components/jquery.recurrenceinput.js/lib/jquery.tmpl',
      'mockup-patterns-querystring': 'bower_components/mockup/mockup/patterns/querystring/pattern',
      'mockup-patterns-textareamimetypeselector': 'bower_components/mockup/mockup/patterns/textareamimetypeselector/pattern',

      'mockup-patterns-tablesorter': 'patterns/tablesorter/pattern',

       // my deps
      'mockup-patterns-modal': 'bower_components/mockup/mockup/patterns/modal/pattern',
      'tinymce': 'bower_components/tinymce-builded/js/tinymce/tinymce',
      'tinymce-modern-theme': 'bower_components/tinymce-builded/js/tinymce/themes/modern/theme',
      'mockup-patterns-tinymce': 'bower_components/mockup/mockup/patterns/tinymce/pattern',
      'mockup-patterns-tinymce-url': 'bower_components/mockup/mockup/patterns/tinymce',
      'mockup-patterns-autotoc': 'bower_components/mockup/mockup/patterns/autotoc/pattern',
      'mockup-patterns-relateditems': 'bower_components/mockup/mockup/patterns/relateditems/pattern',
      'ace': 'bower_components/ace-builds/src/ace',
      'mockup-patterns-texteditor': 'bower_components/mockup/mockup/patterns/texteditor/pattern',
      'mockup-patterns-select2': 'bower_components/mockup/mockup/patterns/select2/pattern',
      'mockup-patterns-tree': 'bower_components/mockup/mockup/patterns/tree/pattern',
      'mockup-patterns-upload': 'bower_components/mockup/mockup/patterns/upload/pattern',
      'jquery.event.drag': 'bower_components/mockup/mockup/lib/jquery.event.drag',
      'jquery.event.drop': 'bower_components/mockup/mockup/lib/jquery.event.drop',
      'mockup-patterns-upload-url': 'bower_components/mockup/mockup/patterns/upload',
      'dropzone': 'bower_components/dropzone/dist/dropzone-amd-module',
      'mockup-patterns-backdrop': 'bower_components/mockup/mockup/patterns/backdrop/pattern',
      'mockup-router': 'bower_components/mockup/mockup/js/router',
      'mockup-utils': 'bower_components/mockup/mockup/js/utils',
      'translate': 'bower_components/mockup/mockup/js/i18n-wrapper',
      'mockup-i18n': 'bower_components/mockup/mockup/js/i18n',
      'jquery.form': 'bower_components/jquery-form/jquery.form',
      'select2': 'bower_components/select2/select2',
      'jqtree': 'bower_components/jqtree/tree.jquery',
      'ace-mode-css': 'bower_components/ace-builds/src/mode-css',
      'ace-mode-c_cpp': 'bower_components/ace-builds/src/mode-c_cpp',
      'ace-mode-html': 'bower_components/ace-builds/src/mode-html',
      'ace-mode-lua': 'bower_components/ace-builds/src/mode-lua',
      'ace-mode-java': 'bower_components/ace-builds/src/mode-java',
      'ace-mode-javascript': 'bower_components/ace-builds/src/mode-javascript',
      'ace-mode-python': 'bower_components/ace-builds/src/mode-python',
      'ace-mode-text': 'bower_components/ace-builds/src/mode-text',
      'ace-mode-xml': 'bower_components/ace-builds/src/mode-xml',
      'ace-theme-dawn': 'bower_components/ace-builds/src/theme-dawn',
      'ace-theme-monokai': 'bower_components/ace-builds/src/theme-monokai',

      // for my code
      'mockup-patterns-tinymce-codesnippet': 'patterns/tinymce-codesnippet/pattern',
      'mockup-patterns-tinymce-codesnippet-url': 'patterns/tinymce-codesnippet',
      'bootstrap-tour': 'bower_components/bootstrap-tour/build/js/bootstrap-tour-standalone',
      'mockup-patterns-bootstrap-tour': 'patterns/bootstrap-tour/pattern',

      // mockup-core dependencies. They have to be included here, since we did
      // not found a good way of requireing the base config at RequireJS
      // initialization. It works for grunt via Common JS.
      'mockup-docs': 'bower_components/mockup/mockup/js/docs/app',
      'mockup-docs-navigation': 'bower_components/mockup/mockup/js/docs/navigation',
      'mockup-docs-page': 'bower_components/mockup/mockup/js/docs/page',
      'mockup-docs-pattern': 'bower_components/mockup/mockup/js/docs/pattern',
      'mockup-docs-view': 'bower_components/mockup/mockup/js/docs/view',
      'mockup-fakeserver': 'bower_components/mockup/mockup/tests/fakeserver',
      'pat-mockup-parser': 'bower_components/patternslib/src/core/mockup-parser',
      'JSXTransformer': 'bower_components/react/JSXTransformer',
      'backbone': 'bower_components/backbone/backbone',
      'bootstrap-collapse': 'bower_components/bootstrap/js/collapse',
      'bootstrap-transition': 'bower_components/bootstrap/js/transition',
      'expect': 'bower_components/expect/index',
      //'jquery': 'bower_components/jquery/dist/jquery',  // Well, that's a duplicate.
      'marked': 'bower_components/marked/lib/marked',
      'react': 'bower_components/react/react',
      'sinon': 'bower_components/sinonjs/sinon',
      'text': 'bower_components/requirejs-text/text',
      'underscore': 'bower_components/underscore/underscore'
    },
    shim: {
      // This package's shims (None). Shims are libraries, which are not
      // prepared for Require JS and have to be wrapped by it to make module
      // loading also work for those.

      // mockup-core shims
      'backbone': {exports: 'window.Backbone', deps: ['underscore', 'jquery']},
      'bootstrap-tour': {exports: 'Tour', deps: ['jquery']},
      'bootstrap-collapse': {exports: 'window.jQuery.fn.collapse.Constructor', deps: ['jquery']},
      'bootstrap-transition': {exports: 'window.jQuery.support.transition', deps: ['jquery']},
      'expect': {exports: 'window.expect'},
      'sinon': {exports: 'window.sinon'},
      'underscore': {exports: 'window._'},
      'tinymce': {
        exports: 'window.tinyMCE',
        init: function () {
          this.tinyMCE.DOM.events.domLoaded = true;
          return this.tinyMCE;
        },
      },
      'jqtree': { deps: ['jquery'] },
      'tinymce-modern-theme': { deps: ['tinymce'] },
      'jquery.event.drag': { deps: ['jquery'] },
     'jquery.event.drop': { deps: ['jquery'], exports: '$.drop' },
    },
    wrapShim: true
  };

  var tinymcePlugins = [
    'advlist', 'anchor', 'autolink', 'autoresize', 'autosave', 'bbcode',
    'charmap', 'code', 'colorpicker', 'contextmenu', 'directionality',
    'emoticons', 'fullpage', 'fullscreen', 'hr', 'image', 'importcss',
    'insertdatetime', 'layer', 'legacyoutput', 'link', 'lists', 'media',
    'nonbreaking', 'noneditable', 'pagebreak', 'paste', 'preview', 'print',
    'save', 'searchreplace', 'spellchecker', 'tabfocus', 'table', 'template',
    'textcolor', 'textpattern', 'visualblocks', 'visualchars', 'wordcount',
    'compat3x'
  ];
  for(var i=0; i<tinymcePlugins.length; i=i+1){
    var plugin = tinymcePlugins[i];
    requirejsOptions.paths['tinymce-' + plugin] = 'bower_components/tinymce-builded/js/tinymce/plugins/' + plugin + '/plugin';
    requirejsOptions.shim['tinymce-' + plugin] = {
      deps: ['tinymce']
    };
 }

  if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    // Add this module to Common JS module exports, if available.
    module.exports = requirejsOptions;
  }
  if (typeof requirejs !== 'undefined' && requirejs.config) {
    // Initialize RequireJS with the configuration in this module.
    requirejs.config(requirejsOptions);
  }

}());
