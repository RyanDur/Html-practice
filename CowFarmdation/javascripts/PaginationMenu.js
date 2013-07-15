define(function() {
  return function() {
    return {
      init: function(elem, pageTotal) {
              elem.find('ul').append('<li class="prev arrow"><a>&laquo;</a></li>');
              for(var i = 1; i <= pageTotal; i++) {
                elem.find('ul').append('<li class="page page'+ i +'" data-pagenum="'+ i +'"><a>'+ i +'</a>');
              }
              elem.find('ul').append('<li class="next arrow"><a>&raquo;</a></li>');
            }
    };
  };
});
