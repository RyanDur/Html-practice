define(['RepoPages', 'jasminejquery'], function(RepoPages) {

  describe('RepoPages', function() {
    var repo, jsonData, showPerPage = 4, numOfPages;

    var gitRepo = function(val) {
      $('.git').append('<li><a href='+ val.html_url +
      ' target=_blank>'+ val.name +'</a></li>');
    };

    beforeEach(function() {
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

      it('should hide the previous button', function() {
        expect($('.prev')).toHaveCss({visibility: 'hidden'});
      });
    });

    describe('next', function() {
      it('should move from one set of repos to the next updating the page count', function() {
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        $('.next').click();
        expect($('.page-count')).toContainText(2 + "/" + numOfPages);
      });

      it('should make the prev button visible', function() {
        expect($('.prev')).toHaveCss({visibility: 'hidden'});
        $('.next').click();
        expect($('.prev')).toHaveCss({visibility: 'visible'});
      });

      it('should make the next button hidden on last page', function() {
        for(var i = 1; i < numOfPages - 1; i++) {
          $('.next').click();
        }
        expect($('.page-count')).toContainText(numOfPages - 1 + "/" + numOfPages);
        expect($('.next')).toHaveCss({visibility: 'visible'});

        $('.next').click();
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
        expect($('.next')).toHaveCss({visibility: 'hidden'});
      });
    });

    describe('previous', function() {
      beforeEach(function() {
        for(var i = 1; i < numOfPages; i++) {
          $('.next').click();
        }
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
      });

      it('should move from one set of repos to the previous updating the page count', function() {
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
        $('.prev').click()
        expect($('.page-count')).toContainText(numOfPages - 1 + "/" + numOfPages);
      });

      it('should make the next button visible', function() {
        expect($('.next')).toHaveCss({visibility: 'hidden'});
        $('.prev').click();
        expect($('.next')).toHaveCss({visibility: 'visible'});
      });
      
      it('should make the previous button hidden on first page', function() {
        for(var i = 1; i < numOfPages - 1; i++) {
          $('.prev').click();
        }
        expect($('.page-count')).toContainText(2 + "/" + numOfPages);
        expect($('.prev')).toHaveCss({visibility: 'visible'});

        $('.prev').click();
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        expect($('.prev')).toHaveCss({visibility: 'hidden'});
      });
    });

    describe('first', function() {
      it('should move directly to the first page', function() {
        $('.next').click();
        expect($('.page-count')).toContainText(2 + "/" + numOfPages);

        $('.first').click();
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
      });
    });

    describe('last', function() {
      it('should move directly to the last page', function() {
        $('.last').click();
        expect($('.page-count')).toContainText(numOfPages + "/" + numOfPages);
      });
    })
  });
});
