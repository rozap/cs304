from managers import Manager, entity_list, entity_write, entity_single




class UserManager(Manager):
	
	@entity_list()
	def get_users(self):
		return []

	@entity_list()
	def get_games_users(self, game_id):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				u.username, u.is_banned, u.join_date, p.game
			FROM
				user u
			INNER JOIN game_purchase p
			ON p.user = u.username
			WHERE p.game = %s
		""", (game_id,))
		results = cursor.fetchall()
		return cursor, results
