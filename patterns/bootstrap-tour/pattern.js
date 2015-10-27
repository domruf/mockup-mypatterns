/* bootstrap-tour pattern
 * 
 * Options:
 *   name(string): This option is used to build the name of the storage item where the tour state is stored. The name should contain only alphanumerics, underscores and hyphens. You can initialize several tours with different names in the same page and application. ('tour')
 *   container(string): Appends the step popover to a specific element. ('body')
 *   backdrop(boolean): Show a dark backdrop behind the popover and its element, highlighting the current step. (true)
 *   placement(string): How to position the popover. Possible choices. ('top')
 *   title(string): Step title
 *   content(string): Step content
 * Documentation:
 *   # Bootstrap Tour pattern
 *   {{ example }}
 * 
 * Example: example
 * <div class="pat-bootstrap-tour" data-pat-bootstrap-tour="name:example_tour">
 *   <p>
 *     <span data-pat-bootstrap-tour="title:Step 1;content:Welcome to the Bootstrap Tour example.">Hello</span>
 *     <span data-pat-bootstrap-tour="title:Step 2;content:Normally you would see this tour only once.;placement:bottom">new</span>
 *     <span data-pat-bootstrap-tour="title:Step 3;content:After you have clicked 'End tour' the tour will not (re-)start again when you (re-)open this page.;placement:right">world!</span>
 *   </p>
 *   <div>
 *     <a id="rstStorageBtn" class="plone-btn plone-btn-primary"
 *        onclick="javascript:window.localStorage.removeItem('example_tour_end');window.localStorage.setItem('example_tour_current_step', 0);alert('example_tour reset.\nRefresh page to (re-)start tour.')"
 *        data-pat-bootstrap-tour="title:Step 4;content:To start it again, you'll have to press the Reset button and then (re-)open this page!;placement:bottom">Reset</a>
 *   </div>
 * </div>
 * 
 */

define([
  'jquery',
  'pat-base',
  'pat-mockup-parser',
  'bootstrap-tour'
], function ($, Base, Parser, Tour) {
  'use strict';

  var BootstrapTourPattern = Base.extend({
    mockupParser: Parser,
    name: 'bootstrap-tour',
    trigger: '.pat-bootstrap-tour',
    defaults: {
      name: 'tour',
      backdrop: true,
      container: 'body',
      placement: 'top'
    },
    init: function () {
      var self = this;
      self.tour = new Tour({
        name: self.options.name,
        backdrop: self.options.backdrop !== 'false',
        container: self.options.container,
        placement: self.options.placement,
        backdropPadding: 10
      });
      self.$el.find('[data-pat-bootstrap-tour]').each(function(i,e){
        var elOptions = self.mockupParser.getOptions($(e), 'bootstrap-tour');
        self.tour.addStep({
          element: $(e),
          placement: elOptions.placement || self.options.placement,
          title: elOptions.title || '',
          content: elOptions.content || ''
        });
      });

      // Initialize the tour
      self.tour.init();

      // Start the tour
      self.tour.start();
    }
  });
  return BootstrapTourPattern;
});
