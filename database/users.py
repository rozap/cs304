from managers import Manager, entity_list, entity_write, entity_single
from datetime import datetime



class UserManager(Manager):

    @entity_single()
    def get_user(self, vals):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT u.username, u.is_banned, u.join_date, u.account_balance
            FROM user u
            WHERE u.username = %s
            """, (vals['username'],))
        results = cursor.fetchall()
        return cursor, results

    @entity_list()
    def get_users_with_all_games(self):
        cursor = self.db.cursor()
        cursor.execute(""" 
            SELECT  
                gp.user as username
            FROM 
                game_purchase gp 
            WHERE 
                gp.game IN (
                    SELECT 
                        id
                    FROM
                        game
                ) 
            GROUP BY
                username
            HAVING COUNT(*) = ( SELECT 
                                    COUNT(*) 
                                FROM
                                    game)
            """,)
        results = cursor.fetchall()
        return cursor, results

    @entity_list()
    def get_users_with_all_achievements(self):
        cursor = self.db.cursor()
        cursor.execute(""" 
            SELECT  
                au.user as username
            FROM 
                achievement_unlock au
            WHERE 
                au.achievement IN (
                    SELECT 
                        title
                    FROM
                        achievement
                ) 
            GROUP BY
                username
            HAVING COUNT(*) = ( SELECT 
                                    COUNT(*) 
                                FROM
                                    achievement)
            """,)
        results = cursor.fetchall()
        return cursor, results

    @entity_list()
    def get_users_with_all_items(self):
        cursor = self.db.cursor()
        cursor.execute(""" 
            SELECT  
                iu.user as username
            FROM 
                item_unlock iu
            WHERE 
                iu.item IN (
                    SELECT 
                        title
                    FROM
                        item
                ) 
            GROUP BY
                username
            HAVING COUNT(*) = ( SELECT 
                                    COUNT(*) 
                                FROM
                                    item)
            """,)
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def get_users_game_counts(self, order):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                p.user, COUNT(*) as num
            FROM 
                game_purchase
            GROUP BY 
                p.user
            ORDER BY
                p.user %s
            """, order)
        results = cursor.fetchall()
        return cursor, results


    @entity_list()
    def get_users(self):
        cursor = self.db.cursor()
        cursor.execute(""" 
            SELECT username
            FROM user
            ORDER BY username
            """,)
        results = cursor.fetchall()
        return cursor, results

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

    @entity_list()
    def get_games_users(self, game_id):
        print game_id
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

    @entity_list()
    def get_users_games(self, user_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT p.user, p.game, p.date, 
                g.title, g.price, g.description, g.developer,
                g.image, g.genre
            FROM
                game_purchase p
            INNER JOIN game g
                ON g.id = p.game
            WHERE 
                p.user = %s
            """, (user_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def get_users_games_count(self, user_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT COUNT(*)
            FROM
                game_purchase gp, game g
            WHERE 
                gp.user = %s AND
                g.id = gp.game
            """, (user_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_list()
    def get_users_achievements(self, user_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT a.title as achievement_title, a.description as achievement_description,
                au.user, au.game_id, au.date, 
                g.title, g.price, g.description, g.developer,
                g.image, g.genre
            FROM
                achievement a
            INNER JOIN achievement_unlock au
                ON a.title = au.achievement AND a.game_id = au.game_id
            INNER JOIN game g
                ON a.game_id = g.id
            WHERE
                au.user = %s
            ORDER BY au.date DESC
            """, (user_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def get_users_achievements_count(self, user_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT COUNT(*)
            FROM
                achievement_unlock au
            WHERE
                au.user = %s
            """, (user_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_list()
    def get_users_items(self, user_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT 
                u.date, u.item, u.game_id, u.user,
                g.title, g.price, g.description, g.developer,
                g.image, g.genre
            FROM
                item_unlock u 
            INNER JOIN
                game g
                ON
                    g.id = u.game_id
            WHERE
                u.user = %s
            ORDER BY u.date DESC
            """, (user_id,))
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def get_users_items_count(self, user_id):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT COUNT(*)
            FROM
                item_unlock iu
            WHERE
                iu.user = %s
            """, (user_id,))
        results = cursor.fetchall()
        return cursor, results
        
    @entity_single()
    def get_community_avg(self, table):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT
                AVG(num) as community_avg
            FROM 
                (
                    SELECT 
                        COUNT(*) as num
                    FROM 
                        %s
                    GROUP BY
                        user
                ) AS Community_AVG
        """% table)
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def get_community_min(self, table):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT
                MIN(num) as community_min
            FROM 
                (
                    SELECT 
                        COUNT(*) as num
                    FROM 
                        %s
                    GROUP BY
                        user
                ) AS Community_MIN
        """% table)
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def get_community_max(self, table):
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT
                MAX(num) as community_max
            FROM 
                (
                    SELECT 
                        COUNT(*) as num
                    FROM 
                        %s
                    GROUP BY
                        user
                ) AS Community_MAX
        """% table)
        results = cursor.fetchall()
        return cursor, results

    @entity_single()
    def check_for_users_not_owning(self,table):
        # We have to also check for users not owning anything for the minimum stuff.
        cursor = self.db.cursor()
        cursor.execute("""
            SELECT   
                count(username) as num_of_users
            FROM
                user
            WHERE username NOT IN 
                (
                    SELECT
                        user
                    FROM
                        %s
                )
            """% table)
        results = cursor.fetchall()
        return cursor, results 
