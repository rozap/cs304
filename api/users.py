from flask import g, abort, request
from api import json_view

@json_view
def list_users():
    if request.method == 'POST':
        g.db.users.insert_user(request.json)
    users = g.db.users.get_users()
    return 'users', users

@json_view
def get_community():
    users = {'users' : ''}
    users['users'] = g.db.users.get_users()
    users['users_with_all_games'] = g.db.users.get_users_with_all_games()
    users['users_with_all_achievements'] = g.db.users.get_users_with_all_achievements()
    users['users_with_all_items'] = g.db.users.get_users_with_all_items()

    users['game_purchase_avg'] = g.db.users.get_community_avg('game_purchase');
    users['game_purchase_max'] = g.db.users.get_community_max('game_purchase');
    users['game_purchase_min'] = g.db.users.get_community_min('game_purchase');

    users['item_unlock_avg'] = g.db.users.get_community_avg('item_unlock');
    users['item_unlock_max'] = g.db.users.get_community_max('item_unlock');
    users['item_unlock_min'] = g.db.users.get_community_min('item_unlock');

    users['achievement_unlock_avg'] = g.db.users.get_community_avg('achievement_unlock');
    users['achievement_unlock_max'] = g.db.users.get_community_max('achievement_unlock');
    users['achievement_unlock_min'] = g.db.users.get_community_min('achievement_unlock');
    return False, users

@json_view
def detail_user(username):
    try:
        user = g.db.users.get_user({'username': username})
        user['games'] = g.db.users.get_users_games(username)
        # I know for the counts we could count the stuff in the dict, but hey proj requreiments.
        gc = g.db.users.get_users_games_count(username)
        user['games_count'] = gc['COUNT(*)']
        user['achievements'] = g.db.users.get_users_achievements(username)
        ac = g.db.users.get_users_achievements_count(username)
        user['achievements_count'] = ac['COUNT(*)']
        user['items'] = g.db.users.get_users_items(username)
        ic = g.db.users.get_users_items_count(username)
        user['items_count'] = ic['COUNT(*)']
    except IndexError:
        abort(404)
    return False, user
