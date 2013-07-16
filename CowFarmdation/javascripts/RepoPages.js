define(['Pagination', 'PaginationMenu', 'jqueryui'], function(Pagination, Menu) {
    var prevDirection = 'right', nextDirection = 'left';
    var ancestor = '.repos', parent = '.git', child = 'li';

    return function(data, showPerPage, repoElem) {
        var page = Pagination(data, showPerPage, repoElem);
        var menu = Menu('nav.repo', page.total());

        var changePage = function(button, direction, func) {
            button.closest(ancestor).find(parent)
            .hide('slide', {direction: direction}, function () {

                menu.available($('.page' + page.number()));

                func();

                menu.unavailable($('.page' + page.number()));
                menu.current($('.page' + page.number()));
            }).fadeIn();
        };

        page.first($(parent), child);
        menu.unavailable($('.page' + page.number()));
        menu.current($('.page' + page.number()));

        return {
            next: function(event) {
                      if (page.isLast()) {return;}

                      changePage($(this), nextDirection, function() {
                          page.next($(parent), child);
                      });
                  },

            previous: function(event) {
                          if (page.isFirst()) {return;}

                          changePage($(this), prevDirection, function () {
                              page.prev($(parent), child);
                          });
                      },

            goTo: function(event) {
                      var pageNum = $(this).data('pagenum');
                      if (pageNum === page.number()) {return;}

                      var direction = pageNum < page.number() ?
                          prevDirection :
                          nextDirection;

                      changePage($(this), direction, function() {
                          page.goTo($(parent), child, pageNum);
                      });
                  }
        };
    };
});
