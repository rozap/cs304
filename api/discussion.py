from flask import g, abort, request
from api import json_view


@json_view
def list_discussions():
    if request.method == 'POST':
        #Create the new discussion
        g.db.discussions.insert_discussion(request.json)


    game_id = request.args.get('game', 'None')
    print game_id
    try:
        game_id = int(game_id)
    except ValueError:
        abort(400)
    discussions = g.db.discussions.get_discussions_for_game(game_id)
    return 'discussions', discussions




@json_view
def detail_discussion(discussion_id):
    discussion = g.db.discussions.get_discussion(discussion_id)
    return False, discussion

@json_view
def list_comments():
    discussion_id = request.args.get('discussion', 'None')
    try:
        discussion_id = int(discussion_id)
    except ValueError:
        abort(400)
    comments = g.db.discussions.get_comments(discussion_id)
    return 'comments', comments

