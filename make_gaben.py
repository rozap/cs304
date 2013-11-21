from database import Database

def add_gaben(db):
	vals = {
		'username' : 'LORDGABEN',
		'password' : 'halflife3'
	}
	db.users.insert_user(vals)

if __name__ == "__main__":
    db = Database()
    add_gaben(db)
    giv_gaben_games(db)
    giv_gaben_items(db)
    giv_gaben_achievements(db)
    db.close()
