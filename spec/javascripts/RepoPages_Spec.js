define(['RepoPages', 'jasminejquery'], function(RepoPages) {

  describe('RepoPages', function() {
    var repo, jsonData;

    var gitRepo = function(val) {
      $('.git').append("<li><a href="+ val.html_url +
      " target=_blank>"+ val.name +"</a></li>");
    };

    beforeEach(function() {
      repo = RepoPages(gitRepo);
      jsonData = getJSONFixture('git.json');
      loadFixtures('repos.html');
      repo.init(jsonData, 4);
    });

    describe('init', function() {
      it('', function() {
      });
    });

    describe('next', function() {
      it('', function() {
      });
    });

    describe('previous', function() {
      it('', function() {
      });
    });
  });
});
