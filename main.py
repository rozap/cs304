from flask import g, session, render_template, Flask, redirect, url_for
from database import Database
from api.api import LazyView

app = Flask(__name__)

app.add_url_rule('/api/games', view_func=LazyView('api.games.list_games'))
app.add_url_rule('/api/games/<int:game_id>', view_func=LazyView('api.games.detail_game'))
app.add_url_rule('/api/game_purchase', view_func=LazyView('api.game_purchase.list_game_purchase'), methods = ('POST',))

app.add_url_rule('/api/user', view_func=LazyView('api.users.list_users'))
app.add_url_rule('/api/user/<username>', view_func=LazyView('api.users.detail_user'))
app.add_url_rule('/api/community', view_func=LazyView('api.users.get_community'))

app.add_url_rule('/api/items', view_func=LazyView('api.items.list_items'))
app.add_url_rule('/api/item_unlock', view_func=LazyView('api.items.list_item_unlocks'), methods = ('GET', 'POST', 'DELETE'))
app.add_url_rule('/api/achievements', view_func=LazyView('api.achievements.list_achievements'))

app.add_url_rule('/api/discussions', view_func=LazyView('api.discussion.list_discussions'), methods = ('GET', 'POST', 'PUT'))
app.add_url_rule('/api/discussions/<int:discussion_id>', view_func=LazyView('api.discussion.detail_discussion'), methods = ('GET', 'POST', 'PUT'))

app.add_url_rule('/api/comments', view_func=LazyView('api.discussion.list_comments'), methods = ('GET', 'POST', 'PUT'))
app.add_url_rule('/api/avatars', view_func=LazyView('api.avatars.list_avatars'), methods = ('GET',))

app.add_url_rule('/api/register', view_func=LazyView('api.sessions.register'), methods = ('POST',))
app.add_url_rule('/api/login', view_func=LazyView('api.sessions.login'), methods = ('POST',))


@app.route('/')
def index():

    return render_template('index.html', user = g.user)


@app.route('/logout')
def logout():
    del session['username']
    return redirect(url_for('index'))

@app.before_request
def before_request():
    g.db = Database()
    if session.get('username', False):
        g.user = g.db.users.get_user({'username' : session['username']})
    else:
        g.user = False

@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close() 


if __name__ == '__main__':
    app.secret_key = '+\xb0\xe4\x17m\x82\x87eswHl\xe8\xd1\xdc\x85\x92W\xf7\xe0\xfek\x11\x8f'
    app.run(debug = True)

