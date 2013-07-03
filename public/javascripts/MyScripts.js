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

var gitRepo = function(val) {
    $('.git').append("<li><a href="+ val.html_url +
        " target=_blank>"+ val.name +"</a></li>");
}

var page = pagination(gitRepo);

var gitRepos = {
    type: 'GET',
    url: 'https://api.github.com/users/RyanDur/repos',
    cache: false,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
        var showPerPage = 4;
        json.data.sort(compareDates).reverse();
        page.paginate(json.data, showPerPage);
        page.first();
        page.count();
    }
};

var next = function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (page.beforeLast()) {
        var git = $(this).closest('.repos').find('.git');
        git.hide('slide', {direction: 'left'}, function() {
            $(this).find('li').remove();
            page.next();
            page.count();
            $(this).fadeIn();
        });
    }
};

var previous = function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (page.afterFirst()) {
        var git = $(this).closest('.repos').find('.git');
        git.hide('slide', {direction: 'right'}, function () {
            $(this).find('li').remove();
            page.prev();
            page.count();
            $(this).fadeIn();
        });
    }
};

$(function() {
    var options = {top_spacing: 15, waypoint_offset: 150};
    stickySection($(".nav-container"), $("nav.main"), options);
    slidePanelsIn();
    $.ajax(gitRepos);

    $('.repos').on('click', '.next', next)
    .on('click', '.prev', previous);
});

