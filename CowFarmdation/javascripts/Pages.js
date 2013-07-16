define(['utility'], function(util) {
    return function(array, showPerPage) {
        var page = [];
        var pages = [];
        util.forEach(array, function(elem) {
            page.push(elem);
            if (page.length === showPerPage ||
            page[page.length - 1] === array[array.length - 1]){
                pages.push(page);
                page = [];
            }
        });
        return pages;
    }
});
