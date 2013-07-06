describe('RepoPages', function() {
  var gitRepos,
      gitRepo = function(val) {
        $('.git').append("<li><a href="+ val.html_url +
        " target=_blank>"+ val.name +"</a></li>");
      };

  beforeEach(function() {
    gitRepos = RepoPages(gitRepo);
  });

  describe('compareDates', function() {
    it('should return 0 1 or -1', function() {
      expect(gitRepos.compareUpdatedAt({"updated_at": "2013-06-12T02:30:31Z"},{"updated_at": "2013-06-12T02:30:31Z"})).toEqual(0);
      expect(gitRepos.compareUpdatedAt({"updated_at": "2013-01-11T21:24:10Z"},{"updated_at": "2013-01-11T13:56:38Z"})).toEqual(1);
      expect(gitRepos.compareUpdatedAt({"updated_at": "2013-04-15T02:18:27Z"},{"updated_at": "2013-04-25T05:28:00Z"})).toEqual(-1);
    });
  });
});
