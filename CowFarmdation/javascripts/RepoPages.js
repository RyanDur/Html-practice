define(['Pages', 'PagesMenu', 'utility', 'jqueryui'], function(Pages, Menu, util) {
    var prevDirection = 'right', nextDirection = 'left';
    var ancestor = '.repos', displayArea = '.git', child = 'li';

    return function(data, showPerPage, repoElem) {
        var pages = Pages(data, showPerPage);
        var menu = Menu('nav.repo', pages.total());

        var page = function() {return $('.page' + pages.number())}

        var change = function(button, direction, func, pageNum) {
            button.closest(ancestor).find(displayArea)
            .hide('slide', {direction: direction}, function () {
                $(this).find(child).remove();

                if (pageNum === undefined) {
                    util.forEach(func(), repoElem);
                } else {
                    util.forEach(func(pageNum), repoElem);
                }

                menu.current(page());
            }).fadeIn();
        };

        util.forEach(pages.first(), repoElem);
        menu.current(page());

        return {
            next: function(event) {
                      if (pages.isLast()) {return;}
                      change($(this), nextDirection, pages.next);
                  },

            previous: function(event) {
                          if (pages.isFirst()) {return;}
                          change($(this), prevDirection, pages.prev);
                      },

            goTo: function(event) {
                      var pageNum = $(this).data('pagenum');
                      if (pageNum === pages.number()) {return;}

                      var direction = pageNum < pages.number() ?
                          prevDirection :
                          nextDirection;

                      change($(this), direction, pages.goTo, pageNum);
                  }
        };
    };
});
