from managers import Manager, entity_list, entity_write, entity_single
from datetime import datetime

class DiscussionManager(Manager):

    @entity_list()
    def get_discussions_for_game(self, game_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                id, game_id, username, title, body, date
            FROM
                discussion
            WHERE game_id = %s
        """, (game_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def get_discussion(self, discussion_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                id, game_id, username, title, body, date
            FROM
                discussion
            WHERE id = %s
        """, (discussion_id,))
        results = cursor.fetchall()
        return cursor, results


    @entity_write()
    def insert_discussion(self, vals):
        if not vals.get('date', False):
            vals['date'] = datetime.now()

        cursor = self.db.cursor()
        cursor.execute("""
            INSERT INTO discussion(game_id, username, title, body, date)
            VALUES(%s, %s, %s, %s, %s)
            """, (
                vals['game_id'],
                vals['username'],
                vals['title'],
                vals['body'],
                vals['date']
                )
            )
        return self.db, cursor


    @entity_list()
    def get_comments(self, discussion_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                id, discussion_id, username, body, date
            FROM
                comment
            WHERE discussion_id = %s
        """, (discussion_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def get_comment(self, c_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                id, discussion_id, username, body, date
            FROM
                comment
            WHERE id = %s
        """, (c_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_write()
    def insert_comment(self, vals):
        if not vals.get('date', False):
            vals['date'] = datetime.now()

        cursor = self.db.cursor()
        cursor.execute("""
            INSERT INTO comment(discussion_id, username, body, date)
            VALUES(%s, %s, %s, %s)
            """, (
                vals['discussion_id'],
                vals['username'],
                vals['body'],
                vals['date']
                )
            )
        return self.db, cursor