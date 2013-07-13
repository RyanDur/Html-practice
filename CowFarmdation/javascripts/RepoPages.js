define(['Pagination', 'utility', 'jqueryui'], function(Pagination, util) {
  var first = '.first', prev = '.prev', last = '.last', next = '.next';
  var firstDirection = 'right', prevDirection = 'right';
  var nextDirection = 'left', lastDirection = 'left';
  var ancestor = '.repos', parent = '.git', child = 'li';

  return function(repoElem) {
    var page = Pagination(repoElem);

    var pageCount = function(pageNumber, pageTotal) {
      $('.page-count').text(pageNumber + "/" + pageTotal);
    };

    var disableMenu = function(buttons) {
      util.forEach(buttons, function(button) {
        if (button.attr('disabled') !== 'disabled') {
          button.attr('disabled', 'disabled');
        }
      });
    };

    var enableMenu = function(buttons) {
      util.forEach(buttons, function(button) {
        if (button.attr('disabled') === 'disabled') {
          button.removeAttr('disabled');
        }
      });
    };

    var changePage = function(button, direction, func) {
      button.closest(ancestor).find(parent)
      .hide('slide', {direction: direction}, function () {
        func();
        pageCount(page.number(), page.total());
      }).fadeIn();
    };

    return {

      init: function(data, showPerPage) {
              disableMenu([$(first), $(prev)]);
              page.paginate(data, showPerPage);
              page.first($(parent), child);
              pageCount(page.number(), page.total());
            },

      first: function(event) {
              disableMenu([$(first), $(prev)]);
              enableMenu([$(last), $(next)]);

              changePage($(this), firstDirection, function () {
                page.first($(parent), child);
              });
             },

      last: function(event) {
              disableMenu([$(last), $(next)]);
              enableMenu([$(first), $(prev)]);

              changePage($(this), lastDirection, function() {
                page.last($(parent), child);
              });
            },

      next: function(event) {
              disableMenu([$(next)]);
              enableMenu([$(first), $(prev)]);

              changePage($(this), nextDirection, function() {
                page.next($(parent), child);
                if (page.isLast()) {
                  disableMenu([$(last)]);
                } else {
                  enableMenu([$(next)]);
                }
              });
            },

      previous: function(event) {
                  disableMenu([$(prev)]);
                  enableMenu([$(last), $(next)]);

                  changePage($(this), prevDirection, function () {
                    page.prev($(parent), child);
                    if (page.isFirst()) {
                      disableMenu([$(first)]);
                    } else {
                      enableMenu([$(prev)]);
                    }
                  });
                }
    };
  };
});
