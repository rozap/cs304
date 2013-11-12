from flask import g, abort, request
from api import json_view

@json_view
def list_session():
	print 'test'
	if request.method == 'POST':
		g.db.users.insert_user(request.json)
	user = g.db.users.get_user_with_login(request.json)
	# todo: generate some token 
	# session = g.db.users.insert_session(user, token)
	return 'user', user #sessionsion

@json_view
def detail_session():
	print '123'
	try:
		user = g.db.users.get_user_login(request.json)
		if not user:
			abort(404)
		session = g.db.sessions.get_session_with_user(user)
	except IndexError:
		abort(404)
	return user
