define(['Pagination', 'utility', 'jasminejquery'], function(Pagination, util) {

    describe('Pagination', function() {
        var jsonData, page, showPerPage, numOfPages, segments;

        var checkText = function(val) {
            //$('ul.git > li').each(function(index) {
            //    var elem = $(this).find('a');
            //    expect(elem).toContainText(jsonData[index + val].name);
            //    expect(elem.attr('href')).toEqual(jsonData[index + val].html_url);
            //});
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
                    return this.actual.length <= expected;
                }
            });

            showPerPage = 4;
            jsonData = getJSONFixture('git.json');
            page = Pagination(jsonData, showPerPage);
            segments = util.segment(jsonData, showPerPage);
            numOfPages = Math.ceil(jsonData.length/showPerPage);
        });

        describe('first', function() {
            it('should return the first page', function() {
                expect(page.first()).toEqual(segments[0]);
                expect(page.first()).not.toEqual(segments[segments.length-1]);
            });

            it('should have the specified number of entries', function() {
                expect(page.first().length).toEqual(showPerPage);
            });
        });

        describe('last', function() {
            it('should return the last page', function() {
                expect(page.last()).toEqual(segments[segments.length-1]);
                expect(page.last()).not.toEqual(segments[0]);
            });

            it('should have less than or equal to the specified number of entries', function() {
                expect(page.last()).toHaveLengthLessThanOrEqualTo(showPerPage);
            });
        });

        describe('total', function() {
            it('should return the total number of pages', function() {
                expect(page.total()).toEqual(numOfPages);
            });
        });

        describe('number', function() {
            it('should return the current page number', function() {
                page.first();
                expect(page.number()).toEqual(1);

                page.last();
                expect(page.number()).toEqual(numOfPages);
            });
        });

        describe('next', function() {
            it('should move from the current page to the next', function() {
                segments.shift();

                util.forEach(segments, function(segment) {
                    expect(page.next()).toEqual(segment);
                });
            });

            it('should not go past the last page', function() {
                page.last();
                page.next();
                expect(page.number()).toEqual(page.total());
            });
        });

        describe('prev', function() {
            it('should move from the current page to the previous one', function() {
                page.last();
                expect(page.number()).toEqual(numOfPages);

                segments.pop();
                for (var i = 1; i <= segments.length; i++) {
                    expect(page.prev()).toEqual(segments[segments.length-i]);
                };
            });

            it('should not go past the first page', function() {
                page.first();
                page.prev();
                expect(page.number()).toEqual(1);
            });
        });

        describe('isFirst', function() {
            it('should return false if on the first page and true otherwise', function() {
                page.first();
                expect(page.isFirst()).toEqual(true);

                page.next();
                expect(page.isFirst()).toEqual(false);

                page.prev();
                expect(page.isFirst()).toEqual(true);
            });
        });

        describe('isLast', function() {
            it('should return false  if on the last page and true otherwise', function() {
                page.last();
                expect(page.isLast()).toEqual(true);

                page.prev();
                expect(page.isLast()).toEqual(false);

                page.next();
                expect(page.isLast()).toEqual(true);
            });
        });

        describe('goTo', function() {
          it('should goto the page passed in', function() {
            expect(page.goTo(3)).toEqual(segments[2]);
            expect(page.number()).toEqual(3);
 
            expect(page.goTo(5)).toEqual(segments[4]);
            expect(page.number()).toEqual(5);
          })
        });
    });
});
