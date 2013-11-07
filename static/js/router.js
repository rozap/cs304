define([
	'jquery',
	'underscore',
	'backbone',
	'views/games',
	'views/discussions',
	'views/users'

], function($, _, Backbone, GameViews, DiscussionViews, UserViews) {



	var Router = Backbone.Router.extend({

		routes: {
			"": "home",
			"games/:id/discussions/:discussion_id": "discussion",
			"games/:id": "game",
			"games": "gameList",
			"games/:id/discussions/:discussion_id": "discussion",
			"login": "login",
			"register": "register"
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

		},

		login: function() {
			new UserViews.LoginView(this.app);
		},

		register: function() {
			new UserViews.RegisterView(this.app);
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