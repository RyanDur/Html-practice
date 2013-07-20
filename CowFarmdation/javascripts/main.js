require.config({
    urlArgs: "bust=" + (new Date()).getTime(), // not to be used in production

    paths: {
        jquery: 'vendor/jquery.min',
        'jqueryui': 'vendor/jquery-ui.min',
        'waypoints': 'vendor/waypoints.min',
        'modernizer': 'vendor/modernizer',
        'foundation': "foundation/foundation",
        "foundation.alerts": "foundation/foundation.alerts",
        "foundation.clearing": "foundation/foundation.clearing",
        "foundation.cookie": "foundation/foundation.cookie",
        "foundation.forms": "foundation/foundation.forms",
        "foundation.interchange": "foundation/foundation.interchange",
        "foundation.joyride": "foundation/foundation.joyride",
        "foundation.magellan": "foundation/foundation.magellan",
        "foundation.placeholder": "foundation/foundation.placeholder",
        "foundation.orbit": "foundation/foundation.orbit",
        "foundation.reveal": "foundation/foundation.reveal",
        "foundation.section": "foundation/foundation.section",
        "foundation.tooltips": "foundation/foundation.tooltips",
        "foundation.topbar": "foundation/foundation.topbar"
    },

    shim: {
        'jqueryui': {deps: ['jquery']},
        'waypoints': {deps: ['jquery']},
        'foundation': {deps: ["jquery"]},
        "foundation.cookie": {deps: ["foundation"]},
        "foundation.alerts": {deps: ["foundation"]},
        "foundation.clearing": {deps: ["foundation"]},
        "foundation.forms": {deps: ["foundation"]},
        "foundation.interchange": {deps: ["foundation"]},
        "foundation.joyride": {deps: ["foundation"]},
        "foundation.magellan": {deps: ["foundation"]},
        "foundation.placeholder": {deps: ["foundation"]},
        "foundation.orbit": {deps: ["foundation"]},
        "foundation.reveal": {deps: ["foundation"]},
        "foundation.section": {deps: ["foundation"]},
        "foundation.tooltips": {deps: ["foundation"]},
        "foundation.topbar": {deps: ["foundation"]}
    }
});

requirejs([
           "foundation.cookie",
           "foundation.alerts",
           "foundation.clearing",
           "foundation.forms",
           "foundation.interchange",
           "foundation.joyride",
           "foundation.magellan",
           "foundation.placeholder",
           "foundation.orbit",
           "foundation.reveal",
           "foundation.tooltips",
           "foundation.topbar",
           'Application'
           ], function () {
            $(document).foundation(function(response) {
              console.log(response.errors);
            });
          });

