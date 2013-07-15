define(['Pagination', 'utility', 'jqueryui'], function(Pagination, util) {
  var prev = '.prev', next = '.next';
  var prevDirection = 'right', nextDirection = 'left';
  var ancestor = '.repos', parent = '.git', child = 'li';

  return function(repoElem) {
    var page = Pagination(repoElem);

    var pageCount = function(pageNumber, pageTotal) {
      $('.page-count').text(pageNumber + "/" + pageTotal);
    };

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

    var makeCurrent = function() {
      var currentPage = '.page' + page.number();
      $(ancestor).find('li').removeClass('current');
      $(currentPage).addClass('current');
      disableMenu([$(currentPage)]);
    };

    var changePage = function(button, direction, func) {
      button.closest(ancestor).find(parent)
      .hide('slide', {direction: direction}, function () {
        enableMenu([$('.page' + page.number())]);
        func();
        pageCount(page.number(), page.total());
        makeCurrent();
      }).fadeIn();
    };

    var makePageNav = function() {
      $('nav.repo').find('ul').append('<li class="prev arrow"><a>&laquo;</a></li>');
      for(var i = 1; i <= page.total(); i++) {
        $('nav.repo').find('ul').append('<li class="page page'+ i +'" data-pagenum="'+ i +'"><a>'+ i +'</a>');
      }
      $('nav.repo').find('ul').append('<li class="next arrow"><a>&raquo;</a></li>');
    };

    return {

      init: function(data, showPerPage) {
              page.paginate(data, showPerPage);
              makePageNav();
              disableMenu([$(prev)]);
              makeCurrent();
              page.first($(parent), child);
              pageCount(page.number(), page.total());
            },

      next: function(event) {
              if (page.isLast()) {return;}

              disableMenu([$(next)]);
              enableMenu([$(prev)]);

              changePage($(this), nextDirection, function() {
                page.next($(parent), child);
                if (!page.isLast()) {
                  enableMenu([$(next)]);
                }
              });
            },

      previous: function(event) {
                  if (page.isFirst()) {return;}

                  disableMenu([$(prev)]);
                  enableMenu([$(next)]);

                  changePage($(this), prevDirection, function () {
                    page.prev($(parent), child);
                    if (!page.isFirst()) {
                      enableMenu([$(prev)]);
                    }
                  });
                },

      goTo: function(event) {
              var pageNum = $(this).data('pagenum');
              if (pageNum === page.number()) {return;}

              if (pageNum < page.number()) {
                changePage($(this), prevDirection, function() {
                  page.goTo($(parent), child, pageNum);
                });
              } else {
                changePage($(this), nextDirection, function() {
                  page.goTo($(parent), child, pageNum);
                });
              }
            }
    };
  };
});
