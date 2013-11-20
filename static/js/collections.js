define([
	'jquery',
	'underscore',
	'backbone',
	'models',

], function($, _, Backbone, Models) {

	var AbstractCollection = Backbone.Collection.extend({

		PAGE_SIZE: 10,


		initialize: function(models, app) {
			Backbone.Collection.prototype.initialize.call(this, models, app);
			if (!app) {
				throw new Error("No app!");
			}

			this.filters = {
				offset: 0
			}

		},

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
			return this._url + this._toGetParams(this.filters);
		},

		nextPage: function() {
			var off = this.filters.offset || 0;
			this.filters.offset = off + this.PAGE_SIZE;
			this.fetch();
		},

		previousPage: function() {
			var off = (this.filters.offset || 0) - this.PAGE_SIZE
			this.filters.offset = off;
			this.fetch();
		},

		hasNext: function() {
			return this.length >= this.PAGE_SIZE;
		},

		hasPrevious: function() {
			return this.filters.offset != 0;
		}

	});

	var Games = AbstractCollection.extend({
		_url: '/api/games',
		objName: 'games'
	});

	var Discussions = AbstractCollection.extend({
		objName: 'discussions',
		_url: '/api/discussions',

		initialize: function(models, app) {
			AbstractCollection.prototype.initialize.call(this, models, app);
			this.filters = _.extend(this.filters, {
				game: app.context.game.id
			})
		},

		comparator: function(d1, d2) {
			return d1.get('id') < d2.get('id');
		}
	});


	var Comments = AbstractCollection.extend({
		objName: 'comments',
		_url: '/api/comments',
		model: Models.Comment,

		initialize: function(models, app) {
			AbstractCollection.prototype.initialize.call(this, models, app);
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

	var Items = AbstractCollection.extend({
		objName: 'items',
		_url: '/api/items',

		initialize: function(models, app) {
			AbstractCollection.prototype.initialize.call(this, models, app);
			this.filters = _.extend(this.filters, {
				game: app.context.game.id
			})
		}
	});


	return {
		Games: Games,
		Discussions: Discussions,
		Comments: Comments,
		Avatars: Avatars,
		Items: Items
	}


})