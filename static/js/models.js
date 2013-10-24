define([
	'jquery',
	'underscore',
	'backbone',

], function($, _, Backbone) {

	var AbstractModel = Backbone.Model.extend({})

	var Game = AbstractModel.extend({
		url: function() {
			return '/api/games' + (this.get('id') ? '/' + this.get('id') : '');
		}
	})

	return {
		Game: Game
	}


});