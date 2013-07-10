define(['Pagination', 'utility', 'jqueryui'], function(Pagination, util) {

  return function(repo) {
    var page = Pagination(repo);

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

    return {

      init: function(data, showPerPage) {
              disableMenu([$('.first'), $('.prev')]);
              page.paginate(data, showPerPage);
              page.first($('.git'), 'li');
              pageCount(page.number(), page.total());
            },

      first: function(event) {
              disableMenu([$('.first'), $('.prev')]);
              enableMenu([$('.last'), $('.next')]);

              $(this).closest('.repos').find('.git')
              .hide('slide', {direction: 'right'}, function () {
                page.first($('.git'), 'li');
                pageCount(page.number(), page.total());
              }).fadeIn();
             },

      last: function(event) {
              disableMenu([$('.last'), $('.next')]);
              enableMenu([$('.first'), $('.prev')]);
              
              $(this).closest('.repos').find('.git')
              .hide('slide', {direction: 'left'}, function() {
                page.last($('.git'), 'li');
                pageCount(page.number(), page.total());
              }).fadeIn();
            },

      next: function(event) {
              disableMenu([$('.next')]);
              enableMenu([$('.first'), $('.prev')]);

              $(this).closest('.repos').find('.git')
              .hide('slide', {direction: 'left'}, function() {
                
                page.next($(this), 'li');
                pageCount(page.number(), page.total());
                
                if (page.isLast()) {
                  disableMenu([$('.last')]);
                } else {
                  enableMenu([$('.next')]);
                }
              }).fadeIn();
            },

      previous: function(event) {
                  disableMenu([$('.prev')]);
                  enableMenu([$('.last'), $('.next')]);

                  $(this).closest('.repos').find('.git')
                  .hide('slide', {direction: 'right'}, function () {
                    
                    page.prev($('.git'), 'li');
                    pageCount(page.number(), page.total());
                    
                    if (page.isFirst()) {
                      disableMenu([$('.first')]);
                    } else {
                      enableMenu([$('.prev')]);
                    }
                  }).fadeIn();
                }
    };
  };
});
