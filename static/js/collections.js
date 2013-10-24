define([
	'jquery',
	'underscore',
	'backbone',

], function($, _, Backbone) {

	var AbstractCollection = Backbone.Collection.extend({
		parse: function(obj) {
			return obj[this.objName]
		}
	})

	var Games = AbstractCollection.extend({
		url: '/api/games',
		objName: 'games'
	})

	return {
		Games: Games
	}


})