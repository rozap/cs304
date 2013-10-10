App.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'api'
});

App.Game = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	price: DS.attr('number'),
	genre: DS.attr('string'),
	developer: DS.attr('string'),
	image: DS.attr('string')
});