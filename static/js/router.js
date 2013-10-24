define([
	'jquery',
	'underscore',
	'backbone',
	'views/games'


], function($, _, Backbone, GameViews) {



	var Router = Backbone.Router.extend({

		routes: {
			"": "home",
			"games": "gameList",
			"games/:id": "game"
		},

		initialize: function(opts) {
			this.app = opts.app;
			this.app.router = this;
			this.app.context = {};
		},

		gameList: function() {
			new GameViews.GameListView(this.app);
		},

		game: function(id) {
			this.app.context.game = {
				id: id
			};
			new GameViews.GameView(this.app);
		}


	});

	return {
		initialize: function(app) {
			var router = new Router({
				app: app
			});
			Backbone.history.start();
			return router;
		}
	}


})