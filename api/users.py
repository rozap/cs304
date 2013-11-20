from flask import g, abort, request
from api import json_view

@json_view
def list_users():
	if request.method == 'POST':
		g.db.users.insert_user(request.json)
	users = g.db.users.get_users()
	print users
	return 'users', users

@json_view
def get_community():
	#lol
	return list_users()

@json_view
def detail_user(username):
	user = {'username' : username}
	try:
		user = g.db.users.get_user(user)
		user['games'] = g.db.users.get_users_games(user['username'])
		# I know for the counts we could count the stuff in the dict, but hey proj requreiments.
		gc = g.db.users.get_users_games_count(user['username'])
		user['games_count'] = gc['COUNT(*)']
		user['achievements'] = g.db.users.get_users_achievements(user['username'])
		ac = g.db.users.get_users_achievements_count(user['username'])
		user['achievements_count'] = ac['COUNT(*)']
		user['items'] = g.db.users.get_users_items(user['username'])
		ic = g.db.users.get_users_items_count(user['username'])
		user['items_count'] = ic['COUNT(*)']
	except IndexError:
		abort(404)
	return False, user
