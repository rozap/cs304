App.Router.map(function() {
	this.resource('games', {
		path: '/games'
	});
	this.resource('game', {
		path: '/games/:game_id'
	});
	// put your routes here
});

App.GamesRoute = Ember.Route.extend({

	setupController: function(controller, model) {
		controller.set('content', model);
	},

	model: function(params) {
		return this.store.findAll('game');
	}
});


App.GameRoute = Ember.Route.extend({
	setupController: function(controller, game) {
		controller.set('model', game);
	},

	model: function(params) {
		return this.store.find('game', params.game_id);
	}
})