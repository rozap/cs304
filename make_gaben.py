from database import Database

def add_gaben(db):
	vals = {
		'username' : 'LORDGABEN',
		'password' : 'halflife3'
	}
	db.users.insert_user(vals)

def get_games(db):
    games = db.games.get_games(limit=100000)
    return games

def giv_gaben_games(db):
    vals = {
    'username' : 'LORDGABEN',
    }
    for game in get_games(db):
        vals['game'] = game['id']
        db.game_purchase.insert_game_purchase(vals)

def giv_gaben_achievements(db):
    vals = {
    'user' : 'LORDGABEN',
    }
    for game in get_games(db):
        vals['game_id'] = game['id']
        for achievement in db.achievements.get_game_achievements(game['id']):
            vals['achievement'] = achievement['title']
            db.achievements.unlock_achievement(vals)

def giv_gaben_items(db):
    vals = {
    'user' : 'LORDGABEN',
    }
    for game in get_games(db):
        vals['game_id'] = game['id']
        for item in db.items.get_game_items(game['id']):
            vals['item'] = item['title']
            db.items.insert_item_unlock(vals)

if __name__ == "__main__":
    db = Database()
    add_gaben(db)
    giv_gaben_games(db)
    giv_gaben_items(db)
    giv_gaben_achievements(db)
    db.close()
