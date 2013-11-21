from managers import Manager, entity_list, entity_write, entity_single
from datetime import datetime



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

    # Get the amount of users who have unlocked an achievement
    @entity_list()
    def get_amount_owners(self, title, game_id, user):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                count(user)
            FROM
                achievement_unlock
            WHERE achievement = %s AND game_id = %s
        """, (title, game_id))
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


    @entity_single()
    def has_achievement(self, username, title, game_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                count(*) as achievement_count
            FROM
                achievement_unlock
            WHERE achievement = %s AND game_id = %s AND user = %s
        """, (title, game_id, username))
        results = cursor.fetchall()
        return cursor, results


    @entity_write()
    def insert_achievement(self, vals):
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

    @entity_write()
    def unlock_achievement(self, vals):
        cursor = self.db.cursor()
        cursor.execute("""
            INSERT INTO achievement_unlock(date, achievement, game_id, user)
            VALUES(%s, %s, %s, %s)
            """, (
                datetime.now(),
                vals['achievement'],
                vals['game_id'],
                vals['user']
                )
            )
        return self.db, cursor
