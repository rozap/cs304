from flask import g, abort, request
from api import json_view


@json_view
def list_items():
	game_id = request.args.get('game', False)
	if not game_id:
		abort(400)
	items = g.db.items.get_game_items(game_id)
	return 'items', items

