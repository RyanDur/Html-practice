var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return /Spec\.js$/.test(file);
});

requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(), // not to be used in production

    // Karma serves files from '/base'
    baseUrl: '/base/public/javascripts',

    paths: {
        jquery: '../../components/jquery/jquery.min',
        'jasminejquery': '../../components/jasmine-jquery/lib/jasmine-jquery',
        'jqueryui': '../../components/jquery-ui/ui/minified/jquery-ui.min'
    },

    shim: {
        'jasminejquery': {deps: ['jquery']},
        'jqueryui': {deps: ['jquery']}
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
