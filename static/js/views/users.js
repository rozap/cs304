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
		minData: [],
		maxData: [],
		avgData: [],

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
			this.minData = [ 
				{
					num : this.model.get('game_purchase_min').community_min,
					name : 'Games purchased'
				},
				{
					num : this.model.get('item_unlock_min').community_min,
					name: 'Items unlocked'
				},
				{
					num: this.model.get('achievement_unlock_min').community_min,
					name: 'Achievements unlocked'
				},
			];

			this.maxData = [
				{
					num : this.model.get('game_purchase_max').community_max,
					name: 'Games purchased'
				},
				{
					num : this.model.get('item_unlock_max').community_max,
					name: 'Items unlocked'
				},
				{
					num : this.model.get('achievement_unlock_max').community_max,
					name: 'Achievements unlocked'
				}
			];

			this.avgData = [
				{
					num : this.model.get('game_purchase_avg').community_avg,
					name: 'Games purchased'
				},
				{
					num : this.model.get('item_unlock_avg').community_avg,
					name: 'Items unlocked'
				},
				{
					num : this.model.get('achievement_unlock_avg').community_avg,
					name: 'Achievements unlocked'
				}
			];
		},

		drawGraphs: function(dataSet) {
			console.log(dataSet);

			var yolo = [];
			yolo[0] = dataSet[0].num;
			yolo[1] = dataSet[1].num;
			yolo[2] = dataSet[2].num;
			var x = d3.scale.linear()
				.domain([0, d3.max(yolo)])
				.range([0, 420]);

			d3.select(".chart")
				.selectAll("div")
				.data(dataSet)
				.enter().append("div")
				.style("width", function(d) { 
					if(d.num == null) { return 0 + "px";}
					return x(d.num) + "px"; })
				.text(function(d) { 
					if(d.num == null) { return d.name + " " + 0; }
					return d.name + " " +d.num; })
		},

		showMinOnly: function(event) {
			this.render({
				showMinOnly: true,
				showMaxOnly: false,
				showAvgOnly: false,
			});
			this.drawGraphs(this.minData);
		},

		showMaxOnly: function(event) {
			this.render({
				showMinOnly: false,
				showMaxOnly: true,
				showAvgOnly: false,
			});
			this.drawGraphs(this.maxData);
		},

		showAvgOnly: function(event) {
			this.render({
				showMinOnly: false,
				showMaxOnly: false,
				showAvgOnly: true,
			});
			this.drawGraphs(this.avgData);
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