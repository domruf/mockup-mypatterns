/* Mypattern documentation bundle
 *
 */

require([
  'mockup-docs',  // We need mockup-core's `mockup-doc` pattern,
  'tinymce',
  'mockup-patterns-bootstrap-tour',
  'bootstrap-collapse',  // Bootstrap collapse for expanding the pattern title to a pattern, if we click on it,
  'ace',
  'mockup-fakeserver'  // And Mockup-core's fakeserver.
], function(Docs, Tinymce) {
  'use strict';

  ace.config.set("packaged", false); // TODO: quickfix for problem loading ace modules in docs build 
  Tinymce.on('AddEditor', function(evt){
    evt.editor.on('LoadContent', function(e) {
      $('body').addClass('pat-bootstrap-tour').attr('data-pat-bootstrap-tour', 'backdrop:false');
      $('.mce-code-button').attr('data-pat-bootstrap-tour', 'title:Add Code Snippets;content:New! You can add code snippet blocks now!');
      setTimeout(function(){
        tinymce.registry.scan($('body'), ["bootstrap-tour"]);
      }, 1000);
    });
  });
  var docs = new Docs({
    pages: [
      { // Index page.
        id: 'index',
        title: 'Mockup - My Patterns',
        description: 'A few mockup patterns that are not part of plone core.',
        text: '[See it in action!](#pattern)',
        autotoc: false
      },
      { // Patterns page.
        id: 'pattern',
        title: 'Patterns',
        description: 'A few mockup patterns that are not part of plone core.',
        autotoc: false,
        patterns: [
          {
            id: 'minimalpattern',  // pattern id.
            title: 'Minimalpattern',  // pattern title.
            description: 'A minimal pattern',  // pattern description.
            url: 'patterns/minimalpattern/pattern.js'  // path to the pattern within the project structure.
          },
          {
            id: 'tinymce-codesnippet',  // pattern id.
            title: 'Tinymce Codesnippet',  // pattern title.
            description: 'A tinymce plugin for code snippets',  // pattern description.
            url: 'patterns/tinymce-codesnippet/pattern.js'  // path to the pattern within the project structure.
          },
          { 
            id: 'tablesorter',
            title: 'Table Sorter',
            description: 'A pattern you can apply to a table so it can have its items rearranged when clicking the header',
            url: 'patterns/tablesorter/pattern.js'
          },
          { 
            id: 'bootstrap-tour',
            title: 'bootstrap-tour',
            description: 'A pattern for creating tours to guide your users through your web site.',
            url: 'patterns/bootstrap-tour/pattern.js'
          }
        ]
      }
    ]

  });

  return docs; // RequireJS expects you to return, what you want to expose to other modules.
});
