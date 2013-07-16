define(['Pagination', 'PaginationMenu', 'utility', 'jqueryui'], function(Pagination, Menu, util) {
  var prev = '.prev', next = '.next';
  var prevDirection = 'right', nextDirection = 'left';
  var ancestor = '.repos', parent = '.git', child = 'li';

  return function(data, showPerPage, repoElem) {
    var page = Pagination(data, showPerPage, repoElem);
    var menu = Menu('nav.repo', page.total());

    page.first($(parent), child);
    menu.unavailable([$(prev), $('.page' + page.number())]);
    menu.current($('.page' + page.number()));

    var checkNextPrev = function() {
      if(page.isLast()) {
        menu.unavailable([$(next)]);
      } else {
        menu.available([$(next)]);
      }

      if(page.isFirst()) {
        menu.unavailable([$(prev)]);
      } else {
        menu.available([$(prev)]);
      }
    };

    var changePage = function(button, direction, func) {
      button.closest(ancestor).find(parent)
      .hide('slide', {direction: direction}, function () {
        menu.available([$('.page' + page.number())]);

        func();

        checkNextPrev();
        menu.unavailable([$('.page' + page.number())]);
        menu.current($('.page' + page.number()));
      }).fadeIn();
    };

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
