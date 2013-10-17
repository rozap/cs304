from managers import Manager, entity_list, entity_write, entity_single




class GameManager(Manager):


	@entity_list()
	def get_games(self, limit = 40, page = 0):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				id, title, price, description, developer, genre, image
			FROM
				game 
			LIMIT %s
			OFFSET %s

		""", (limit, limit*page))
		results = cursor.fetchall()
		return cursor, results

	@entity_single()
	def get_game(self, id):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				id, title, price, description, developer, genre, image
			FROM
				game 
			WHERE id = %s
		""", (id,))
		results = cursor.fetchall()
		return cursor, results


	@entity_single()
	def get_game_by_title(self, title):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				id, title, price, description, developer, genre, image
			FROM
				game 
			WHERE title = %s
		""", (title,))
		results = cursor.fetchall()
		return cursor, results

	@entity_write()
	def delete_game(self, id):
		cursor = self.db.cursor()
		cursor.execute("""
			DELETE 
			FROM
				game 
			WHERE id = %s
		""", (id,))
		return self.db, cursor

	@entity_write()
	def insert_game(self, vals):
		cursor = self.db.cursor()
		cursor.execute("""
			INSERT INTO game(title, price, description, developer, image, genre)
			VALUES(%s, %s, %s, %s, %s, %s)
			""", (
				vals['title'],
				vals['price'],
				vals['description'],
				vals['developer'],
				vals['image'],
				vals['genre']
				)
			)
		return self.db, cursor