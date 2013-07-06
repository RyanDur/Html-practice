define(['RepoPages', 'waypoints'], function(RepoPages, waypoints) {
  var slidePanelsIn = function() {
    $('.sidebar-left').addClass('slideIn');
    $('.sidebar-right').addClass('slideIn');
  };

  var stickySection = function(container, section, options) {
    container.waypoint({
      handler: function(direction) {
                 if (direction === 'down'){
                   container.css({'height': section.outerHeight()});
                   section.stop()
                  .addClass('sticky')
                  .css('top', -section.outerHeight())
                  .animate({'top': options.top_spacing});
                 } else {
                   container.css({'height':'auto'});
                   section.stop()
                  .removeClass('sticky')
                  .css("top", section.outerHeight() + options.waypoint_offset)
                  .animate({'top': ""});
                 }
               },
      offset: function() {
                return -(section.outerHeight()+options.waypoint_offset);
              }
    });
  };

  var gitRepo = function(val) {
    $('.git').append("<li><a href="+ val.html_url +
      " target=_blank>"+ val.name +"</a></li>");
  };

  $(function() {
    var repo = RepoPages(gitRepo);
    var options = {top_spacing: 15, waypoint_offset: 150};
    stickySection($(".nav-container"), $("nav.main"), options);
    slidePanelsIn();
    $.ajax(repo.gitRepos);

    $('.repos').on('click', '.next', repo.next)
    .on('click', '.prev', repo.previous);
  });
});
