from managers import Manager, entity_list, entity_write, entity_single
from datetime import datetime



class UserManager(Manager):

	@entity_write()
	def insert_user(self, vals):
		print 'inserting user'
		cursor = self.db.cursor()
		cursor.execute("""
			INSERT INTO user(username, password, join_date)
			VALUES(%s, %s, %s)	
			""", (vals['username'], vals['password'], datetime.now()))
		return self.db, cursor

	@entity_single()
	def get_user_with_login(self, vals):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT u.username 
			FROM user u
			WHERE u.username = %s
			AND u.password = %s
			""", (vals['username'], vals['password']))
		results = cursor.fetchall()
		return cursor, results

	@entity_single()
	def get_user(self, vals):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT *
			FROM user u
			WHERE u.username = %s
			""", (vals['username'],))
		results = cursor.fetchall()
		return cursor, results

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
