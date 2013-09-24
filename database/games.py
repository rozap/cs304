from managers import Manager, entity_list, entity_write, entity_single




class GameManager(Manager):


	@entity_list()
	def get_games(self):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				id, title, price, description, developer, genre
			FROM
				game 
		""")
		results = cursor.fetchall()
		return cursor, results

	@entity_single()
	def get_game(self, id):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				id, title, price, description, developer, genre
			FROM
				game 
			WHERE id = %s
		""", (id,))
		results = cursor.fetchall()
		return cursor, results

	@entity_write()
	def insert_game(self, vals):
		cursor = self.db.cursor()
		cursor.execute("""
			INSERT INTO game(title, price, description, developer, genre)
			VALUES(%s, %s, %s, %s, %s)
			""", (
				vals['title'],
				vals['price'],
				vals['description'],
				vals['developer'],
				vals['genre']
				)
			)
		return self.db, cursor