var pagination = function(appendElem) {
        var pages = [];
        var num = 0;

    return {
        first: function() {
            forEach(pages[0], appendElem);
        },

        afterFirst: function() {
            return (num > 0);
        },

        last: function() {
            forEach(pages[pages.length - 1], appendElem);
        },

        beforeLast: function() {
            return num < pages.length - 1;
        },

        next: function() {
            forEach(pages[++num], appendElem);
        },

        prev: function() {
            forEach(pages[--num], appendElem);
        },

        count: function() {
            var pageNumber = num + 1;
            $('.page-count').text(pageNumber + "/" + pages.length);
        },

        paginate: function(array, showPerPage) {
            var page = [];
            forEach(array, function(elem) {
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
