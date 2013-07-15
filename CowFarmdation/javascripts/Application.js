define(['RepoPages', 'waypoints', 'utility'], function(RepoPages, waypoints, util) {
  var repo;
  var showPerPage = 4;
  var options = {top_spacing: 15, waypoint_offset: 150};

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
    $('.git').append("<li><a class='repoLink small button' href="+ val.html_url +
      " target=_blank>"+ val.name +"</a></li>");
  };

  var loadRepo = function(json) {
    json.data.sort(util.compareUpdatedAt).reverse();
    repo.init(json.data, showPerPage);
  };

  var spinner = function() {
    util.addSpinner($('.git'));
  };

  var error = function() {
    //$('.git').append('<div class="error">error</div>');
  };

  var gitRepos = {
    type: 'GET',
    url: 'https://api.github.com/users/RyanDur/repos',
    cache: false,
    timeout: 5000,
    contentType: "application/json",
    dataType: 'jsonp',
    beforeSend: spinner,
    success: loadRepo,
    error: error
  };

  $(function() {
    repo = RepoPages(gitRepo);
    stickySection($(".nav-container"), $("nav.main"), options);
    $.ajax(gitRepos);

    $('.repos').on('click', '.next', repo.next)
    .on('click', '.prev', repo.previous)
    .on('click', '.page', repo.goTo);

    slidePanelsIn();
  });
});
