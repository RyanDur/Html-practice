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

    beforeEach(function() {
      this.addMatchers({
        toHaveLengthLessThanOrEqualTo: function(expected) {
          return (this.actual.length < expected || this.actual.length === expected);
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
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        expect($('ul.git > li')).toHaveLength(showPerPage);
      });

      it('should make the first button unavailable', function() {
        expect($('.page1')).toHaveClass('unavailable');
      });

      it('should make the prev button unavailable', function() {
        expect($('.prev')).toHaveClass('unavailable');
      });

      it('should give first the class current', function() {
        expect($('.page1')).toHaveClass('current');
      });
    });

    describe('next', function() {
      it('should move from one set of repos to the next updating the page count', function() {
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        $('.next').click();
        expect($('.page-count')).toContainText(2 + "/" + numOfPages);
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
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
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
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
        $('.prev').click()
        expect($('.page-count')).toContainText(numOfPages - 1 + "/" + numOfPages);
      });

      it('should make next available', function() {
        expect($('.next')).toHaveClass('unavailable');
        $('.prev').click();
        expect($('.next')).not.toHaveClass('unavailable');
      });

      it('should make prev unavailable if action lands on first page', function() {
        expect($('.prev')).not.toHaveClass('unavailable');
        for(var i = 0; i < numOfPages; i++) {
          $('.prev').click();
        }
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        expect($('.prev')).toHaveClass('unavailable');
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
        expect($('.page-count')).toContainText(3 + "/" + numOfPages);

        $('.page5').click();
        expect($('.page-count')).toContainText(5 + "/" + numOfPages);

        $('.page1').click();
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
      });

      it('should make the page nmber unavailable', function() {
        expect($('.page7')).not.toHaveClass('unavailable');
        $('.page7').click();
        expect($('.page-count')).toContainText(7 + "/" + numOfPages);
        expect($('.page7')).toHaveClass('unavailable');
      });

      it('should make the last page it was on available', function() {
        expect($('.page1')).toHaveClass('unavailable');
        $('.page6').click();
        expect($('.page-count')).toContainText(6 + "/" + numOfPages);
        expect($('.page1')).not.toHaveClass('unavailable');
      });
    });
  });
});
