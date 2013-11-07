define([
	'jquery',
	'underscore',
	'backbone',

], function($, _, Backbone) {

	var AbstractView = Backbone.View.extend({

		initialize: function(app) {
			this.app = app;
		},

		context: function(ctx) {
			ctx = ctx || {};
			ctx.app = this.app;
			this.collection && (ctx.collection = this.collection);
			this.model && (ctx.model = this.model);
			return ctx;
		},

		render: function(ctx) {
			ctx = this.context(ctx);
			this.$el.html(this.template(ctx));
		}


	})

	return {
		AbstractView: AbstractView
	}


})