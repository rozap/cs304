App.Router.map(function() {
	this.resource('games', {
		path: '/games'
	}, function() {
		//child routes
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