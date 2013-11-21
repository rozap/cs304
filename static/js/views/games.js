define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',
	'views/discussions',

	'text!templates/games/games.html',
	'text!templates/games/game.html'

], function($, _, Backbone, Collections, Models, Views, Discussions, GameListViewTemplate, GameViewTemplate) {


	var GameView = Views.AbstractView.extend({
		template: _.template(GameViewTemplate),

		el: '#main',

		events: {
			'click .purchase': 'purchaseGame'
		},

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Game({
				id: this.app.context.game.id
			});
			this.listenTo(this.model, 'sync', this.render);
			this.model.fetch();
		},

		purchaseGame: function(ctx) {
			var gp = new Models.GamePurchase({game : this.model.get('id')});
				that = this;
			console.log(gp);
			gp.sync('create', gp, {
				wait: true,
				success: function(resp) {
					gp.set(resp);
					that.cancel();
					this.render();
				},
				error: function() {
					console.log('shit');
				}
			});
		},

		render: function(ctx) {
			Views.AbstractView.prototype.render.call(this, ctx);
			this.addSubview('discussionsView', new Discussions.DiscussionsView(this.app, this));
		}

	});



	var GameListView = Views.AbstractView.extend({

		template: _.template(GameListViewTemplate),

		el: '#main',

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.collection = new Collections.Games([], app);
			this.listenTo(this.collection, 'sync', this.render);
			this.collection.fetch();
		},


	});

	return {
		GameListView: GameListView,
		GameView: GameView
	}


})