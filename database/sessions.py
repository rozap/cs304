from managers import Manager, entity_list, entity_write, entity_single

class SessionManager(Manager):

	@entity_list()
	def get_session_with_user(self, user):
		cursor = self.db.cursor()
		cursor.execute("""
			SELECT 
				session_id
			FROM
				session
			WHERE user = %s
		""", (user,))
		results = cursor.fetchall()
		return cursor, results

	@entity_write()
	def insert_session(self, vals):
		cursor = self.db.cursor();
		cursor.execute("""
				INSERT INTO session(session_id, user)
				VALUES(%s, %s)
			"""), (vals['session_id'], vals['username']))
		return self.db, cursor
