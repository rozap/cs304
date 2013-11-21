from flask import g, abort, request
from api import json_view


@json_view
def list_items():
	game_id = request.args.get('game', False)
	if not game_id:
		abort(400)
	items = g.db.items.get_game_items(game_id)
	return 'items', items



@json_view
def list_item_unlocks():
	game_id = request.args.get('game', False)
	username = request.args.get('username', False)

	if request.method == 'POST':
		data = request.json
		game_id = data.get('game_id', False)
		username = g.user['username']

		data['user'] = username
		g.db.items.insert_item_unlock(data)

		new_unlock = g.db.items.get_item_unlock(data['item'], game_id, username)

		return False, new_unlock
	if not game_id:
		abort(400)
	item_unlocks = g.db.items.get_item_unlocks(game_id, username)
	return 'item_unlocks', item_unlocks

