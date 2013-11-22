define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',
	'libs/d3',

	'text!templates/users/login.html',
	'text!templates/users/register.html',
	'text!templates/users/profile.html',
	'text!templates/users/community.html'

], function($, _, Backbone, Collections, Models, Views, D3, LoginViewTemplate, RegisterViewTemplate, ProfileViewTemplate, CommunityViewTemplate) {

	// highscores
	var CommunityView = Views.AbstractView.extend({
		template: _.template(CommunityViewTemplate),

		el: '#main',
		data: [],

		events: {
			"click .show_games": "showGamesOnly",
			"click .show_items": "showItemsOnly",
			"click .show_achievements": "showAchievementsOnly",
			"click .show_min": "showMinOnly",
			"click .show_max": "showMaxOnly",
			"click .show_avg": "showAvgOnly"
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
			ctx.showMinOnly = ctx.showMinOnly;
			ctx.showMaxOnly = ctx.showMaxOnly;
			ctx.showAvgOnly = ctx.showAvgOnly;
			this.$el.html(this.template(ctx));
			this.data = [ 
				this.model.get('game_purchase_min').community_min,
				this.model.get('item_unlock_min').community_min,
				this.model.get('achievement_unlock_min').community_min,

				this.model.get('game_purchase_max').community_max,
				this.model.get('item_unlock_max').community_max,
				this.model.get('achievement_unlock_max').community_max,

				this.model.get('game_purchase_avg').community_avg,
				this.model.get('item_unlock_avg').community_avg,
				this.model.get('achievement_unlock_avg').community_avg,
				];

 
			console.log(this.data);
			//Views.AbstractView.prototype.render.call(this, ctx);
		},

		showMinOnly: function(event) {
			this.render({
				showMinOnly: true,
				showMaxOnly: false,
				showAvgOnly: false
			});

			var svgContainer = d3.select(".d3").append("svg")
				.attr("width", 500)
				.attr("height", 500);

			var circle = svgContainer.append("circle").style("fill", "red")
				.attr("cx", 30)
				.attr("cy", 30)
				.attr("r", this.data[0]);

			var circle = svgContainer.append("circle").style("fill", "steelblue")
				.attr("cx", 30 + 30)
				.attr("cy", 30 + 30)
				.attr("r", this.data[1]);

			var circle = svgContainer.append("circle").style("fill", "green")
				.attr("cx", 30 + 30)
				.attr("cy", 30 + 30)
				.attr("r", this.data[2]);
		},

		showMaxOnly: function(event) {
			this.render({
				showMinOnly: false,
				showMaxOnly: true,
				showAvgOnly: false
			});
			var svgContainer = d3.select(".d3").append("svg")
				.attr("width", 500)
				.attr("height", 500);

			var circle = svgContainer.append("circle").style("fill", "red")
				.attr("cx", 30)
				.attr("cy", 30)
				.attr("r", this.data[3]);

			var circle = svgContainer.append("circle").style("fill", "steelblue")
				.attr("cx", 30 + 30)
				.attr("cy", 30 + 30)
				.attr("r", this.data[4]);

			var circle = svgContainer.append("circle").style("fill", "green")
				.attr("cx", 30 + 30)
				.attr("cy", 30 + 30)
				.attr("r", this.data[5]);
		},

		showAvgOnly: function(event) {
			this.render({
				showMinOnly: false,
				showMaxOnly: false,
				showAvgOnly: true
			});
			var svgContainer = d3.select(".d3").append("svg")
				.attr("width", 200)
				.attr("height", 200);

			var circle = svgContainer.append("circle").style("fill", "steelred")
				.attr("cx", 30)
				.attr("cy", 30)
				.attr("r", this.data[6]);

			var circle = svgContainer.append("circle").style("fill", "steelblue")
				.attr("cx", 30 + 30)
				.attr("cy", 30 + 30)
				.attr("r", this.data[7]);

			var circle = svgContainer.append("circle").style("fill", "steelgreen")
				.attr("cx", 30 + 30)
				.attr("cy", 30 + 30)
				.attr("r", this.data[8]);
		},

		showGamesOnly: function(event) {
			this.render({
				showGamesOnly: true,
				showItemsOnly: false,
				showAchievementsOnly: false
			});
		},

		showItemsOnly: function(event) {
			this.render({
				showGamesOnly: false,
				showItemsOnly: true,
				showAchievementsOnly: false
			});
		},

		showAchievementsOnly: function(event) {
			this.render({
				showGamesOnly: false,
				showItemsOnly: false,
				showAchievementsOnly: true
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
				showGamesOnly: true,
				showItemsOnly: false,
				showAchievementsOnly: false
			});
		},

		showItemsOnly: function(event) {
			this.render({
				showGamesOnly: false,
				showItemsOnly: true,
				showAchievementsOnly: false
			});
		},

		showAchievementsOnly: function(event) {
			this.render({
				showGamesOnly: false,
				showItemsOnly: false,
				showAchievementsOnly: true
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
					window.location = '/'
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