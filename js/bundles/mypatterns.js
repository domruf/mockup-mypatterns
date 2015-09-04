define([
  'jquery',  // We use jquery to search the DOM for pattern declarations.
  'pat-registry',  // We have to register
  'mockup-patterns-tinymce-codesnippet'  // Depend on the patterns, you want to support in this bundle.
], function($, Registry) {
  'use strict';

  $(document).ready(function() {
    var $registry = $('body'); // Get all DOM nodes with the specified class.
    Registry.scan($registry);  // Add ``pat-minimalpattern`` to Mockup's registry.
  });
});
