define(['Pagination', 'jasminejquery'], function(Pagination) {

    describe('Pagination', function() {
        var elem, jsonData, page;

        var appendElem = function(val) {
            $('.git').append("<li><a href="+ val.html_url +">"+ val.name +"</a></li>");
        };

        beforeEach(function() {
            elem = $('<ul class="git"></ul>');
            setFixtures(elem);
            jsonData = getJSONFixture("git.json");
            page = Pagination(appendElem);
            page.paginate(jsonData, 4);
        });

        describe('first', function() {
            it('should have four list elements on its first page', function() {
                page.first($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(4);
            });
        });

        describe('last', function() {
            it('should have a list of two element on the last page', function() {
                page.last($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(2);
            });
        });

        describe('total', function() {
            it('should return the total number of pages', function() {
                expect(page.total()).toEqual(8);
            });
        });

        describe('number', function() {
            it('should return the current page number', function() {
                page.first($('.git'), 'li');
                expect(page.number()).toEqual(1);

                page.last($('.git'), 'li');
                expect(page.number()).toEqual(8);
            });
        });

        describe('next', function() {
            it('should move from the current page to the next', function() {
                page.first($('.git'), 'li');
                expect(page.number()).toEqual(1);
                expect($('ul.git > li')).toHaveLength(4);

                page.next($('.git'), 'li');
                expect(page.number()).toEqual(2);
                expect($('ul.git > li')).toHaveLength(4);
            });
        });

        describe('prev', function() {
            it('should move from the current page to the previous one', function() {
                page.last($('.git'), 'li');
                expect(page.number()).toEqual(8);
                expect($('ul.git > li')).toHaveLength(2);

                page.prev($('.git'), 'li');
                expect(page.number()).toEqual(7);
                expect($('ul.git > li')).toHaveLength(4);
            });
        });

        describe('afterFirst', function() {
            it('should return false if on the first page and true otherwise', function() {
                page.first($('.git'), 'li');
                expect(page.afterFirst()).toEqual(false);

                page.next($('.git'), 'li');
                expect(page.afterFirst()).toEqual(true);

                page.prev($('.git'), 'li');
                expect(page.afterFirst()).toEqual(false);
            });
        });

        describe('beforeLast', function() {
            it('should return false  if on the last page and true otherwise', function() {
                page.last($('.git'), 'li');
                expect(page.beforeLast()).toEqual(false);

                page.prev($('.git'), 'li');
                expect(page.beforeLast()).toEqual(true);

                page.next($('.git'), 'li');
                expect(page.beforeLast()).toEqual(false);
            });
        });

        describe('paginate', function() {
            it('should split up the array into segments that are the size specified', function() {
                page = Pagination(appendElem);
                page.paginate(jsonData, 3);
                expect(page.total()).toEqual(10);
                page.first($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(3);
                page.last($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(3);

                page = Pagination(appendElem);
                page.paginate(jsonData, 5);
                expect(page.total()).toEqual(6);
                page.first($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(5);
                page.last($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(5);

                page = Pagination(appendElem);
                page.paginate(jsonData, 1);
                expect(page.total()).toEqual(30);
                page.first($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(1);
                page.last($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(1);

                page = Pagination(appendElem);
                page.paginate(jsonData, 30);
                expect(page.total()).toEqual(1);
                page.first($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(30);
                page.last($('.git'), 'li');
                expect($('ul.git > li')).toHaveLength(30);
            })
        });
    });
});
