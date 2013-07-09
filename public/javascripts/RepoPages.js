define(['Pagination', 'jqueryui'], function(Pagination) {

  return function(repo) {
    var activeNext = false, activePrev = false, page = Pagination(repo);

    var pageCount = function(pageNumber, pageTotal) {
      $('.page-count').text(pageNumber + "/" + pageTotal);
    };

    return {

      init: function(data, showPerPage) {
              $('.prev').css('visibility', 'hidden');
              $('.first').css('visibility', 'hidden');
              page.paginate(data, showPerPage);
              page.first($('.git'), 'li');
              pageCount(page.number(), page.total());
            },

      first: function(event) {
              $('.first').attr('disabled', 'disabled');
              $('.first').css('visibility', 'hidden');
              $('.prev').css('visibility', 'hidden');
              $('.last').css('visibility', 'visible');
              $('.next').css('visibility', 'visible');

              if (page.afterFirst()) {
                $(this).closest('.repos').find('.git')
                .hide('slide', {direction: 'right'}, function () {
                  page.first($('.git'), 'li');
                  pageCount(page.number(), page.total());
                  $('.first').removeAttr('disabled');
                }).fadeIn();
              } 
             },

      last: function(event) {
              $('.last').attr('disabled', 'disabled');
              $('.last').css('visibility', 'hidden');
              $('.next').css('visibility', 'hidden');
              $('.first').css('visibility', 'visible');
              $('.prev').css('visibility', 'visible');
              
              if (page.beforeLast()) {
                $(this).closest('.repos').find('.git')
                .hide('slide', {direction: 'left'}, function() {
                  page.last($('.git'), 'li');
                  pageCount(page.number(), page.total());
                  $('.last').removeAttr('disabled');
                  $('.prev').removeAttr('disabled');
                }).fadeIn();
              }
            },

      next: function(event) {
              $('.next').attr('disabled', 'disabled');
              $('.first').css('visibility', 'visible');
              if (page.number() === page.total()-1) {
                $('.next').css('visibility', 'hidden');
                $('.last').css('visibility', 'hidden');
              }

              if (page.beforeLast()) {
                $('.prev').css('visibility', 'visible');
                $(this).closest('.repos').find('.git')
                .hide('slide', {direction: 'left'}, function() {
                  page.next($(this), 'li');
                  pageCount(page.number(), page.total());
                  $('.next').removeAttr('disabled');
                  $('.first').removeAttr('disabled');
                }).fadeIn();
              }
            },

      previous: function(event) {
                  $('.prev').attr('disabled', 'disabled');
                  $('.last').css('visibility', 'visible');
                  if (page.number() === (page.total() - (page.total() - 2))) {
                    $('.prev').css('visibility', 'hidden');
                    $('.first').css('visibility', 'hidden');
                  }

                  if (page.afterFirst()) {
                    $('.next').css('visibility', 'visible');
                    $(this).closest('.repos').find('.git')
                    .hide('slide', {direction: 'right'}, function () {
                      page.prev($('.git'), 'li');
                      pageCount(page.number(), page.total());
                      $('.prev').removeAttr('disabled');
                      $('.last').removeAttr('disabled');
                    }).fadeIn();
                  }
                }
    };
  };
});
