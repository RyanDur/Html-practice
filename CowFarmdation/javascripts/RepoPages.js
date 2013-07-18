define(['Pages', 'PaginationMenu', 'utility', 'jqueryui'], function(Pages, Menu, util) {
    var prevDirection = 'right', nextDirection = 'left';
    var ancestor = '.repos', parent = '.git', child = 'li';

    return function(data, showPerPage, repoElem) {
        var page = Pages(data, showPerPage);
        var menu = Menu('nav.repo', page.total());

        var changePage = function(button, direction, func, pageNum) {
            button.closest(ancestor).find(parent)
            .hide('slide', {direction: direction}, function () {
                $(parent).find(child).remove();

                if (pageNum === undefined) {
                    util.forEach(func(), repoElem);
                } else {
                    util.forEach(func(pageNum), repoElem);
                }

                menu.current($('.page' + page.number()));
            }).fadeIn();
        };

        util.forEach(page.first(), repoElem);
        menu.current($('.page' + page.number()));

        return {
            next: function(event) {
                      if (page.isLast()) {return;}
                      changePage($(this), nextDirection, page.next);
                  },

            previous: function(event) {
                          if (page.isFirst()) {return;}
                          changePage($(this), prevDirection, page.prev);
                      },

            goTo: function(event) {
                      var pageNum = $(this).data('pagenum');
                      if (pageNum === page.number()) {return;}

                      var direction = pageNum < page.number() ?
                          prevDirection :
                          nextDirection;

                      changePage($(this), direction, page.goTo, pageNum);
                  }
        };
    };
});
