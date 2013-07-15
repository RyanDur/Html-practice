define(['utility'], function(util) {

    return function(appendElem) {
      var pages = [];
      var num = 0;
      
      return {
        first: function(ancestor, child) {
                 ancestor.find(child).remove();
                 num = 0;
                 util.forEach(pages[num], appendElem);
               },

        isFirst: function() {
                  return num === 0;
                 },

        last: function(ancestor, child) {
                ancestor.find(child).remove();
                num = pages.length - 1;
                util.forEach(pages[num], appendElem);
              },

        isLast: function() {
                  return num === pages.length - 1;
                },

        total: function() {
                 return pages.length;
               },

        number: function() {
                  return num + 1;
                },

        next: function(ancestor, child) {
                if (num < pages.length - 1) {
                  ancestor.find(child).remove();
                  util.forEach(pages[++num], appendElem);
                }
              },

        prev: function(ancestor, child) {
                if(num > 0) {
                  ancestor.find(child).remove();
                  util.forEach(pages[--num], appendElem);
                }
              },

        goTo: function(ancestor, child, pageNum) {
                  num = pageNum - 1;
                  ancestor.find(child).remove();
                  util.forEach(pages[num], appendElem);
              },

        paginate: function(array, showPerPage) {
                    var page = [];
                    util.forEach(array, function(elem) {
                      page.push(elem);
                      if (page.length === showPerPage ||
                      page[page.length - 1] === array[array.length - 1]){
                        pages.push(page);
                        page = [];
                      }
                    });
                  }
        }
    };
});
