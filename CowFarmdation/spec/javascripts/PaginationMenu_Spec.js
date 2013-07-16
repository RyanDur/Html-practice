define(['PaginationMenu', 'jasminejquery'], function(PaginationMenu) {
    var menu;

    beforeEach(function() {
        this.addMatchers({
            toBeCurrent: function() {
                             return this.actual.hasClass('current');
                         },

            toBeAvailable: function() {
                               return !this.actual.hasClass('unavailable');
                           }
        });

        setFixtures($('<nav class="repo"><ul></ul></nav>'));
        menu = PaginationMenu('nav.repo', 8);
    });

    describe('init', function() {
        it('should populate the menu', function() {
            expect($('ul > li')).toHaveLength(10);
        });
    });

    describe('current', function() {
        it('should make the given element current', function() {
            menu.current($('.page1'));
            expect($('.page1')).toBeCurrent();

            menu.current($('.page4'));
            expect($('.page4')).toBeCurrent();

            menu.current($('.page8'));
            expect($('.page8')).toBeCurrent();
        });

        it('should only have one current page', function() {
            menu.current($('.page2'));
            expect($('.page2')).toBeCurrent();
            expect($('ul > li.current')).toHaveLength(1);

            menu.current($('.page5'));
            expect($('.page5')).toBeCurrent();
            expect($('ul > li.current')).toHaveLength(1);

            menu.current($('.page7'));
            expect($('.page7')).toBeCurrent();
            expect($('ul > li.current')).toHaveLength(1);
        });
    });

    describe('unavailable', function() {
        it('should make the selections unavailable', function() {
            expect($('.prev')).toBeAvailable();
            expect($('.page1')).toBeAvailable();
            menu.unavailable([$('.prev'), $('.page1')]);
            expect($('.prev')).not.toBeAvailable();
            expect($('.page1')).not.toBeAvailable();
        });
    });

    describe('available', function() {
        it('should make the selections available', function() {
            menu.unavailable([$('.next'), $('.page8')]);
            expect($('.next')).not.toBeAvailable();
            expect($('.page8')).not.toBeAvailable();

            menu.available([$('.next'), $('.page8')]);
            expect($('.next')).toBeAvailable();
            expect($('.page8')).toBeAvailable();
        });
    });
});
