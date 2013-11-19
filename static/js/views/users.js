define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',

	'text!templates/users/login.html',
	'text!templates/users/register.html',
	'text!templates/users/profile.html'

], function($, _, Backbone, Collections, Models, Views, LoginViewTemplate, RegisterViewTemplate, ProfileViewTemplate) {

	var ProfileView = Views.AbstractView.extend({
		template: _.template(ProfileViewTemplate),

		el: '#main',

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
			this.$el.html(this.template(ctx));
			Views.AbstractView.prototype.render.call(this, ctx);
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
		ProfileView: ProfileView
	}
})