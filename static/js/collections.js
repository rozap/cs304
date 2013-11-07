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
			if (str.length > 2) {
				return '?' + str;
			}
			return ''
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

	var Avatars = AbstractCollection.extend({
		objName: 'avatars',
		_url: '/api/avatars',

		//Make the avatars random
		comparator: function(a, b) {
			return Math.random() > .5 ? 1 : 0;
		}
	});


	return {
		Games: Games,
		Discussions: Discussions,
		Comments: Comments,
		Avatars: Avatars
	}


})