define(function() {
    var prev = '.prev', next = '.next';

    return function(elem, pageTotal) {
        var make = function(elem, className) {
            if (!elem.hasClass(className)) {
                elem.addClass(className);
            }
        }

        $(elem).find('ul').append('<li class="prev arrow"><a>&laquo;</a></li>');
        for(var i = 1; i <= pageTotal; i++) {
            $(elem).find('ul').append('<li class="page page'+ i +'" data-pagenum="'+ i +'"><a>'+ i +'</a>');
        }
        $(elem).find('ul').append('<li class="next arrow"><a>&raquo;</a></li>');

        return {
            current: function(page) {
                         $(elem).find('li').removeClass('current');
                         $(elem).find('li').removeClass('unavailable');

                         make(page, 'current');
                         make(page, 'unavailable');

                         if(page.data('pagenum') === pageTotal) {
                             make($(next), 'unavailable');
                          }

                          if(page.data('pagenum') === 1) {
                             make($(prev), 'unavailable');
                          }
                     }
        };
    };
});
