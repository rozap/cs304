from flask import g, abort, request
from api import json_view

@json_view
def list_game_purchase():
	if request.method == 'POST':
	    game_purchase_dict = request.json
	    game_purchase_dict['username'] = g.user['username']
	    g.db.game_purchase.insert_game_purchase(game_purchase_dict)
	    game_purchase = g.db.game_purchase.get_game_purchase(game_purchase_dict)
	    print game_purchase
	    return False, game_purchase
	abort(405)
