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

var getRepo = function() {
    var url = 'https://api.github.com/users/RyanDur/repos'
        $.ajax({
            type: 'GET',
            url: url,
            cache: false,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                console.dir(json.data[0].name);
                $.each(json.data, function(index, val) {
                    $('.git').append("<li><a href="+ val.html_url +
                    " target=_blank>"+ val.name +"</a></li>");
                })
            }
        });
};

$(function() {
    var options = {top_spacing: 15, waypoint_offset: 150};
    stickySection($(".nav-container"), $("nav"), options);
    slidePanelsIn();
    getRepo();
});

