import MySQLdb


from users import UserManager
from games import GameManager
from achievements import AchievementManager
from items import ItemManager 
from discussions import DiscussionManager
from sessions import SessionManager
from game_purchase import GamePurchaseManager

class Database(object):

    def __init__(self):
        self.db = MySQLdb.connect(
            host='localhost', # your host, usually localhost
            user='vapour', # your username
            passwd='vapour', # your password
            db='vapour') # name of the data base

        self.users = UserManager(self.db)
        self.games = GameManager(self.db)
        self.achievements = AchievementManager(self.db)
        self.items = ItemManager(self.db)
        self.discussions = DiscussionManager(self.db)
        self.sessions = SessionManager(self.db)
        self.game_purchase = GamePurchaseManager(self.db)


    def close(self):
        self.db.close()


