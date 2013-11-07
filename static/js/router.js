define([
	'jquery',
	'underscore',
	'backbone',
	'views/games',
	'views/discussion'


], function($, _, Backbone, GameViews, DiscussionViews) {



	var Router = Backbone.Router.extend({

		routes: {
			"": "home",
			"games": "gameList",
			"games/:id": "game",
			"games/:id/discussions/:discussion_id": "discussion"

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
		},

		discussion: function(id, discussion) {
			this.app.context.game = {
				id: id
			};
			this.app.context.discussion = {
				id: id
			};
			new DiscussionViews.DiscussionView(this.app);

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