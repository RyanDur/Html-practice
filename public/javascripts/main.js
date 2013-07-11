require.config({
    urlArgs: "bust=" + (new Date()).getTime(), // not to be used in production

    paths: {
        jquery: 'vendor/jquery.min',
        'jqueryui': 'vendor/jquery-ui.min',
        'waypoints': 'vendor/waypoints.min',
    },

    shim: {
        'jqueryui': {deps: ['jquery']},
    }
});

requirejs(['Application']);
