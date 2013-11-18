from flask import g, abort, request, session
from api import json_view
from uuid import uuid4


def login_user(username):
    token = str(uuid4())
    s = g.db.sessions.insert_session(username, token)
    session['token'] = token
    session['username'] = username

    return s


@json_view
def register():
    if request.method == 'POST':
        g.db.users.insert_user(request.json)
    user = g.db.users.get_user_with_login(request.json)
    s = login_user(user['username'])
    return 'session', s

@json_view
def login():
    try:
        user = g.db.users.get_user_with_login(request.json)
        if not user:
            abort(404)
        s = login_user(user['username'])
    except IndexError:
        abort(404)
    return 'session', s

@json_view
def logout():
    # TODO: delete that shit from the database
    session.pop(session['username'], none)
    return none