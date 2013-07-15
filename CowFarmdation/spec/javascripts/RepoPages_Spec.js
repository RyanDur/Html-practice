define(['RepoPages', 'jasminejquery'], function(RepoPages) {

  describe('RepoPages', function() {
    var repo, jsonData, showPerPage = 4, numOfPages;

    var gitRepo = function(val) {
      $('.git').append('<li><a href='+ val.html_url +
      ' target=_blank>'+ val.name +'</a></li>');
    };

    var moveToEnd = function() {
      for(var i = 0; i < numOfPages; i++) {
        $('.next').click();
      }
    }
    var onPage = function(pageNumber) {
      var page = showPerPage * ($('.page' + pageNumber).data('pagenum') - 1);
      $('ul.git > li').each(function(index) {
        var elem = $(this).find('a');
        expect(elem).toContainText(jsonData[index + page].name);
        expect(elem.attr('href')).toEqual(jsonData[index + page].html_url);
      });
    };

    beforeEach(function() {
      this.addMatchers({
        toHaveLengthLessThanOrEqualTo: function(expected) {
          return (this.actual.length < expected || this.actual.length === expected);
        },

        toBeCurrent: function() {
          return this.actual.hasClass('current');
        },

        toBeAvailable: function() {
          return !this.actual.hasClass('unavailable');
        }
      });

      repo = RepoPages(gitRepo);
      jsonData = getJSONFixture('git.json');
      loadFixtures('repos.html');
      numOfPages = Math.ceil(jsonData.length/showPerPage);
      jQuery.fx.off = true;

      $(function() {
        repo.init(jsonData, showPerPage);
        $('.repos').on('click', '.next', repo.next)
        .on('click', '.prev', repo.previous)
        .on('click', '.page', repo.goTo);
      });
    });

    describe('init', function() {
      it('should load the first of the specified number of repos into the page and display the page count', function() {
        onPage(1);
        expect($('ul.git > li')).toHaveLength(showPerPage);
      });

      it('should make the first button unavailable', function() {
        expect($('.page1')).not.toBeAvailable();
      });

      it('should make the prev button unavailable', function() {
        expect($('.prev')).not.toBeAvailable();
      });

      it('should give first the class current', function() {
        expect($('.page1')).toBeCurrent();
      });
    });

    describe('next', function() {
      it('should move from one set of repos to the next updating the page count', function() {
        onPage(1);
        $('.next').click();
        onPage(2);
      });

      it('should should make current the page number it moves to', function() {
        $('.next').click();
        expect($('.page1')).not.toHaveClass('current');
        expect($('.page2')).toHaveClass('current');
        $('.next').click();
        expect($('.page2')).not.toHaveClass('current');
        expect($('.page3')).toHaveClass('current');
      });

      it('should make prev available', function() {
        expect($('.prev')).toHaveClass('unavailable');
        $('.next').click();
        expect($('.prev')).not.toHaveClass('unavailable');
      });

      it('should disable next if action lands on last page', function() {
        moveToEnd();
        onPage(numOfPages);
        expect($('.next')).toHaveClass('unavailable');
      });

      it('should have no more items than the number specified', function() {
          $('.next').click();
          expect($('.git > li')).toHaveLengthLessThanOrEqualTo(showPerPage);
      });
    });

    describe('previous', function() {
      beforeEach(function() {
        moveToEnd();
      });

      it('should move from one set of repos to the previous updating the page count', function() {
        onPage(numOfPages);
        $('.prev').click()
        onPage(numOfPages - 1);
      });

      it('should make next available', function() {
        expect($('.next')).not.toBeAvailable();
        $('.prev').click();
        expect($('.next')).toBeAvailable();
      });

      it('should make prev unavailable if action lands on first page', function() {
        expect($('.prev')).not.toHaveClass('unavailable');
        for(var i = 0; i < numOfPages; i++) {
          $('.prev').click();
        }
        onPage(1);
        expect($('.prev')).not.toBeAvailable();
      });

      it('should have no more items than the number specified', function() {
        for(var i = 0; i < numOfPages; i++) {
          $('.prev').click();
          expect($('.git > li')).toHaveLengthLessThanOrEqualTo(showPerPage);
        }
      });
    });

    describe('goTo', function() {
      it('should go to the given page', function() {
        $('.page3').click();
        onPage(3);

        $('.page5').click();
        onPage(5);

        $('.page1').click();
        onPage(1);
      });

      it('should make the page number unavailable', function() {
        expect($('.page7')).toBeAvailable();
        $('.page7').click();
        onPage(7);
        expect($('.page7')).not.toBeAvailable();
      });

      it('should make the last page it was on available', function() {
        expect($('.page1')).not.toBeAvailable();
        $('.page6').click();
        onPage(6);
        expect($('.page1')).toBeAvailable();
      });

      it('should make the make the next button unavailable if the final page is chosen', function() {
        expect($('.page8')).toBeAvailable();
        expect($('.next')).toBeAvailable();
        $('.page8').click();
        expect($('.page8')).not.toBeAvailable();
        expect($('.next')).not.toBeAvailable();
      });

      it('should make available next and prev if not on first or last page', function() {
        $('.page4').click();
        onPage(4);

        expect($('.next')).toBeAvailable();
        expect($('.prev')).toBeAvailable();
      });

      it('should make the make the prev button unavailable if the first page is chosen', function() {
        $('.page8').click();
        onPage(8);

        expect($('.page1')).toBeAvailable();
        expect($('.prev')).toBeAvailable();

        $('.page1').click();
        expect($('.page1')).not.toBeAvailable();
        expect($('.prev')).not.toBeAvailable();
      });
    });
  });
});
