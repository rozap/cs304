define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',

	'text!templates/users/login.html',
	'text!templates/users/register.html',
	'text!templates/users/profile.html',
	'text!templates/users/community.html'

], function($, _, Backbone, Collections, Models, Views, LoginViewTemplate, RegisterViewTemplate, ProfileViewTemplate, CommunityViewTemplate) {

	// highscores
	var CommunityView = Views.AbstractView.extend({
		template: _.template(CommunityViewTemplate),

		el : '#main',
		
		events: {
			"click .show_games": "showGamesOnly",
			"click .show_items": "showItemsOnly",
			"click .show_achievements": "showAchievementsOnly",
		},

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Community({});
			this.listenTo(this.model, 'sync', this.render);
			this.model.fetch();
			console.log(this.model);
		},

		render: function(ctx) {
			ctx = this.context(ctx);
			ctx.showGamesOnly = ctx.showGamesOnly;
			ctx.showItemsOnly = ctx.showItemsOnly;
			ctx.showAchievementsOnly = ctx.showAchievementsOnly;
			this.$el.html(this.template(ctx));
			//Views.AbstractView.prototype.render.call(this, ctx);
		},

		showGamesOnly: function(event) {
			this.render({
				showGamesOnly : true,
				showItemsOnly : false,
				showAchievementsOnly : false
			});
		},

		showItemsOnly: function(event) {
			this.render({
				showGamesOnly : false,
				showItemsOnly : true,
				showAchievementsOnly : false
			});
		},

		showAchievementsOnly: function(event) {
			this.render({
				showGamesOnly : false,
				showItemsOnly : false,
				showAchievementsOnly : true
			});
		}
	});

	var ProfileView = Views.AbstractView.extend({
		template: _.template(ProfileViewTemplate),

		el: '#main',

		events: {
			"click .show_games": "showGamesOnly",
			"click .show_items": "showItemsOnly",
			"click .show_achievements": "showAchievementsOnly",
		},

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.User({
				username: this.app.context.user.username
			});
			this.listenTo(this.model, 'sync', this.render);
			this.model.fetch();
		},

		render: function(ctx) {
			ctx = this.context(ctx);
			ctx.showGamesOnly = ctx.showGamesOnly;
			ctx.showItemsOnly = ctx.showItemsOnly;
			ctx.showAchievementsOnly = ctx.showAchievementsOnly;
			this.$el.html(this.template(ctx));
			//Views.AbstractView.prototype.render.call(this, ctx);
		},

		showGamesOnly: function(event) {
			this.render({
				showGamesOnly : true,
				showItemsOnly : false,
				showAchievementsOnly : false
			});
		},

		showItemsOnly: function(event) {
			this.render({
				showGamesOnly : false,
				showItemsOnly : true,
				showAchievementsOnly : false
			});
		},

		showAchievementsOnly: function(event) {
			this.render({
				showGamesOnly : false,
				showItemsOnly : false,
				showAchievementsOnly : true
			});
		}

	});

	var RegisterView = Views.AbstractView.extend({
		template: _.template(RegisterViewTemplate),

		el: '#main',
		events: {
			"click	.register": "register"
		},

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Register({}, app);
			this.render();
		},

		render: function(ctx) {
			ctx = this.context(ctx);
			ctx.success = ctx.success;
			ctx.error = ctx.error;
			this.$el.html(this.template(ctx));
		},

		register: function(event) {
			var that = this;
			this.model.set(this.hydrate());
			this.model.sync('create', this.model, {
				success: function(user) {
					that.render({
						success: 'Registration succeeded! YAY!'
					});
				},
				error: function() {
					that.render({
						error: 'Registration failed, try again.'
					});
				}
			});
		},

		hydrate: function() {
			var $form = this.$el.find('#register-form'),
			data = $form.serializeObject(true);
			return data;
		}

	});

	var LoginView = Views.AbstractView.extend({
		template: _.template(LoginViewTemplate),

		el: '#main',
		events: {
			"click	.login": "login"
		},

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Login({}, app);
			this.render();
		},

		render: function(ctx) {
			ctx = this.context(ctx);
			ctx.success = ctx.success;
			ctx.error = ctx.error;
			this.$el.html(this.template(ctx));
		},

		login: function(event) {
			var that = this;
			this.model.set(this.hydrate());
			this.model.sync('create', this.model, {
				success: function(user) {
					window.location = '/#/games'
				},
				error: function() {
					that.render({
						error: 'Wrong username and/or password.'
					});
				}
			});
		},

		hydrate: function() {
			var $form = this.$el.find('#login-form'),
			data = $form.serializeObject(true);
			return data;
		}

	});

	return {
		LoginView: LoginView,
		RegisterView: RegisterView,
		ProfileView: ProfileView,
		CommunityView: CommunityView
	}
})