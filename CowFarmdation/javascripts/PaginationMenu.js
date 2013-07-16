define(['utility'], function(util) {
  return function(elem, pageTotal) {

      $(elem).find('ul').append('<li class="prev arrow"><a>&laquo;</a></li>');
      for(var i = 1; i <= pageTotal; i++) {
          $(elem).find('ul').append('<li class="page page'+ i +'" data-pagenum="'+ i +'"><a>'+ i +'</a>');
      }
      $(elem).find('ul').append('<li class="next arrow"><a>&raquo;</a></li>');

      return {
      current: function(page) {
                   $(elem).find('li').removeClass('current');
                   page.addClass('current');
               },

      unavailable: function(buttons) {
                       util.forEach(buttons, function(button) {
                           if (!button.hasClass('unavailable')) {
                               button.addClass('unavailable');
                           }
                       });
                     },

      available: function(buttons) {
                     util.forEach(buttons, function(button) {
                         if (button.hasClass('unavailable')) {
                             button.removeClass('unavailable');
                         }
                     });
                   }
    };
  };
});
