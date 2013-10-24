define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',

	'text!templates/games/games.html',
	'text!templates/games/game.html'

], function($, _, Backbone, Collections, Models, Views, GameListViewTemplate, GameViewTemplate) {


	var GameView = Views.AbstractView.extend({
		template: _.template(GameViewTemplate),

		el: '#main',

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Game({
				id: this.app.context.game.id
			});
			this.listenTo(this.model, 'sync', this.render);
			this.model.fetch();
		},


	});



	var GameListView = Views.AbstractView.extend({

		template: _.template(GameListViewTemplate),

		el: '#main',

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.collection = new Collections.Games();
			this.listenTo(this.collection, 'sync', this.render);
			this.collection.fetch();
		},


	});

	return {
		GameListView: GameListView,
		GameView: GameView
	}


})