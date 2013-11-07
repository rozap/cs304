define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',

	'text!templates/discussions/discussions.html',

], function($, _, Backbone, Collections, Models, Views, DiscussionListViewTemplate) {


	var DiscussionsView = Views.AbstractView.extend({
		template: _.template(DiscussionListViewTemplate),

		el: '#discussions',

		initialize: function(app, parent) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.collection = new Collections.Discussions(app);
			this.listenTo(this.collection, 'sync', this.render);
			this.collection.fetch();
		},

		render: function(ctx) {
			ctx.collection = this.collection;
			return Views.AbstractView.prototype.render.call(this, ctx);
		}
	});



	var DiscussionView = Views.AbstractView.extend({
		el: '#main',

		initialize: function(app, parent) {
			Views.AbstractView.prototype.initialize.call(this, app);

			this.model = new Models.Discussion(app);
			this.listenTo(this.model, 'sync', this.render);
			this.collection.fetch();

		},

		render: function(ctx) {

		}
	});



	return {
		DiscussionsView: DiscussionsView
	}


})