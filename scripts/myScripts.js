var revealNav = function() {
    $("nav").delay(1000).animate({opacity: 1}, 1500);
};

var stickySection = function(container, section) {
    var top_spacing = 15;
    var waypoint_offset = 150;
    container.waypoint({
        handler: function(direction) {
                    if (direction == 'down'){
                        container.css({'height': section.outerHeight()});
                        section.addClass('sticky')
                            .stop()
                            .css('top', -section.outerHeight())
                            .animate({'top': top_spacing});
                    } else {
                        container.css({'height':'auto'});
                        section.removeClass('sticky')
                            .stop()
                            .css("top", section.outerHeight() + waypoint_offset)
                            .animate({'top': ""});
                    }
                 },
        offset: function() {
                    return -(section.outerHeight()+waypoint_offset);
                }
    });
};

$(function() {
    $("nav").css('opacity', 0);
    $(window).load(revealNav);
    stickySection($(".nav-container"), $("nav"));
});

