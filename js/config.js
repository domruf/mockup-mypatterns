 /* globals module:true */

(function() {
  'use strict';

  var requirejsOptions = {
    baseUrl: './',
    optimize: 'none',
    paths: {
      // This pattern's dependencies
      'jquery': 'bower_components/jquery/dist/jquery',
      'mockup-patterns-base': 'bower_components/mockup-core/js/pattern',
      'pat-compat': 'bower_components/patternslib/src/core/compat',
      'pat-utils': 'bower_components/patternslib/src/core/utils',
      'pat-jquery-ext': 'bower_components/patternslib/src/core/jquery-ext',
      'pat-logger': 'bower_components/patternslib/src/core/logger',
      'pat-registry': 'bower_components/mockup-core/js/registry',
      'logging': 'bower_components/logging/src/logging',
      'mockup-patterns-minimalpattern': 'patterns/minimalpattern/pattern',
      'mockup-bundles-minimalpattern': 'js/bundles/minimalpattern',
      'mockup-bundles-docs': 'js/bundles/docs',

      'mockup-patterns-tablesorter': 'patterns/tablesorter/pattern',

      // mockup-core dependencies. They have to be included here, since we did
      // not found a good way of requireing the base config at RequireJS
      // initialization. It works for grunt via Common JS.
      'mockup-docs': 'bower_components/mockup-core/js/docs/app',
      'mockup-docs-navigation': 'bower_components/mockup-core/js/docs/navigation',
      'mockup-docs-page': 'bower_components/mockup-core/js/docs/page',
      'mockup-docs-pattern': 'bower_components/mockup-core/js/docs/pattern',
      'mockup-docs-view': 'bower_components/mockup-core/js/docs/view',
      'mockup-fakeserver': 'bower_components/mockup/mockup/tests/fakeserver',
      'mockup-parser': 'bower_components/mockup-core/js/parser',
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
      'underscore': 'bower_components/lodash/dist/lodash.underscore'
    },
    shim: {
      // This package's shims (None). Shims are libraries, which are not
      // prepared for Require JS and have to be wrapped by it to make module
      // loading also work for those.

      // mockup-core shims
      'backbone': {exports: 'window.Backbone', deps: ['underscore', 'jquery']},
      'bootstrap-collapse': {exports: 'window.jQuery.fn.collapse.Constructor', deps: ['jquery']},
      'bootstrap-transition': {exports: 'window.jQuery.support.transition', deps: ['jquery']},
      'expect': {exports: 'window.expect'},
      'sinon': {exports: 'window.sinon'},
      'underscore': {exports: 'window._'}
    },
    wrapShim: true
  };

  if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    // Add this module to Common JS module exports, if available.
    module.exports = requirejsOptions;
  }
  if (typeof requirejs !== 'undefined' && requirejs.config) {
    // Initialize RequireJS with the configuration in this module.
    requirejs.config(requirejsOptions);
  }

}());
