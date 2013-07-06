define(['RepoPages'], function(RepoPages) {

  describe('RepoPages', function() {
    var gitRepos,
  gitRepo = function(val) {
    $('.git').append("<li><a href="+ val.html_url +
    " target=_blank>"+ val.name +"</a></li>");
  };

  beforeEach(function() {
    gitRepos = RepoPages(gitRepo);
  });

  });
});
