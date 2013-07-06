define([], function() {

    return {

        forEach: function(array, func) {
            for (var i = 0; i < array.length; i++) {
                func(array[i]);
            }
         },

         compareUpdatedAt: function(a,b) {
            return (a.updated_at > b.updated_at) ? 1 : ((a.updated_at < b.updated_at) ? -1 : 0);
         }
    }
});
