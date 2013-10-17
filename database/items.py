from managers import Manager, entity_list, entity_write, entity_single




class ItemManager(Manager):
	

	@entity_list()
	def get_game_items(self, game_id):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				game_id, title, description
			FROM
				item
			WHERE game_id = %s
		""", (game_id,))
		results = cursor.fetchall()
		return cursor, results
