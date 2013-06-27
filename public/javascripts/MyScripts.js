var reveal = function(section) {
    section.delay(1000).animate({opacity: 1}, 1500);
};

var parseDate = function(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]); //     months are 0-based
}

var sortByDate = function(a, b) {
    //(a > b) ? 1 : ( (a > b) ? -1 : 0  );
    //return (a.updated_at > b.updated_at) ? 1 : ((a.updated_at > b.updated_at) ? -1 : 0); 
    return 2;
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
        json.data.sort(sortByDate);
        $.each(json.data, function(index, val) {
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

