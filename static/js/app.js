require.config({
  baseUrl: '/static/js/',

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
    }
  },


  paths: {
    jquery: 'libs/jquery',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    bootstrap: 'libs/bootstrap'
  }
});


require([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'router',

  ],
  function($, _, Backbone, bs, Router) {


    $.fx.speeds._default = 200;
    window.STATIC_URL = '/static/';
    (function($, undefined) {
      '$:nomunge'; // Used by YUI compressor.

      $.fn.serializeObject = function() {
        var obj = {};

        $.each(this.serializeArray(), function(i, o) {
          var n = o.name,
            v = o.value;

          obj[n] = obj[n] === undefined ? v : $.isArray(obj[n]) ? obj[n].concat(v) : [obj[n], v];
        });

        return obj;
      };

    })(jQuery);

    var router = Router.initialize({})


  }
);