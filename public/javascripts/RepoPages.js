define(['Pagination', 'jqueryui'], function(Pagination) {

  return function(repo) {
    var activeNext = false, activePrev = false, page = Pagination(repo);

    var pageCount = function(pageNumber, pageTotal) {
      $('.page-count').text(pageNumber + "/" + pageTotal);
    };

    return {

      init: function(data, showPerPage) {
              page.paginate(data, showPerPage);
              page.first($('.git'), 'li');
              pageCount(page.number(), page.total());
            },

      next: function(event) {
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
            },

      previous: function(event) {
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
                }
    };
  };
});
