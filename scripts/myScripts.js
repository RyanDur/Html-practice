var reveal = function(section) {
    section.delay(1000).animate({opacity: 1}, 1500);
};

var slidePanelsIn = function() {
    $('.sidebar-left').addClass('slideIn');
    $('.sidebar-right').addClass('slideIn');
}

var stickySection = function(container, section, options) {
    container.waypoint({
        handler: function(direction) {
                    if (direction == 'down'){
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

$(function() {
    //$("nav").css('opacity', 0);
    //reveal($('nav'));
    var options = {top_spacing: 15, waypoint_offset: 150};
    stickySection($(".nav-container"), $("nav"), options);
    slidePanelsIn();
});

