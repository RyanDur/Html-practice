define(['RepoPages', 'jasminejquery'], function(RepoPages) {

  describe('RepoPages', function() {
    var repo, jsonData, showPerPage = 4;

    var gitRepo = function(val) {
      $('.git').append('<li><a href='+ val.html_url +
      ' target=_blank>'+ val.name +'</a></li>');
    };

    beforeEach(function() {
      repo = RepoPages(gitRepo);
      jsonData = getJSONFixture('git.json');
      loadFixtures('repos.html');
      repo.init(jsonData, showPerPage);
    });

    describe('init', function() {
      it('should load the first of the specified number of repos into the page and display the page count', function() {
        expect($('.page-count')).toContainText(1 + "/" + Math.ceil(jsonData.length/showPerPage));
        expect($('ul.git > li')).toHaveLength(showPerPage);

        $('ul.git').each(function(index) {
          var elem = $(this).find('li > a');
          expect(elem).toContainText(jsonData[index].name);
          expect(elem.attr('href')).toEqual(jsonData[index].html_url);
        });
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
