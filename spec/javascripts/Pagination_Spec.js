define(['Pagination', 'jasminejquery'], function(Pagination) {

    describe('Pagination', function() {
        var elem, jsonData, page, showPerPage = 4, numOfPages;

        var appendElem = function(val) {
            $('.git').append("<li><a href="+ val.html_url +">"+ val.name +"</a></li>");
        };

        var checkText = function(val) {
            $('ul.git > li').each(function(index) {
                var elem = $(this).find('a');
                expect(elem).toContainText(jsonData[index + val].name);
                expect(elem.attr('href')).toEqual(jsonData[index + val].html_url);
            });
        };

        var fromFirst = function(pageNum, func) {
            page.first($('.git'), 'li');
            for (var i = 0; i < pageNum; i++) {
                func(i);
            };
        };

        var fromLast = function(pageNum, func) {
            page.last($('.git'), 'li');
            for (var i = numOfPages - 1; i >= pageNum -1; i--) {
                func(i);
            }
        };

        beforeEach(function() {
            this.addMatchers({
                toHaveLengthLessThanOrEqualTo: function(expected) {
                    return (this.actual.length < expected || this.actual.length === expected);
                }
            });

            elem = $('<ul class="git"></ul>');
            setFixtures(elem);
            jsonData = getJSONFixture("git.json");
            page = Pagination(appendElem);
            page.paginate(jsonData, showPerPage);
            numOfPages = Math.ceil(jsonData.length/showPerPage);
        });

        describe('first', function() {
            it('should have four list elements on its first page', function() {
                page.first($('.git'), 'li');
                checkText(0);
                expect($('ul.git > li')).toHaveLength(showPerPage);
            });
        });

        describe('last', function() {
            it('should have a list of two element on the last page', function() {
                page.last($('.git'), 'li');
                checkText(showPerPage * (numOfPages - 1));
                expect($('ul.git > li')).toHaveLengthLessThanOrEqualTo(showPerPage);
            });
        });

        describe('total', function() {
            it('should return the total number of pages', function() {
                expect(page.total()).toEqual(numOfPages);
            });
        });

        describe('number', function() {
            it('should return the current page number', function() {
                page.first($('.git'), 'li');
                expect(page.number()).toEqual(1);

                page.last($('.git'), 'li');
                expect(page.number()).toEqual(numOfPages);
            });
        });

        describe('next', function() {
            it('should move from the current page to the next', function() {
                fromFirst(2, function(val) {
                    expect($('ul.git > li')).toHaveLength(showPerPage);
                    checkText(val * showPerPage);
                    page.next($('.git'), 'li');
                });
            });

            it('should not go past the last page', function() {
                page.last($('.git'), 'li');
                page.next($('.git'), 'li');
                expect(page.number()).toEqual(page.total());
            });
        });

        describe('prev', function() {
            it('should move from the current page to the previous one', function() {
                page.last($('.git'), 'li');
                expect(page.number()).toEqual(numOfPages);
                expect($('ul.git > li')).toHaveLengthLessThanOrEqualTo(showPerPage);

                page.prev($('.git'), 'li');
                expect(page.number()).toEqual(numOfPages - 1);
                expect($('ul.git > li')).toHaveLength(showPerPage);

                fromLast(numOfPages - 1, function(val) {
                    checkText(val * showPerPage);
                    page.prev($('.git'), 'li');
                });
            });

            it('should not go past the first page', function() {
                page.first($('.git'), 'li');
                page.prev($('.git'), 'li');
                expect(page.number()).toEqual(1);
            });
        });

        describe('isFirst', function() {
            it('should return false if on the first page and true otherwise', function() {
                page.first($('.git'), 'li');
                expect(page.isFirst()).toEqual(true);

                page.next($('.git'), 'li');
                expect(page.isFirst()).toEqual(false);

                page.prev($('.git'), 'li');
                expect(page.isFirst()).toEqual(true);
            });
        });

        describe('isLast', function() {
            it('should return false  if on the last page and true otherwise', function() {
                page.last($('.git'), 'li');
                expect(page.isLast()).toEqual(true);

                page.prev($('.git'), 'li');
                expect(page.isLast()).toEqual(false);

                page.next($('.git'), 'li');
                expect(page.isLast()).toEqual(true);
            });
        });

        describe('paginate', function() {
            var testAllButLast = function(numOfPages, showPerPage) {
                page.paginate(jsonData, showPerPage);
                expect(page.total()).toEqual(numOfPages);
                fromFirst(numOfPages - 1, function() {
                    expect($('ul.git > li')).toHaveLength(showPerPage);
                    page.next($('.git'), 'li');
                });
            };

            it('should split up the array into segments that are the size specified', function() {
                page = Pagination(appendElem);
                testAllButLast(10, 3);
                expect($('ul.git > li')).toHaveLength(3);

                page = Pagination(appendElem);
                testAllButLast(6, 5);
                expect($('ul.git > li')).toHaveLength(5);

                page = Pagination(appendElem);
                testAllButLast(30, 1);
                expect($('ul.git > li')).toHaveLength(1);

                page = Pagination(appendElem);
                testAllButLast(1, 30);
                expect($('ul.git > li')).toHaveLength(30);
            });

            it('should make the last segment less than the others if the number given does not divide evenly', function() {
                page = Pagination(appendElem);
                testAllButLast(numOfPages, showPerPage);
                expect($('ul.git > li')).toHaveLength(2);
            })
        });
    });
});
