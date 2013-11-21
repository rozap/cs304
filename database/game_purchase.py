from managers import Manager, entity_list, entity_write, entity_single
from datetime import datetime

class GamePurchaseManager(Manager):

    @entity_single()
    def get_game_purchase(self, vals):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT
                user as username, game as id
            FROM
                game_purchase
            WHERE
                user = %s AND
                game = %s
            """, (vals['username'], vals['game']))
        results = cursor.fetchall()
        return cursor, results

    @entity_write()
    def insert_game_purchase(self, vals):
        cursor = self.db.cursor()
        cursor.execute("""
            INSERT INTO
                game_purchase(user, game, date)
            VALUES(%s, %s, %s)
        """, (vals['username'], vals['game'], datetime.now()))
        results = cursor.fetchall()
        return self.db, cursor
