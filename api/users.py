from flask import g


def list_users():
	print g.db
	return "Hi:)"


def detail_user(username):
	return username