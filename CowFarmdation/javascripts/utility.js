define(function() {

    return {

       forEach: function(array, func) {
           for (var i = 0; i < array.length; i++) {
               func(array[i]);
           }
        },

         compareUpdatedAt: function(a,b) {
           return (a.updated_at > b.updated_at) ? 1 : ((a.updated_at < b.updated_at) ? -1 : 0);
        },

        addSpinner: function(elem) {
            elem.addClass('spinner');
            elem.append('<div class="ball"></div');
            elem.append('<div class="ball1"></div');
        },

        removeSpinner: function(elem) {
            elem.removeClass('spinner');
            elem.empty();
        }
    }
});
