define(['RepoPages', 'MainNav', 'utility'], function(RepoPages, MainNav, util) {
  var repo;
  var showPerPage = 4;
  var options = {top_spacing: 15, waypoint_offset: 150};

  var slidePanelsIn = function() {
    $('.sidebar-left').addClass('slideIn');
    $('.sidebar-right').addClass('slideIn');
  };

  var gitRepo = function(val) {
    $('.git').append("<li><a class='repoLink small button' href="+ val.html_url +
      " target=_blank>"+ val.name +"</a></li>");
  };

  var loadRepo = function(json) {
    json.data.sort(util.compareUpdatedAt).reverse();
    repo = RepoPages(json.data, showPerPage, gitRepo);

    $('.repos').on('click', '.next', repo.next)
    .on('click', '.prev', repo.previous)
    .on('click', '.page', repo.goTo);
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
    MainNav($(".nav-container"), $("nav.main"), options);
    $.ajax(gitRepos);

    slidePanelsIn();
  });
});
