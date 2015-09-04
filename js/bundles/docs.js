/* Minimalpattern documentation bundle
 *
 */

require([
  'mockup-docs',  // We need mockup-core's `mockup-doc` pattern,
  'bootstrap-collapse',  // Bootstrap collapse for expanding the pattern title to a pattern, if we click on it,
  'ace',
  'mockup-fakeserver'  // And Mockup-core's fakeserver.
], function(Docs) {
  'use strict';

  ace.config.set("packaged", false); // TODO: quickfix for problem loading ace modules in docs build 
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
          }
        ]
      }
    ]

  });

  return docs; // RequireJS expects you to return, what you want to expose to other modules.
});
