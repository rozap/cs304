from flask import g, abort, request
from api import json_view


@json_view
def list_games():
    games = g.db.games.get_games(**request.args)
    return 'games', games


@json_view
def detail_game(game_id):
    try:
        game = g.db.games.get_game(game_id)
        game['items'] = g.db.items.get_game_items(game_id)
        game['achievements'] = g.db.achievements.get_game_achievements(game_id)
        game['users'] = g.db.users.get_games_users(game_id)
        game['username'] = g.user['username']
    except IndexError:
        abort(404)
    return False, game




