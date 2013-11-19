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
	except IndexError:
		abort(404)
	return False, user
