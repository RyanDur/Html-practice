define(['utility'], function(util) {
  var prev = '.prev', next = '.next';

    return function(elem, pageTotal) {

        $(elem).find('ul').append('<li class="prev arrow"><a>&laquo;</a></li>');
        for(var i = 1; i <= pageTotal; i++) {
            $(elem).find('ul').append('<li class="page page'+ i +'" data-pagenum="'+ i +'"><a>'+ i +'</a>');
        }
        $(elem).find('ul').append('<li class="next arrow"><a>&raquo;</a></li>');

        var makeUnavailable = function(elem) {
            if (!elem.hasClass('unavailable')) {
                elem.addClass('unavailable');
            }
        }

        var makeAvailable = function(elem) {
            if (elem.hasClass('unavailable')) {
                elem.removeClass('unavailable');
            }
        }

        return {
            current: function(page) {
                         $(elem).find('li').removeClass('current');
                         page.addClass('current');
                     },

            unavailable: function(buttons) {
                             util.forEach(buttons, function(button) {
                                 makeUnavailable(button);

                                 if(button.data('pagenum') === pageTotal) {
                                     makeUnavailable($(next));
                                 }

                                 if(button.data('pagenum') === 1) {
                                     makeUnavailable($(prev));
                                 }
                             });
                         },

            available: function(buttons) {
                           util.forEach(buttons, function(button) {
                               if (button.hasClass('unavailable')) {
                                   makeAvailable(button);

                                 if(button.data('pagenum') === pageTotal) {
                                     makeAvailable($(next));
                                 }

                                 if(button.data('pagenum') === 1) {
                                     makeAvailable($(prev));
                                 }
                               }
                           });
                       }
        };
    };
});
