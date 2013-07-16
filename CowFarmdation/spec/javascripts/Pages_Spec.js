define(['Pages'], function(Pages) {
    var jsonData;

    beforeEach( function() {
        jsonData = getJSONFixture("git.json");
    });

    describe('init', function() {
        it('should return an array split up into the number of segments specified', function() {
        var pages = Pages(jsonData, 10);
        expect(pages.length).toEqual(3);

        pages = Pages(jsonData, 3);
        expect(pages.length).toEqual(10);

        pages = Pages(jsonData, 15);
        expect(pages.length).toEqual(2);

        pages = Pages(jsonData, 2);
        expect(pages.length).toEqual(15);

        pages = Pages(jsonData, 6);
        expect(pages.length).toEqual(5);

        pages = Pages(jsonData, 5);
        expect(pages.length).toEqual(6);
       });
    });
});
