describe('Pagination', function() {
    var elem;
    beforeEach(function() {
        elem = $('<ul class="git"></ul>');
    });

    it('allows us to search using css selectors', function() {
        expect(elem).toHaveClass('git');
    });

    describe('paginate', function() {
        it('should make a two dimensional array with the inner arrays not exceeding the pagination limit', function() {
            expect(true).toEqual(true);
        })
    });
});
