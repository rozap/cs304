from managers import Manager, entity_list, entity_write, entity_single




class AchievementManager(Manager):
	
	@entity_list()
	def get_game_achievements(self, game_id):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				game_id, title, description
			FROM
				achievement
			WHERE game_id = %s
		""", (game_id,))
		results = cursor.fetchall()
		return cursor, results
