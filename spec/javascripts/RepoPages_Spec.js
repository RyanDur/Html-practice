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
      repo.init(jsonData, showPerPage);
      numOfPages = Math.ceil(jsonData.length/showPerPage);
    });

    describe('init', function() {
      it('should load the first of the specified number of repos into the page and display the page count', function() {
        expect($('.page-count')).toContainText(1 + "/" + numOfPages);
        expect($('ul.git > li')).toHaveLength(showPerPage);
      });
    });

    describe('next', function() {
      xit('should move from one set of repos to the next updating the page count', function() {
      });
    });

    describe('previous', function() {
      xit('should move from one set of repos to the previous updating the page count', function() {
      });
    });
  });
});
