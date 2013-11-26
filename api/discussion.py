from flask import g, abort, request
from api import json_view


def validate_discussion(request):
    #lololol here's our validator
    title = request.json.get('title', '')
    body = request.json.get('body', '')
    if len(title) < 1 or len(body) < 1:
        return False, {'error' : 'You need to include a title and a body!'}, 400
    return False


@json_view
def list_discussions():
    if request.method == 'POST':
        is_invalid = validate_discussion(request)
        if is_invalid:
            return is_invalid

        discussion_dict = request.json
        discussion_dict['username'] = g.user['username']
        discussion_id = g.db.discussions.insert_discussion(discussion_dict)
        discussion = g.db.discussions.get_discussion(discussion_id)

        #The user just created a discussion, so check if they have the discussion achievement, 
        #and if they don't, then bestow it upon them
        achievement = 'Discussion Contributor'
        exisiting_achievement = g.db.achievements.has_achievement(g.user['username'], achievement, discussion_dict['game_id'])
        if exisiting_achievement['achievement_count'] == 0:
            a = {
                'achievement' : achievement,
                'game_id' : discussion_dict['game_id'],
                'user' : g.user['username']
            }
            g.db.achievements.unlock_achievement(a)


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
        is_invalid = validate_discussion(request)
        if is_invalid:
            return is_invalid
        g.db.discussions.update_discussion(request.json, discussion_id, g.user['username'])
    elif request.method == 'DELETE':
        g.db.discussions.delete_discussion(discussion_id)
        return False, {'message' : 'Deletion success'}, 202
        
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


        game_id = g.db.discussions.get_game_id_from_comment(c_id)['id']
        achievement = 'Comment Contributor'
        exisiting_achievement = g.db.achievements.has_achievement(g.user['username'], achievement, game_id)
        if exisiting_achievement['achievement_count'] == 0:
            a = {
                'achievement' : achievement,
                'game_id' : game_id,
                'user' : g.user['username']
            }
            g.db.achievements.unlock_achievement(a)


        return False, comment

    elif request.method == 'GET':
        discussion_id = request.args.get('discussion', 'None')
    try:
        discussion_id = int(discussion_id)
    except ValueError:
        abort(400)
    comments = g.db.discussions.get_comments(discussion_id)
    return 'comments', comments

