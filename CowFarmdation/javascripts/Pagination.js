define(['utility'], function(util) {
    return function(array, showPerPage) {
        var pages = util.segment(array, showPerPage);
        var num = 0;

        return {
            first: function() {
                       num = 0;
                       return pages[num];
                   },

            isFirst: function() {
                         return num === 0;
                     },

            last: function() {
                      num = pages.length - 1;
                      return pages[num];
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

            next: function() {
                      if (num < pages.length - 1) {
                          return pages[++num];
                      }
                  },

            prev: function() {
                      if(num > 0) {
                          return pages[--num];
                      }
                  },

            goTo: function(pageNum) {
                      num = pageNum - 1;
                      return pages[num];
                  }
        }
    };
});
