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
            page.first($('.git'), $('li'));
            expect($('ul.git > li')).toHaveLength(4);
        });
    });

    describe('last', function() {
        it('should have a list of two element on the last page', function() {
            page.last($('.git'), $('li'));
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
            page.first($('.git'), $('li'));
            expect(page.number()).toEqual(1);

            page.last($('.git'), $('li'));
            expect(page.number()).toEqual(8);
        });
    });

    describe('next', function() {
        it('should move from the current page to the next', function() {
            page.first($('.git'), $('li'));
            expect(page.number()).toEqual(1);
            expect($('ul.git > li')).toHaveLength(4);

            page.next($('.git'), $('li'));
            expect(page.number()).toEqual(2);
            expect($('ul.git > li')).toHaveLength(4);
        });
    });

    describe('prev', function() {
        it('should move from the current page to the previous one', function() {
            page.last($('.git'), $('li'));
            expect(page.number()).toEqual(8);
            expect($('ul.git > li')).toHaveLength(2);

            page.prev($('.git'), $('li'));
            expect(page.number()).toEqual(7);
            expect($('ul.git > li')).toHaveLength(4);
        });
    });

    describe('afterFirst', function() {
        it('should return false if on the first page and true otherwise', function() {
            page.first($('.git'), $('li'));
            expect(page.afterFirst()).toEqual(false);

            page.next($('.git'), $('li'));
            expect(page.afterFirst()).toEqual(true);

            page.prev($('.git'), $('li'));
            expect(page.afterFirst()).toEqual(false);
        });
    });

    describe('beforeLast', function() {
        it('should return false  if on the last page and true otherwise', function() {
            page.last($('.git'), $('li'));
            expect(page.beforeLast()).toEqual(false);

            page.prev($('.git'), $('li'));
            expect(page.beforeLast()).toEqual(true);

            page.next($('.git'), $('li'));
            expect(page.beforeLast()).toEqual(false);
        });
    });

    describe('paginate', function() {
        it('should split up the array into segments according to the size specified', function() {
            var appendElem1 = function(val) {
                $('.git1').append("<li><a href="+ val.html_url +">"+ val.name +"</a></li>");
            };
            var elem1 = $('<ul class="git1"></ul>');
            setFixtures(elem1);
            var page1 = Pagination(appendElem1);
            page1.paginate(jsonData, 3);
            expect(page1.total()).toEqual(10);
            page1.first($('.git1'), $('li'));
            expect($('ul.git1 > li')).toHaveLength(3);
            page1.last($('.git1'), $('li'));
            expect($('ul.git1 > li')).toHaveLength(3);

            var appendElem2 = function(val) {
                $('.git2').append("<li><a href="+ val.html_url +">"+ val.name +"</a></li>");
            };
            var elem2 = $('<ul class="git2"></ul>');
            setFixtures(elem2);
            var page2 = Pagination(appendElem2);
            page2.paginate(jsonData, 5);
            expect(page2.total()).toEqual(6);
            page2.first($('.git2'), $('li'));
            expect($('ul.git2 > li')).toHaveLength(5);
            page2.last($('.git2'), $('li'));
            expect($('ul.git2 > li')).toHaveLength(5);

            var appendElem3 = function(val) {
                $('.git3').append("<li><a href="+ val.html_url +">"+ val.name +"</a></li>");
            };
            var elem3 = $('<ul class="git3"></ul>');
            setFixtures(elem3);
            var page3 = Pagination(appendElem3);
            page3.paginate(jsonData, 1);
            expect(page3.total()).toEqual(30);
            page3.first($('.git3'), $('li'));
            expect($('ul.git3 > li')).toHaveLength(1);
            page3.last($('.git3'), $('li'));
            expect($('ul.git3 > li')).toHaveLength(1);

            var appendElem4 = function(val) {
                $('.git4').append("<li><a href="+ val.html_url +">"+ val.name +"</a></li>");
            };
            var elem4 = $('<ul class="git4"></ul>');
            setFixtures(elem4);
            var page4 = Pagination(appendElem4);
            page4.paginate(jsonData, 30);
            expect(page4.total()).toEqual(1);
            page4.first($('.git4'), $('li'));
            expect($('ul.git4 > li')).toHaveLength(30);
            page4.last($('.git4'), $('li'));
            expect($('ul.git4 > li')).toHaveLength(30);
        })
    });
});
