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

    @entity_single()
    def get_achievement(self, title, game_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                title, game_id, description
            FROM
                achievement 
            WHERE title = %s AND game_id = %s
        """, (title, game_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_write()
    def delete_achievement(self, title, game_id):
        cursor = self.db.cursor()
        cursor.execute("""
            DELETE 
            FROM
                achievement 
            WHERE title = %s AND game_id = %s
        """, (title, game_id,))
        return self.db, cursor

    @entity_write()
    def insert_achievment(self, vals):
        cursor = self.db.cursor()
        cursor.execute("""
            INSERT INTO achievement(title, game_id, description)
            VALUES(%s, %s, %s)
            """, (
                vals['title'],
                vals['game_id'],
                vals['description']
                )
            )
        return self.db, cursor