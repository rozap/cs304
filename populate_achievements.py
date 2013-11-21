from database import Database

def get_games(db):
    games = db.games.get_games(limit=100000)
    return games


def add_achievement1(db, game):
    vals = {
        'game_id' : game['id'],
    }
    vals['title'] = "Game owner"
    vals['description'] = "A user can achieve this by purchasing %s" % game['title']
    db.achievements.insert_achievement(vals)

def add_achievement2(db, game):
    vals = {
        'game_id' : game['id'],
    }
    vals['title'] = "Discussion Contributor"
    vals['description'] = "A user can achieve this by creating a discussion about %s" % game['title']
    db.achievements.insert_achievement(vals)

def add_achievement3(db, game):
    vals = {
        'game_id' : game['id'],
    }
    vals['title'] = "Comment Contributor"
    vals['description'] = "A user can achieve this by commenting on a discussion within %s" % game['title']
    db.achievements.insert_achievement(vals)    

def add_achievements(db):
    games = get_games(db)
    for game in games:
        add_achievement1(db, game)
        add_achievement2(db, game)
        add_achievement3(db, game)

if __name__ == "__main__":
    db = Database()
    add_achievements(db)
    db.close()
