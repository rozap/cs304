from flask import g
from flask import abort
from api import json_view


@json_view
def list_games():
    games = g.db.games.get_games()
    return 'games', games


@json_view
def detail_game(game_id):
    try:
        game = g.db.games.get_game(game_id)
    except IndexError:
        abort(404)
    return 'games', game



