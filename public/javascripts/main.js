require.config({
  urlArgs: "bust=" + (new Date()).getTime(), // not to be used in production
  paths: {
          jquery: 'components/jquery/jquery.min',
          'jqueryui': 'components/jquery-ui/ui/jquery-ui',
          'waypoints': 'components/jquery-waypoints/waypoints.min',
         },
  shim: {
            'jqueryui': {deps: ['jquery']}
        }
});

requirejs(['Application']);