from flask import g, abort, request
from api import json_view

@json_view
def register():
	print request.json
	g.db.users.insert_user(request.json)
	session_id = g.sessions.get_session_id(request.json)
	return session_id

@json_view
def login():
	print request.json
	user = g.db.users.get_user_with_login(request.json)
	if not user:
		abort(403)
	session_id = g.sessions.get_session_id(request.json)
	return session_id
