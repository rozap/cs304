from flask import Flask
from flask import render_template
from flask import g
from database import Database

from api.api import LazyView

app = Flask(__name__)

app.add_url_rule('/games', view_func=LazyView('api.games.list_games'))
app.add_url_rule('/games/<int:game_id>', view_func=LazyView('api.games.detail_game'))
app.add_url_rule('/users', view_func=LazyView('api.users.list_users'))
app.add_url_rule('/users/<username>', view_func=LazyView('api.users.detail_user'))




# @app.route('/')
# def hello_world():

#     print g.db.games.get_games()

#     g.db.games.insert_game({
#         'title' : 'some new game',
#         'price' : 7,
#         'description' : 'some new game description',
#         'developer' : 'nintendo',
#         'genre' : 'adventure' 
#         })

#     return render_template('app.html')










@app.before_request
def before_request():
    g.db = Database(app)

@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close() 


if __name__ == '__main__':
    app.run(debug = True)

