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

var pages = [];
var page_num = 0;

var next = function() {
    forEach(pages[++page_num], appendGit);
};

var prev = function() {
    forEach(pages[--page_num], appendGit);
};

var pageCount = function() {
    var page_number = page_num + 1;
    $('.page-count').text((page_number) + "/" + pages.length);
};

var paginate = function(array, show_per_page) {
    var page = [], pages = [];
    forEach(array, function(elem) {
        page.push(elem);
        if (page.length === show_per_page ||
            page[page.length - 1] === array[array.length - 1]){
            pages.push(page);
            page = [];
        }
    });
    return pages;
};

var appendGit = function(val) {
    $('.git').append("<li><a href="+ val.html_url +
    " target=_blank>"+ val.name +"</a></li>");
}

var gitRepos = {
    type: 'GET',
    url: 'https://api.github.com/users/RyanDur/repos',
    cache: false,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
        var show_per_page = 4;
        json.data.sort(compareDates).reverse();
        pages = paginate(json.data, show_per_page);
        forEach(pages[0], appendGit);
        pageCount();
    }
};

$(function() {
    var options = {top_spacing: 15, waypoint_offset: 150};
    stickySection($(".nav-container"), $("nav.main"), options);
    slidePanelsIn();
    $.ajax(gitRepos);

    $('.repos').on('click', '.next', function(event) {
        event.preventDefault();
        if (page_num < pages.length - 1) {
            var git = $(this).closest('.repos').find('.git');
            git.hide('slide', {direction: 'left'}, function() {
                git.find('li').remove();
                next();
                pageCount();
            });
            git.fadeIn();
        }
    }).on('click', '.prev', function() {
        event.preventDefault();
        if (page_num > 0) {
            var git = $(this).closest('.repos').find('.git');
            git.hide('slide', {direction: 'right'}, function() {
                git.find('li').remove();
                prev();
                pageCount();
            });
            git.fadeIn();
        }
    });
});

