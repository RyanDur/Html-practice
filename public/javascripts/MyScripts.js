var reveal = function(section) {
    section.delay(1000).animate({opacity: 1}, 1500);
};

var forEach = function(array, func) {
    for(var i = 0; i < array.length; i++ ) {
        func(array[i]);
    }
};

var compareDates = function(a, b) {
    return (a.updated_at > b.updated_at) ? 1 : ((a.updated_at < b.updated_at) ? -1 : 0); 
};

var slidePanelsIn = function() {
    $('.sidebar-left').addClass('slideIn');
    $('.sidebar-right').addClass('slideIn');
};

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

var gitRepos = {
    type: 'GET',
    url: 'https://api.github.com/users/RyanDur/repos',
    cache: false,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
        json.data.sort(compareDates).reverse();
        forEach(json.data, function(val) {
            $('.git').append("<li><a href="+ val.html_url +
            " target=_blank>"+ val.name +"</a></li>");
        })
    }
};

$(function() {
    var options = {top_spacing: 15, waypoint_offset: 150};
    stickySection($(".nav-container"), $("nav"), options);
    slidePanelsIn();
    $.ajax(gitRepos);
});

