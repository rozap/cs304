define([
	'jquery',
	'underscore',
	'backbone',
	'collections',
	'models',
	'views',

	'text!templates/discussions/discussions.html',
	'text!templates/discussions/discussion.html',
	'text!templates/discussions/new-comment.html',

], function($, _, Backbone, Collections, Models, Views, DiscussionListViewTemplate,
	DiscussionViewTemplate, NewCommentViewTemplate) {


	var DiscussionsView = Views.AbstractView.extend({
		template: _.template(DiscussionListViewTemplate),

		el: '#discussions',

		initialize: function(app, parent) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.collection = new Collections.Discussions(app);
			this.listenTo(this.collection, 'sync', this.render);
			this.collection.fetch();
		},
	});


	var NewCommentView = Views.AbstractView.extend({

		el: '#new-comment-container',

		template: _.template(NewCommentViewTemplate),

		events: {
			'click .save-comment': 'save',
			'click .cancel-comment': 'cancel',
		},

		initialize: function(app, parent) {
			Views.AbstractView.prototype.initialize.call(this, app, parent);
			this.render();
		},

		hydrate: function() {
			var $form = this.$el.find('#comment-form'),
				data = $form.serializeObject(true);
			var comment = new Models.Comment(data);
			comment.set('discussion_id', this.app.context.discussion.id);
			return comment;
		},

		save: function() {
			var comment = this.hydrate(),
				that = this; // lol i have no idea what this doessss
			this.parent.collection.create(comment, {
				wait: true,
				success: function(comments) {
					console.log(comments.toJSON());
					// that.parent.collection.add();
				},
				error: function() {
					console.log('fuck');
				}
			});
		},

		cancel: function() {}

	});



	var DiscussionView = Views.AbstractView.extend({
		el: '#main',

		template: _.template(DiscussionViewTemplate),

		events: {
			'click .new-comment-btn': 'newComment'
		},

		initialize: function(app, parent) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Discussion({
				id: app.context.discussion.id
			}, app);
			this.collection = new Collections.Comments(app);
			this.listenTo(this.model, 'sync', this.render);
			this.listenTo(this.collection, 'sync', this.render);
			//this will call render twice but #yolo this is a school project
			this.model.fetch();
			this.collection.fetch();
			window.thing = this;
		},


		newComment: function() {
			this.newCommentView = new NewCommentView(this.app, this);

		}
	});



	return {
		DiscussionView: DiscussionView,
		DiscussionsView: DiscussionsView
	}


})