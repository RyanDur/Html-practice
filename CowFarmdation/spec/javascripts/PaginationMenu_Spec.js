define(['PaginationMenu'], function(PaginationMenu) {
  var menu = PaginationMenu();

  beforeEach(function() {
    setFixtures($('<nav class="repo"><ul></ul></nav>'));
    menu.init($('nav.repo'), 8);
  });

  describe('init', function() {
    it('should populate the menu', function() {
      expect($('ul > li')).toHaveLength(10);
    });
  });
});
