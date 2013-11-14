define([
	'jquery',
	'underscore',
	'backbone',

], function($, _, Backbone) {

	var AbstractView = Backbone.View.extend({


		initialize: function(app, parent) {
			this.app = app;
			this.parent = parent;
			this.subviews = {};
		},

		context: function(ctx) {
			ctx = ctx || {};
			ctx.app = this.app;
			ctx.collection = this.collection;
			ctx.model = this.model;
			return ctx;
		},

		render: function(ctx) {
			ctx = this.context(ctx);
			this.$el.html(this.template(ctx));
		},

		addSubview: function(name, view) {
			this.subviews[name] = view;
			return view;
		},

		_cleanup: function() {
			this.stopListening();
			this.undelegateEvents();
		},

		cleanup: function() {
			var that = this;
			//#yolo
			_.each(_.keys(this.subviews), function(k) {
				console.log("cleanup " + k)
				that.subviews[k].cleanup();
			});
			this._cleanup();
		},

		cancel: function() {
			this.$el.html('');
			this.cleanup();
		}


	})

	return {
		AbstractView: AbstractView
	}


})