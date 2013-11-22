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
	'text!templates/discussions/new-discussion.html',

], function($, _, Backbone, Collections, Models, Views, DiscussionListViewTemplate,
	DiscussionViewTemplate, NewCommentViewTemplate, NewDiscussionViewTemplate) {


	var NewDiscussionView = Views.AbstractView.extend({

		el: '#new-discussion-container',

		template: _.template(NewDiscussionViewTemplate),

		events: {
			'click .save-discussion': 'save',
			'click .cancel-discussion': 'cancel',
		},

		hydrate: function() {
			var data = this.$el.find('#discussion-form').serializeObject();
			data.game_id = this.app.context.game.id;
			return data;
		},

		save: function() {
			var disc = new Models.Discussion(this.hydrate()),
				that = this;
			if(disc.get('title').length === 0){
				that.parent.render({
					error: 'You need a Title for your awesome Discussion!'
				});
			}
			else {
				disc.sync('create', disc, {
					wait: true,
					success: function(resp) {
						disc.set(resp);
						that.parent.collection.add(disc);
						that.cancel();
						that.parent.render();
					},
					error: function() {
						that.parent.render({
							error: 'You need a Title for your awesome Discussion!'
						});
					}
				});
			}
		}
	});

	var EditDiscussionView = NewDiscussionView.extend({
		el: '#edit-discussion-container',

		initialize: function(opts, parent) {
			this.model = opts.model;
			NewDiscussionView.prototype.initialize.call(this, opts.app, parent);
		},

		save: function() {
			var that = this;
			this.model.set(this.hydrate());
			console.log(this.model.toJSON());
			this.model.sync('update', this.model, {
				success: function() {
					that.cancel();
					that.parent.render();
				},
				error: function() {
					that.parent.render({
						error: 'You need a Title for your awesome Discussion!'
					});
				}
			});

		}

	});

	var DiscussionsView = Views.AbstractView.extend({
		template: _.template(DiscussionListViewTemplate),

		el: '#discussions',

		events: {
			'click .new-discussion-btn': 'newDiscussion',
			'click .next-discussion-page': 'next',
			'click .previous-discussion-page': 'previous'
		},

		initialize: function(app, parent) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.collection = new Collections.Discussions([], app);
			this.listenTo(this.collection, 'sync', this.render);
			this.collection.fetch();
		},


		newDiscussion: function() {
			this.addSubview('newDiscussionView', new NewDiscussionView(this.app, this)).render();
		},

		next: function() {
			this.collection.nextPage();
		},

		previous: function() {
			this.collection.previousPage();
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
				that = this;
			comment.sync('create', comment, {
				success: function(resp) {
					comment.set(resp);
					that.parent.collection.add(comment);
					that.parent.render();
					that.cancel();
				},
				error: function() {}
			});
		},

	});

	var DiscussionView = Views.AbstractView.extend({
		el: '#main',

		template: _.template(DiscussionViewTemplate),

		events: {
			'click .new-comment-btn': 'newComment',
			'click .edit-discussion-btn': 'edit',
			'click .delete-discussion-btn': 'deleteDiscussion',
		},

		initialize: function(app, parent) {
			Views.AbstractView.prototype.initialize.call(this, app);
			this.model = new Models.Discussion({
				id: app.context.discussion.id
			}, app);
			console.log(app);
			this.collection = new Collections.Comments([], app);
			this.avatars = new Collections.Avatars([], app);
			var that = this;
			var done = _.after(3, function() {
				that.render();

				that.listenTo(that.model, 'sync', that.render);
				that.listenTo(that.collection, 'sync', that.render);
				that.listenTo(that.avatars, 'sync', that.render);
			});
			//this will call render thrice but #yolo this is a school project
			this.model.fetch({
				success: done
			});
			this.collection.fetch({
				success: done
			});
			this.avatars.fetch({
				success: done
			});
		},

		render: function(ctx) {
			ctx = this.context(ctx);
			ctx.error = ctx.error;
			var usernames = _.compact(_.uniq(this.collection.pluck('username')));
			//VERY IMPORTANT
			if (this.avatars.length && usernames.length) {
				var that = this,
					avs = this.avatars;
				//assign a random avatar to a user, but make sure no one has the same av
				_.each(usernames, function(name) {
					var comments = that.collection.where({
						username: name
					});
					var av = avs.pop();
					if (av) {
						_.each(comments, function(c) {
							c.avatar = av;
						});
					}
				});
			}
			Views.AbstractView.prototype.render.call(this, ctx);
		},


		newComment: function() {
			this.addSubview('newCommentView', new NewCommentView(this.app, this));
		},

		edit: function() {
			var opts = {
				app: this.app,
				model: this.model
			}
			this.addSubview('editDiscussionView', new EditDiscussionView(opts, this)).render();
		},


		deleteDiscussion: function() {
			var that = this,
				gameId = this.model.get('game_id');
			this.model.destroy({
				success: function() {
					that.app.router.navigate('#/games/' + gameId)
				}
			});
		}

	});



	return {
		DiscussionView: DiscussionView,
		DiscussionsView: DiscussionsView
	}


})