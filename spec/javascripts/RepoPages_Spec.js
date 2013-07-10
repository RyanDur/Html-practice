define(['RepoPages', 'jasminejquery'], function(RepoPages) {

  describe('RepoPages', function() {
    var repo, jsonData, showPerPage = 4, numOfPages;

    var gitRepo = function(val) {
      $('.git').append('<li><a href='+ val.html_url +
      ' target=_blank>'+ val.name +'</a></li>');
    };

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
        .on('click', '.first', repo.first)
        .on('click', '.last', repo.last);
      });
    });

    describe('init', function() {
      it('should load the first of the specified number of repos into the page and display the page count', function() {
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        expect($('ul.git > li')).toHaveLength(showPerPage);
      });

      it('should diable the first button', function() {
        expect($('.first')).toBeDisabled();
      });

      it('should disable the prev button', function() {
        expect($('.prev')).toBeDisabled();
      })
    });

    describe('next', function() {
      it('should move from one set of repos to the next updating the page count', function() {
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        $('.next').click();
        expect($('.page-count')).toContainText(2 + "/" + numOfPages);
      });

      it('should enable the first button', function() {
        $('.next').click();
        expect($('.first')).not.toBeDisabled();
      });

      it('should enable the prev buton', function() {
        $('.next').click();
        expect($('.prev')).not.toBeDisabled();
      });

      it('should disable next if action lands on last page', function() {
        for(var i = 0; i < numOfPages; i++) {
          $('.next').click();
        }
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
        expect($('.next')).toBeDisabled();
      });

      it('should have no more items than the number specified', function() {
        for(var i = 0; i < numOfPages; i++) {
          $('.next').click();
          expect($('.git > li')).toHaveLengthLessThanOrEqualTo(showPerPage);
        }
      });

      it('should disable next if action lands on last page', function() {
        for(var i = 0; i < numOfPages; i++) {
          $('.next').click();
        }
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
        expect($('.last')).toBeDisabled();
      });
    });

    describe('previous', function() {
      beforeEach(function() {
        $('.last').click();
      });

      it('should move from one set of repos to the previous updating the page count', function() {
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
        $('.prev').click()
        expect($('.page-count')).toContainText(numOfPages - 1 + "/" + numOfPages);
      });

      it('should enable the next button', function() {
        $('.prev').click();
        expect($('.next')).not.toBeDisabled();
      });

      it('should enable the last button', function() {
        $('.prev').click();
        expect($('.last')).not.toBeDisabled();
      });

      it('should disable prev if action lands on first page', function() {
        for(var i = 0; i < numOfPages; i++) {
          $('.prev').click();
        }
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        expect($('.prev')).toBeDisabled();
      });

      it('should have no more items than the number specified', function() {
        for(var i = 0; i < numOfPages; i++) {
          $('.prev').click();
          expect($('.git > li')).toHaveLengthLessThanOrEqualTo(showPerPage);
        }
      });

      it('should disable first if prev action lands on first page', function() {
        for(var i = 0; i < numOfPages; i++) {
          $('.prev').click();
        }
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        expect($('.first')).toBeDisabled();
      });
    });

    describe('first', function() {
      beforeEach(function() {
        $('.next').click();
      });

      it('should move directly to the first page', function() {
        expect($('.page-count')).toContainText(2 + "/" + numOfPages);

        $('.first').click();
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
      });

      it('should have no more items than the number specified', function() {
        $('.first').click();
        expect($('.git > li')).toHaveLengthLessThanOrEqualTo(showPerPage);
      });

      it('should disable the first button', function() {
        $('.first').click();
        expect($('.first')).toBeDisabled();
      });

      it('should disable the prev button', function() {
        $('.first').click();
        expect($('.prev')).toBeDisabled();
      });

      it('should enable the last button', function() {
        $('.last').click();
        $('.first').click();
        expect($('.last')).not.toBeDisabled();
      });

      it('should enable the next button', function() {
        $('.last').click();
        $('.first').click();
        expect($('.next')).not.toBeDisabled();
      });
    });

    describe('last', function() {
      beforeEach(function() {
        $('.last').click();
      });

      it('should move directly to the last page', function() {
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
      });

      it('should have no more items than the number specified', function() {
        expect($('.git > li')).toHaveLengthLessThanOrEqualTo(showPerPage);
      });

      it('should disable the last button', function() {
        expect($('.last')).toBeDisabled();
      });

      it('should disable the next button', function() {
        expect($('.next')).toBeDisabled();
      })

      it('should enable the prev button', function() {
        expect($('.prev')).not.toBeDisabled();
      });

      it('should enable the first button', function() {
        expect($('.first')).not.toBeDisabled();
      });
    })
  });
});
