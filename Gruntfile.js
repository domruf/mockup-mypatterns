/* globals module:true */
module.exports = function(grunt) {
  'use strict';

  var MockupGrunt = require('./bower_components/mockup/mockup/js/grunt');

  // Include the project's RequireJS configuration
  var requirejsOptions = require('./js/config');

  // Create a new insance of the Mockup grunt task suite.
  var mockup = new MockupGrunt(requirejsOptions);

  // list of resources, which should be included for the documentation.
  var docsExtraIncludes = [];

  // Get all patterns and include their paths in the documentation
  for (var i = 0; i < mockup.patterns.length; i = i + 1) {
    if (mockup.patterns[i].indexOf('-url') === -1) {
      docsExtraIncludes.push(mockup.patterns[i]);
      docsExtraIncludes.push('text!' + requirejsOptions.paths[mockup.patterns[i]] + '.js');
    }
  }

  // Register the docs bundle with some custom config.
  mockup.registerBundle('docs', {
      less: {
        options: {
          modifyVars: {
            bowerPath: '"bower_components/"',
            mockuplessPath: '"bower_components/mockup/mockup/less/"'
          }
        }
      },
      sed: {
        'docs-ace-packaged': {
          path: 'build/docs.js',
          pattern: 'ace\\.config\\.set\\("packaged"\\, true\\)',
          replacement: 'ace.config.set("packaged", false)'
        },
        'docs-min-ace-packaged': {
          path: 'build/docs.min.js',
          pattern: 'ace\\.config\\.set\\("packaged"\\,\\!\\d\\)',
          replacement: 'ace.config.set("packaged",!1)'
        }
      }
    },
    {extraInclude: docsExtraIncludes, url: 'docs'}
  );

  mockup.registerBundle('widgets', {
      less: {
        options: {
          modifyVars: {
            bowerPath: '"bower_components/"',
            mockupPath: '"bower_components/mockup/mockup/patterns"',
            mockuplessPath: '"bower_components/mockup/mockup/less/"'
          }
        }
      },
      sed: {
          'widgets-ace-path': {
            path: 'build/widgets.js',
            pattern: '\\+\\+plone\\+\\+static/components/ace-builds/src/',
            replacement: '++resource++plone.resourceeditor/ace/'
          },
          'widgets-min-ace-path': {
            path: 'build/widgets.min.js',
            pattern: '\\+\\+plone\\+\\+static/components/ace-builds/src/',
            replacement: '++resource++plone.resourceeditor/ace/'
          }
      }
    },{
      path: 'build/',
      extraInclude: docsExtraIncludes,
      url: '++resource++plone.app.widgets',
    }
  );
  

  // initialize grunt and set up all tasks.
  mockup.initGrunt(grunt);
};
