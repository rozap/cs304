from flask import Flask
from flask import render_template
from flask import g
from database import Database

app = Flask(__name__)



@app.route('/')
def hello_world():

    print g.db.games.get_games()

    g.db.games.insert_game({
        'title' : 'some new game',
        'price' : 7,
        'description' : 'some new game description',
        'developer' : 'nintendo',
        'genre' : 'adventure' 
        })

    return render_template('app.html')




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
