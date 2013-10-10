from flask import g
from flask import abort
from api import json_view


@json_view
def list_achievements():
    achievements = g.db.achievements.get_achievements()
    return 'achievements', achievements


@json_view
def detail_achievement(id):
    try:
        achievement = g.db.games.get_game(id)
    except IndexError:
        abort(404)
    return 'achievement', achievement



