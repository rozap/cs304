define([
	'jquery',
	'underscore',
	'backbone',
	'models',

], function($, _, Backbone, Models) {

	var AbstractCollection = Backbone.Collection.extend({
		parse: function(obj) {
			return obj[this.objName]
		},

		_toGetParams: function(obj) {
			var str = '';
			for (var key in obj) {
				if (str !== '') {
					str += '&';
				}
				str += key + '=' + obj[key];
			}
			return '?' + str;
		},


		url: function() {
			this.filters = this.filters || {};
			return this._url + this._toGetParams(this.filters);
		}

	});

	var Games = AbstractCollection.extend({
		_url: '/api/games',
		objName: 'games'
	});

	var Discussions = AbstractCollection.extend({
		objName: 'discussions',
		_url: '/api/discussions',

		initialize: function(app) {
			this.filters = {
				game: app.context.game.id
			}
		}
	});


	var Comments = AbstractCollection.extend({
		objName: 'comments',
		_url: '/api/comments',
		model: Models.Comment,

		initialize: function(app) {
			this.filters = {
				discussion: app.context.discussion.id
			}
		}
	});

	var Register = AbstractCollection.extend({
		objName: 'sessions',
		_url: '/api/register',
		model: Models.Register,
	});


	return {
		Games: Games,
		Discussions: Discussions,
		Comments: Comments,
		Register: Register,
	}


})