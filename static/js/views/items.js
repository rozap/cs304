define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',

	'text!templates/items/item.html'

], function($, _, Backbone, Collections, Models, Views, ItemViewTemplate) {


	var ItemView = Views.AbstractView.extend({
		template: _.template(ItemViewTemplate),

		el: '#main',

		initialize: function(app, parent) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Item({
				id: app.context.item.id
			}, app);
			console.log(app)
			var that = this;
			that.render();
			that.listenTo(that.model, 'sync', that.render);
			this.model.fetch();
		},


		render: function(ctx) {
			Views.AbstractView.prototype.render.call(this, ctx);
		}

	});



	return {
		ItemView: ItemView
	}


})