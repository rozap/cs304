from flask import g, abort, request
from api import json_view
from os import listdir, getcwd
from os.path import isfile, join
import random

@json_view
def list_avatars():
	static = '/static/img/avatars'
	static_ext = static + '/%s'
	avatar_dir =  getcwd() + static
	avs = [{'name' : f, 'path' : static_ext % f} for f in listdir(avatar_dir) if isfile(join(avatar_dir,f)) ]
	return 'avatars', avs