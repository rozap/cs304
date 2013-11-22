from database import Database

def get_games(db):
    games = db.games.get_game(limit=100000)
    return games


def add_item1(db, game):
    vals = {
        'game_id' : game['id'],
    }
    vals['title'] = "%s Item 1" % game['title']
    vals['description'] = "The first item for %s" % game['title']
    db.items.insert_item(vals)

def add_item2(db, game):
    vals = {
        'game_id' : game['id'],
    }
    vals['title'] = "%s Item 2" % game['title']
    vals['description'] = "The second item"
    db.items.insert_item(vals)

def add_item3(db, game):
    vals = {
        'game_id' : game['id'],
    }
    vals['title'] = "%s Item 3" % game['title']
    vals['description'] = "The third item for %s" % game['title']
    db.items.insert_item(vals)    

def add_items(db):
    games = get_games(db)
    for game in games:
        add_item1(db, game)
        add_item2(db, game)
        add_item3(db, game)

if __name__ == "__main__":
    db = Database()
    add_items(db)
    db.close()
