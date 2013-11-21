define([
	'jquery',
	'underscore',
	'backbone',
	'views/games',
	'views/discussions',
	'views/users',
	'views/items'

], function($, _, Backbone, GameViews, DiscussionViews, UserViews, ItemViews) {



	var Router = Backbone.Router.extend({

		routes: {
			"": "home",
			"games/:id/discussions/:discussion_id": "discussion",
			"games/:id": "game",
			"games/:id/discussions/:discussion_id": "discussion",
			"games/:id/items/:title": "item",
			"login": "login",
			"register": "register",
			"user/:username": "user",
			"community": "community"
		},


		cleanup: function() {
			if (this.mainView) {
				this.mainView.cleanup();
			}
		},

		initialize: function(opts) {
			this.cleanup();
			this.app = opts.app;
			this.app.router = this;
			this.app.context = {};
		},

		home: function() {
			this.mainView = new GameViews.GameListView(this.app);
		},

		game: function(id) {
			this.cleanup();
			this.app.context.game = {
				id: id
			};
			this.mainView = new GameViews.GameView(this.app);
		},

		discussion: function(id, discussion) {
			this.cleanup();
			this.app.context.game = {
				id: id
			};
			this.app.context.discussion = {
				id: discussion
			};
			this.mainView = new DiscussionViews.DiscussionView(this.app);

		},

		item: function(id, item) {
			this.cleanup();
			this.app.context.game = {
				id: id
			};
			this.app.context.item = {
				id: item
			};
			this.mainView = new ItemViews.ItemView(this.app);

		},

		login: function() {
			this.mainView = new UserViews.LoginView(this.app);
		},

		register: function() {
			this.mainView = new UserViews.RegisterView(this.app);
		},

		user: function(username) {
			this.cleanup();
			this.app.context.user = {
				username: username
			};
			this.mainView = new UserViews.ProfileView(this.app);
		},

		community: function() {
			this.mainView = new UserViews.CommunityView(this.app);
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