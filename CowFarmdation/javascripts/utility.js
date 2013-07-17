define(function() {
    return {
       forEach: function(array, func) {
           for (var i = 0; i < array.length; i++) {
               func(array[i]);
           }
        },

        segment: function(array, sliceSize) {
            var result = [], end = sliceSize;
            for(var start = 0; start < array.length; start += sliceSize) {
                result.push(array.slice(start, end));
                end += sliceSize;
            } 
            return result;
        },

        compareUpdatedAt: function(a,b) {
           return (a.updated_at > b.updated_at) ? 1 : ((a.updated_at < b.updated_at) ? -1 : 0);
        },
    }
});
