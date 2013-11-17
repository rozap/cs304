from database import Database



def get_games(db):
    games = db.games.get_game_ids(limit=100000)
    return games


def add_achievement1(db, game_id):
    vals = {
        'game_id' : game_id,
    }
    vals['title'] = "Achievement 1"
    vals['description'] = "The first achievement"
    db.achievements.insert_achievement(vals)

def add_achievement2(db, game_id):
    vals = {
        'game_id' : game_id,
    }
    vals['title'] = "Achievement 2"
    vals['description'] = "The second achievement"
    db.achievements.insert_achievement(vals)

def add_achievement3(db, game_id):
    vals = {
        'game_id' : game_id,
    }
    vals['title'] = "Achievement 3"
    vals['description'] = "The third achievement"
    db.achievements.insert_achievement(vals)    

def add_achievements(db):
    games = get_games(db)
    for id in games:
        game_id = id['id']
        add_achievement1(db, game_id)
        add_achievement2(db, game_id)
        add_achievement3(db, game_id)

if __name__ == "__main__":
    db = Database(None)
    add_achievements(db)
    db.close()
