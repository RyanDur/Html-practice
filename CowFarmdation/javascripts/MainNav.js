define(['waypoints'], function() {

  return function(container, section, options) {
    container.waypoint({
      handler: function(direction) {
                 if (direction === 'down'){
                   container.css({'height': section.outerHeight()});
                   section.stop()
      .addClass('sticky')
      .css('top', -section.outerHeight())
      .animate({'top': options.top_spacing});
                 } else {
                   container.css({'height':'auto'});
                   section.stop()
      .removeClass('sticky')
      .css("top", section.outerHeight() + options.waypoint_offset)
      .animate({'top': ""});
                 }
               },
      offset: function() {
                return -(section.outerHeight()+options.waypoint_offset);
              }
    });
  };
});
