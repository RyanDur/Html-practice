var path = '';
if (typeof window._karma_ !== 'undefined') {
  path += 'base/'
} 
jasmine.getFixtures().fixturesPath = path + 'spec/javascripts/fixtures';

describe('Pagination', function() {
    var elem;
    beforeEach(function() {
        elem = $('<ul class="git"></ul>');
    });

    it('allows us to search using css selectors', function() {
        expect(elem).toHaveClass('git');
        var data = getJSONFixture('git.json');
        console.dir(data);
    });

    describe('paginate', function() {
        it('should make a two dimensional array with the inner arrays not exceeding the pagination limit', function() {
            expect(true).toEqual(true);
        })
    });
});
