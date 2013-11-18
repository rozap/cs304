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

    @entity_single()
    def get_item(self, title, game_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                title, game_id, description
            FROM
                item 
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
                item_unlock
            WHERE item = %s AND game_id = %s
        """, (title, game_id))
        results = cursor.fetchall()
        return cursor, results

    @entity_write()
    def delete_item(self, title, game_id):
        cursor = self.db.cursor()
        cursor.execute("""
            DELETE 
            FROM
                item 
            WHERE title = %s AND game_id = %s
        """, (title, game_id,))
        return self.db, cursor

    @entity_write()
    def insert_item(self, vals):
        cursor = self.db.cursor()
        cursor.execute("""
            INSERT INTO item(title, game_id, description)
            VALUES(%s, %s, %s)
            """, (
                vals['title'],
                vals['game_id'],
                vals['description']
                )
            )
        return self.db, cursor
