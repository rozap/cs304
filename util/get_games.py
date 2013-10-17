from database import Database
import json
from BeautifulSoup import BeautifulSoup
import re
import gevent
from gevent import pool, monkey; monkey.patch_all() 
import requests
from urllib2 import urlopen

class GameGetter(object):

    def __init__(self):
        self.db = Database(None)

    def get_games(self):
        games_resp = requests.get('http://api.steampowered.com/ISteamApps/GetAppList/v0001/')
        games_data = json.loads(games_resp.text)

        games = games_data['applist']['apps']['app']
        self.get_games_pages(games)


    def get_games_pages(self, games):
        thread_pool = pool.Pool(64)
        games = [g for g in games if not 'Trailer' in g['name'] and not 'Demo' in g['name']]
        for g in games:
            try:
                existing = self.db.games.get_game_by_title(g['name'])
                print '%s exists' % g['name']
            except:
                #Doesn't exist yet, go get it
                thread_pool.spawn(self.get_game_info, g['appid'], g['name'])






    def get_game_info(self, game_id, name):
        try:
            vals = {
                'title' : name,
            }
            print "Requesting...%s" % name
            url = 'http://store.steampowered.com/app/%s' % game_id
            page = urlopen(url).read()
            soup = BeautifulSoup(page)

            images = soup.findAll('img', attrs = {'class' : 'game_header_image'})
            if images:
                vals['image'] = images[0]['src']

            descriptions = soup.findAll('div', attrs = {'class' : 'game_description_snippet'})
            if descriptions:
                vals['description'] = descriptions[0].text

            details = soup.findAll('div', attrs = {'class' : 'details_block'})
            if details:
                details = details[0]
                children = details.contents

                vals['genre'] = children[7].text
                vals['developer'] = children[12].text

            prices = soup.findAll('div', attrs = {'class' : 'game_purchase_price price'})
            if prices:
                price = prices[0]
                groups = re.search('\d*\.\d*(?= USD)', price.text)
                if groups:
                    vals['price'] = float(groups.group(0))

            vals['price'] = vals.get('price', 0)
            vals['description'] = vals.get('description', '')

            if len(vals.keys()) == 6:
                self.db.games.insert_game(vals)
                print vals['title']
        except:
            pass

if __name__ == '__main__':
    gg = GameGetter()
    gg.get_games()
