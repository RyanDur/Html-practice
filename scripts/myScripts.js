$(function() {
    $("nav").css('opacity', 0);
    $(window).load(revealNav);
});

var revealNav = function() {
    $("nav").delay(1000).animate({opacity: 1}, 1500);
};
