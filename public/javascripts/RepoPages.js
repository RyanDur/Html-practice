define(['Pagination', 'jqueryui'], function(Pagination) {

  return function(repo) {
    var page = Pagination(repo);

    var pageCount = function(pageNumber, pageTotal) {
      $('.page-count').text(pageNumber + "/" + pageTotal);
    };

    return {

      init: function(data, showPerPage) {
              $('.first').attr('disabled', 'disabled');
              $('.prev').attr('disabled', 'disabled');
              page.paginate(data, showPerPage);
              page.first($('.git'), 'li');
              pageCount(page.number(), page.total());
            },

      first: function(event) {
              $('.first').attr('disabled', 'disabled');
              $('.prev').attr('disabled', 'disabled');
              
              $('.next').removeAttr('disabled');
              $('.last').removeAttr('disabled');

              $(this).closest('.repos').find('.git')
              .hide('slide', {direction: 'right'}, function () {
                page.first($('.git'), 'li');
                pageCount(page.number(), page.total());
              }).fadeIn();
             },

      last: function(event) {
              $('.last').attr('disabled', 'disabled');
              $('.next').attr('disabled', 'disabled');
              
              $('.prev').removeAttr('disabled');
              $('.first').removeAttr('disabled');
              
              $(this).closest('.repos').find('.git')
              .hide('slide', {direction: 'left'}, function() {
                page.last($('.git'), 'li');
                pageCount(page.number(), page.total());
              }).fadeIn();
            },

      next: function(event) {
              $('.next').attr('disabled', 'disabled');
              
              $('.first').removeAttr('disabled');
              $('.prev').removeAttr('disabled');

              $(this).closest('.repos').find('.git')
              .hide('slide', {direction: 'left'}, function() {
                
                page.next($(this), 'li');
                pageCount(page.number(), page.total());
                
                if (page.isLast()) {
                  $('.last').attr('disabled', 'disabled');
                } else {
                  $('.next').removeAttr('disabled');
                }
              }).fadeIn();
            },

      previous: function(event) {
                  $('.prev').attr('disabled', 'disabled');
                  
                  $('.next').removeAttr('disabled');
                  $('.last').removeAttr('disabled');

                  $(this).closest('.repos').find('.git')
                  .hide('slide', {direction: 'right'}, function () {
                    
                    page.prev($('.git'), 'li');
                    pageCount(page.number(), page.total());
                    
                    if (page.isFirst()) {
                      $('.first').attr('disabled', 'disabled');
                    } else {
                      $('.prev').removeAttr('disabled');
                    }
                  }).fadeIn();

                }
    };
  };
});
