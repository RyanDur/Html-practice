define(function() {
    return {
       forEach: function(array, func) {
           for (var i = 0; i < array.length; i++) {
               func(array[i]);
           }
        },

        map: function(func, array) {
           var result = [];
           forEach(array, function (element) {
               result.push(func(element));
           });
           return result;
        },

        segment: function(array, sizeOfSegment) {
            var result = [], end = sizeOfSegment
            for(var start = 0; start < array.length; start += sizeOfSegment) {
                result.push(array.slice(start, end));
                end += sizeOfSegment;
            } 
            return result;
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
