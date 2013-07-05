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
};

var pageCount = function(pageNumber, pageTotal) {
    $('.page-count').text(pageNumber + "/" + pageTotal);
};

var page;

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
        page.first($('.git'), 'li');
        pageCount(page.number(), page.total());
    }
};

var next = function(event) {
    if (activeNext){return;}
    activeNext = true;
    if (page.beforeLast()) {
        $(this).closest('.repos')
        .find('.git')
        .hide('slide', {direction: 'left'}, function() {
            page.next($(this), 'li');
            pageCount(page.number(), page.total());
            $(this).fadeIn();
            activeNext = false;
            activePrev = false;
        });
    }
};

var previous = function(event) {
    if (activePrev){return;}
    activePrev = true;
    if (page.afterFirst()) {
        $(this).closest('.repos')
        .find('.git')
        .hide('slide', {direction: 'right'}, function () {
            page.prev($('.git'), 'li');
            pageCount(page.number(), page.total());
            $(this).fadeIn();
            activePrev = false;
            activeNext = false;
        });
    }
};

var activeNext = false;
var activePrev = false;

$(function() {
    page = Pagination(gitRepo);
    var options = {top_spacing: 15, waypoint_offset: 150};
    stickySection($(".nav-container"), $("nav.main"), options);
    slidePanelsIn();
    $.ajax(gitRepos);

    $('.repos').on('click', '.next', next)
    .on('click', '.prev', previous);
});

