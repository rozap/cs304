define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',

	'text!templates/users/login.html',
	'text!templates/users/register.html'

], function($, _, Backbone, Collections, Models, Views, LoginViewTemplate, RegisterViewTemplate) {
	var RegisterView = Views.AbstractView.extend({
		template: _.template(RegisterViewTemplate),

		el: '#main',
		events: {
			"click	.register": "register"
		},

		register: function(event) {
			var user = this.hydrate(),
				that = this;
			this.collection.create(user, {
				success: function(user) {
					that.render({
						success: 'Registration succeeded! YAY!'
					});
				},
				error: function() {}
			});
		},

		hydrate: function() {
			var $form = this.$el.find('#register-form'),
				data = $form.serializeObject(true);
			var user = new Models.Register(data);
			return user;
		},

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.collection = new Collections.Register(app);
			this.render();
		},

		render: function(ctx) {
			ctx = this.context(ctx);
			ctx.success = ctx.success;
			this.$el.html(this.template(ctx));
		},

	});

	var LoginView = Views.AbstractView.extend({
		template: _.template(LoginViewTemplate),

		el: '#main',

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Session({});
			this.listenTo(this.model, 'sync', this.render);
			this.render();
		},
		render: function(ctx) {
			Views.AbstractView.prototype.render.call(this, ctx);
		}
	});

	return {
		LoginView: LoginView,
		RegisterView: RegisterView
	}
})