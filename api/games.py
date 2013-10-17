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
        game['items'] = g.db.items.get_game_items(game_id)
        game['achievements'] = g.db.achievements.get_game_achievements(game_id)
        game['users'] = g.db.users.get_games_users(game_id)
    except IndexError:
        abort(404)
    return 'games', game




