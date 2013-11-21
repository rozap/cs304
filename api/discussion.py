from flask import g, abort, request
from api import json_view


@json_view
def list_discussions():
    if request.method == 'POST':
        discussion_dict = request.json
        discussion_dict['username'] = g.user['username']
        discussion_id = g.db.discussions.insert_discussion(discussion_dict)
        discussion = g.db.discussions.get_discussion(discussion_id)
        return False, discussion

    try:
        offset = int(request.args.get('offset', 0))
        game_id = int(request.args.get('game', 'None'))
    except ValueError:
        abort(400)
    discussions = g.db.discussions.get_discussions_for_game(game_id, offset = offset)
    return 'discussions', discussions




@json_view
def detail_discussion(discussion_id):
    if request.method == 'PUT':
        #lololol here's our validator
        title = request.json.get('title', '')
        body = request.json.get('body', '')
        if len(title) < 1 or len(body) < 1:
            return 

        g.db.discussions.update_discussion(request.json, discussion_id, g.user['username'])
    discussion = g.db.discussions.get_discussion(discussion_id)
    return False, discussion

@json_view
def list_comments():
    if request.method == 'POST':
        comment_dict = request.json
        comment_dict['username'] = g.user['username']
        #Create the new comment
        c_id = g.db.discussions.insert_comment(comment_dict)
        comment = g.db.discussions.get_comment(c_id)
        return False, comment

    elif request.method == 'GET':
        discussion_id = request.args.get('discussion', 'None')
    try:
        discussion_id = int(discussion_id)
    except ValueError:
        abort(400)
    comments = g.db.discussions.get_comments(discussion_id)
    return 'comments', comments

