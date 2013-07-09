define(['Pagination', 'jqueryui'], function(Pagination) {

  return function(repo) {
    var activeNext = false, activePrev = false, page = Pagination(repo);

    var pageCount = function(pageNumber, pageTotal) {
      $('.page-count').text(pageNumber + "/" + pageTotal);
    };
    
    $('.prev').css('visibility', 'hidden');

    return {

      init: function(data, showPerPage) {
              page.paginate(data, showPerPage);
              page.first($('.git'), 'li');
              pageCount(page.number(), page.total());
            },

      next: function(event) {
              $('.next').attr('disabled', 'disabled');
              if (page.number() === page.total()-1) {
                $('.next').css('visibility', 'hidden');
              }

              if (page.beforeLast()) {
                $('.prev').css('visibility', 'visible');
                $(this).closest('.repos').find('.git')
                .hide('slide', {direction: 'left'}, function() {
                  page.next($(this), 'li');
                  pageCount(page.number(), page.total());
                  $('.next').removeAttr('disabled');
                }).fadeIn();
              } 
            },

      previous: function(event) {
                  $('.prev').attr('disabled', 'disabled');
                  if (page.number() === (page.total() - (page.total() - 2))) {
                    $('.prev').css('visibility', 'hidden');
                  }

                  if (page.afterFirst()) {
                    $('.next').css('visibility', 'visible');
                    $(this).closest('.repos').find('.git')
                    .hide('slide', {direction: 'right'}, function () {
                      page.prev($('.git'), 'li');
                      pageCount(page.number(), page.total());
                      $('.prev').removeAttr('disabled');
                    }).fadeIn();
                  }
                }
    };
  };
});
