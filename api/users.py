from flask import g, abort
from api import json_view

@json_view
def list_users():
	if request.method == 'POST':
		g.db.users.insert_user(request.json)
	users = g.db.users.get_users()
	return 'users', users

@json_view
def detail_user(username):
	user = {'username' : username}
	try:
		user = g.db.users.get_user(user)
		user['games'] = g.db.users.get_users_games(user['username'])
		# I know for the counts we could count the stuff in the dict, but hey proj requreiments.
		user['games_count'] = g.db.users.get_users_games_count(user['username'])
		user['achievements'] = g.db.users.get_users_achievements(user['username'])
		user['achievements_count'] = g.db.users.get_users_achievements_count(user['username'])
		user['items'] = g.db.users.get_users_items(user['username'])
		user['items_count'] = g.db.users.get_users_items_count(user['username'])
	except IndexError:
		abort(404)
	return False, user
