define(['Pagination', 'PaginationMenu', 'utility', 'jqueryui'], function(Pagination, Menu, util) {
  var prev = '.prev', next = '.next';
  var prevDirection = 'right', nextDirection = 'left';
  var ancestor = '.repos', parent = '.git', child = 'li';

  return function(repoElem) {
    var page = Pagination(repoElem);
    var menu = Menu();

    var disableMenu = function(buttons) {
      util.forEach(buttons, function(button) {
        if (!button.hasClass('unavailable')) {
          button.addClass('unavailable');
        }
      });
    };

    var enableMenu = function(buttons) {
      util.forEach(buttons, function(button) {
        if (button.hasClass('unavailable')) {
          button.removeClass('unavailable');
        }
      });
    };

    var checkNextPrev = function() {
      if(page.isLast()) {
        disableMenu([$(next)]);
      } else {
        enableMenu([$(next)]);
      }

      if(page.isFirst()) {
        disableMenu([$(prev)]);
      } else {
        enableMenu([$(prev)]);
      }
    };

    var makeCurrent = function(page) {
      $(ancestor).find('li').removeClass('current');
      page.addClass('current');
    };

    var changePage = function(button, direction, func) {
      button.closest(ancestor).find(parent)
      .hide('slide', {direction: direction}, function () {
        enableMenu([$('.page' + page.number())]);

        func();

        checkNextPrev();
        disableMenu([$('.page' + page.number())]);
        makeCurrent($('.page' + page.number()));
      }).fadeIn();
    };

    return {

      init: function(data, showPerPage) {
              page.paginate(data, showPerPage);
              menu.init($('nav.repo'), page.total());
              disableMenu([$(prev), $('.page' + page.number())]);
              makeCurrent($('.page' + page.number()));
              page.first($(parent), child);
            },

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
