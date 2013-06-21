var revealNav = function() {
    $("nav").delay(1000).animate({opacity: 1}, 1500);
};

var stickySection = function(container, section) {
    container.waypoint({
        handler: function(direction) {
                    section.toggleClass('sticky', direction=='down');
                    if (direction == 'down')
                       container.css({ 'height': section.outerHeight()  });
                    else
                       container.css({ 'height':'auto'  });
                 }
    });
};

$(function() {
    $("nav").css('opacity', 0);
    $(window).load(revealNav);
    stickySection($(".nav-container"), $("nav"));
});

