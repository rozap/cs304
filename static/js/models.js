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
	});


	var Discussion = AbstractModel.extend({
		url: function() {
			return '/api/discussions' + (this.get('id') ? '/' + this.get('id') : '');
		}
	});

	var Comment = AbstractModel.extend({
		url: function() {
			return '/api/comments' + (this.get('id') ? '/' + this.get('id') : '');
		}
	});

	var Session = AbstractModel.extend({
		url: function() {
			return '/api/login'
		}
	});

	return {
		Discussion: Discussion,
		Game: Game,
		Comment: Comment,
		Session: Session
	}
});