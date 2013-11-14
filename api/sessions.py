from flask import g, abort, request
from api import json_view
from uuid import uuid4

@json_view
def list_session():
	if request.method == 'POST':
		g.db.users.insert_user(request.json)
	user = g.db.users.get_user_with_login(request.json)
	token = str(uuid4())
	session = g.db.sessions.insert_session(user['username'], token)
	return 'session', session

@json_view
def detail_session():
	try:
		user = g.db.users.get_user_with_login(request.json)
		print user
		if not user:
			abort(404)
		token = str(uuid4())
		session = g.db.sessions.insert_session(user['username'], token)
	except IndexError:
		abort(404)
	return 'session', session
