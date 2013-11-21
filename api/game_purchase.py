from flask import g, abort, request
from api import json_view

@json_view
def list_game_purchase():
	if request.method == 'POST':
	    game_purchase_dict = request.json
	    game_purchase_dict['username'] = g.user['username']
	    g.db.game_purchase.insert_game_purchase(game_purchase_dict)
	    game_purchase = g.db.game_purchase.get_game_purchase(game_purchase_dict)

        achievement = 'Game Owner'
        exisiting_achievement = g.db.achievements.has_achievement(g.user['username'], achievement, game_purchase_dict['game'])
        if exisiting_achievement['achievement_count'] == 0:
            a = {
                'achievement' : achievement,
                'game_id' : game_purchase_dict['game'],
                'user' : g.user['username']
            }
            g.db.achievements.unlock_achievement(a)


	    return False, game_purchase
	abort(405)
