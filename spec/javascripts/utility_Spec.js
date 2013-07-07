define(['utility'], function(util) {

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

  describe('compareDates', function() {
    it('should return 0 1 or -1', function() {
      expect(util.compareUpdatedAt({"updated_at": "2013-06-12T02:30:31Z"},{"updated_at": "2013-06-12T02:30:31Z"})).toEqual(0);
      expect(util.compareUpdatedAt({"updated_at": "2013-01-11T21:24:10Z"},{"updated_at": "2013-01-11T13:56:38Z"})).toEqual(1);
      expect(util.compareUpdatedAt({"updated_at": "2013-04-15T02:18:27Z"},{"updated_at": "2013-04-25T05:28:00Z"})).toEqual(-1);
    });
  });
});
