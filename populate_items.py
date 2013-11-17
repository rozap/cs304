from database import Database

def get_games(db):
    games = db.games.get_game_ids(limit=100000)
    return games


def add_item1(db, game_id):
    vals = {
        'game_id' : game_id,
    }
    vals['title'] = "Item 1"
    vals['description'] = "The first item"
    db.items.insert_item(vals)

def add_item2(db, game_id):
    vals = {
        'game_id' : game_id,
    }
    vals['title'] = "Item 2"
    vals['description'] = "The second item"
    db.items.insert_item(vals)

def add_item3(db, game_id):
    vals = {
        'game_id' : game_id,
    }
    vals['title'] = "Item 3"
    vals['description'] = "The third item"
    db.items.insert_item(vals)    

def add_items(db):
    games = get_games(db)
    for id in games:
        game_id = id['id']
        add_item1(db, game_id)
        add_item2(db, game_id)
        add_item3(db, game_id)

if __name__ == "__main__":
    db = Database()
    add_items(db)
    db.close()
