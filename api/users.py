from flask import g, abort
from api import json_view


@json_view
def list_users():
	users = g.db.users.get_users()
	return users

@json_view
def detail_user(user_id):
	try:
		user = g.db.users.get_user(user_id)
	except IndexError:
		abort(404)
	return user
