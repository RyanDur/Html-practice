define(['utility', 'jasminejquery'], function(util) {

  describe('utility', function() {

    describe('forEach', function() {
      it('should perform a function on an array', function() {
        var oldArray = [1,2,3,4,5,6];
        var newArray = [];

        util.forEach(oldArray, function(val) {
          newArray.push(val);
        });

        expect(newArray).toEqual(oldArray);
      });
    })

    describe('compareUpdatedAt', function() {
      it('should return 0 1 or -1', function() {
        expect(util.compareUpdatedAt({"updated_at": "2013-06-12T02:30:31Z"},{"updated_at": "2013-06-12T02:30:31Z"})).toEqual(0);
        expect(util.compareUpdatedAt({"updated_at": "2013-01-11T21:24:10Z"},{"updated_at": "2013-01-11T13:56:38Z"})).toEqual(1);
        expect(util.compareUpdatedAt({"updated_at": "2013-04-15T02:18:27Z"},{"updated_at": "2013-04-25T05:28:00Z"})).toEqual(-1);
      });
    });

    describe('segment', function() {
        var jsonData = getJSONFixture('git.json');

        it('should return an array of segments the size of the number specified', function() {
            expect(util.segment(jsonData, 10).length).toEqual(3);
            util.forEach(util.segment(jsonData, 10), function(segment) {
                expect(segment.length).toEqual(10);
            });

            expect(util.segment(jsonData, 3).length).toEqual(10);
            util.forEach(util.segment(jsonData, 3), function(segment) {
                expect(segment.length).toEqual(3);
            });

            expect(util.segment(jsonData, 5).length).toEqual(6);
            util.forEach(util.segment(jsonData, 5), function(segment) {
                expect(segment.length).toEqual(5);
            });
        });

        it('should put the remainder in the last segment if it does not divide evenly', function() {
            var lastOf = function(array) {return array[array.length-1]}

            var segments = util.segment(jsonData, 4);
            expect(segments.length).toEqual(8);
            util.forEach(segments, function(segment) {
                if(lastOf(segments) === segment) {
                    expect(segment.length).toEqual(2);
                } else {
                    expect(segment.length).toEqual(4);
                }
            });

            segments = util.segment(jsonData, 7);
            expect(segments.length).toEqual(5);
            util.forEach(segments, function(segment) {
                if(lastOf(segments) === segment) {
                    expect(segment.length).toEqual(2);
                } else {
                    expect(segment.length).toEqual(7);
                }
            });

            segments = util.segment(jsonData, 9);
            expect(segments.length).toEqual(4);
            util.forEach(segments, function(segment) {
                if(lastOf(segments) === segment) {
                    expect(segment.length).toEqual(3);
                } else {
                    expect(segment.length).toEqual(9);
                }
            });
        });
    });
  })
});
