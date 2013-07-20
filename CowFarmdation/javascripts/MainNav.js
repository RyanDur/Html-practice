define(['waypoints'], function() {

  return function(container, section, options) {
      var includeMargin = true;
    $(container).waypoint({
        handler: function(direction) {
                     if (direction === 'down') {
                        container.css({'height': section.outerHeight(includeMargin)});

                        section.stop()
                        .addClass('fixed')
                        .css('top', -section.outerHeight())
                        .animate({'top': options.top_spacing});
                     } else {
                        section.stop()
                        .removeClass('fixed')
                        .css("top", section.outerHeight(includeMargin) + options.waypoint_offset)
                        .animate({'top': ""});

                        container.css({'height':'auto'});
                     }
                 },

      offset: function() {
                return -(section.outerHeight()+options.waypoint_offset);
              }
    });
  };
});
