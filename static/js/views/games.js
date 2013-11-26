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
			'click .purchase': 'purchaseGame',
			'click .detail-item': 'detailItem',
			'click .purchase-item': 'purchaseItem',
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
			var gp = new Models.GamePurchase({
				game: this.model.get('id')
			});
			that = this;
			console.log(gp);
			gp.sync('create', gp, {
				wait: true,
				success: function(resp) {
					gp.set(resp);
					//heheheheh
					that.model.fetch();
				},
				error: function() {
					console.log('shit');
				}
			});
		},

		render: function(ctx) {
			Views.AbstractView.prototype.render.call(this, ctx);
			this.addSubview('discussionsView', new Discussions.DiscussionsView(this.app, this));
		},

		detailItem: function(e) {
			var title = $(e.currentTarget).data('item');
			this.$el.find('.modal[data-item="' + title + '"]').modal('show');
		},

		purchaseItem: function(e) {
			var title = $(e.currentTarget).data('item');

			var unlock = new Models.ItemUnlock({
				game_id: this.model.get('id'),
				item: title
			});


			unlock.sync('create', unlock, {
				success: function(resp) {
					console.log("unlock success!")
				},
				error: function(resp) {
					console.log("unlock failed")
				}
			})
		}

	});



	var GameListView = Views.AbstractView.extend({

		template: _.template(GameListViewTemplate),

		el: '#main',

		events: {
			'click .filter': 'filter',
			'keyup .filter-text': 'filterText'
		},

		initialize: function(app) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.collection = new Collections.Games([], app);
			console.log(this.collection.model);
			this.listenTo(this.collection, 'sync', this.render);

			var that = this;
			this.collection.fetch({
				success: function() {
					that.developers = _.uniq(that.collection.pluck('developer'));
					that.genres = _.uniq(that.collection.pluck('genre'));
				}
			});
		},

		context: function(ctx) {
			ctx = Views.AbstractView.prototype.context.call(this, ctx);
			ctx.developers = this.developers;
			ctx.genres = this.genres;
			return ctx;
		},


		filter: function(e) {
			//hack because there's a bug somewhere and i don't feel like finding it
			this.collection.model = Models.Game;

			var $t = $(e.currentTarget),
				filter = $t.data('filter'),
				value = $t.data('value');
			if (!value) {
				this.collection.removeFilter(filter);
			} else {
				this.collection.addFilter(filter, value);
			}
			this.collection.fetch();
		},

		filterText: _.debounce(function(e) {
			this.collection.model = Models.Game;
			var text = $(e.currentTarget).val();
			this.collection.addFilter('text', text);

			this.collection.fetch();
		}, 500)


	});

	return {
		GameListView: GameListView,
		GameView: GameView
	}


})