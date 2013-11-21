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

	var Register = AbstractModel.extend({
		url: function() {
			return '/api/register'
		}
	});

	var Login = AbstractModel.extend({
		url: function() {
			return '/api/login'
		}
	});

	var User = AbstractModel.extend({
		url: function() {
			return '/api/user' + (this.get('username') ? '/' + this.get('username') : '');
		}
	});

	var Item = AbstractModel.extend({
		url: function() {
			return 'api/items' + (this.get('id') ? '/' + this.get('id') : '');
		}
	});

	var Community = AbstractModel.extend({
		url: function() {
			return '/api/community'
		}
	});

	var GamePurchase = AbstractModel.extend({
		url: function() {
			return '/api/game_purchase'
		}
	});

	return {
		Discussion: Discussion,
		Game: Game,
		Comment: Comment,
		Register: Register,
		Login: Login,
		User: User,
		Item: Item,
		Community: Community,
		GamePurchase: GamePurchase
	}
});