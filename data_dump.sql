-- MySQL dump 10.13  Distrib 5.5.32, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: vapour
-- ------------------------------------------------------
-- Server version	5.5.32-0ubuntu0.13.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievement`
--

DROP TABLE IF EXISTS `achievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `achievement` (
  `title` varchar(255) NOT NULL,
  `game_id` int(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`title`,`game_id`),
  KEY `achievement_ibfk_1` (`game_id`),
  CONSTRAINT `achievement_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievement`
--

LOCK TABLES `achievement` WRITE;
/*!40000 ALTER TABLE `achievement` DISABLE KEYS */;
INSERT INTO `achievement` VALUES ('Achievement 1',30,'The first achievement'),('Achievement 1',31,'The first achievement'),('Achievement 1',32,'The first achievement'),('Achievement 1',33,'The first achievement'),('Achievement 1',34,'The first achievement'),('Achievement 1',35,'The first achievement'),('Achievement 1',36,'The first achievement'),('Achievement 1',37,'The first achievement'),('Achievement 1',38,'The first achievement'),('Achievement 1',39,'The first achievement'),('Achievement 1',40,'The first achievement'),('Achievement 1',41,'The first achievement'),('Achievement 1',42,'The first achievement'),('Achievement 1',43,'The first achievement'),('Achievement 1',44,'The first achievement'),('Achievement 1',45,'The first achievement'),('Achievement 1',46,'The first achievement'),('Achievement 1',47,'The first achievement'),('Achievement 1',48,'The first achievement'),('Achievement 1',49,'The first achievement'),('Achievement 1',50,'The first achievement'),('Achievement 1',51,'The first achievement'),('Achievement 1',52,'The first achievement'),('Achievement 1',53,'The first achievement'),('Achievement 1',54,'The first achievement'),('Achievement 1',55,'The first achievement'),('Achievement 2',30,'The second achievement'),('Achievement 2',31,'The second achievement'),('Achievement 2',32,'The second achievement'),('Achievement 2',33,'The second achievement'),('Achievement 2',34,'The second achievement'),('Achievement 2',35,'The second achievement'),('Achievement 2',36,'The second achievement'),('Achievement 2',37,'The second achievement'),('Achievement 2',38,'The second achievement'),('Achievement 2',39,'The second achievement'),('Achievement 2',40,'The second achievement'),('Achievement 2',41,'The second achievement'),('Achievement 2',42,'The second achievement'),('Achievement 2',43,'The second achievement'),('Achievement 2',44,'The second achievement'),('Achievement 2',45,'The second achievement'),('Achievement 2',46,'The second achievement'),('Achievement 2',47,'The second achievement'),('Achievement 2',48,'The second achievement'),('Achievement 2',49,'The second achievement'),('Achievement 2',50,'The second achievement'),('Achievement 2',51,'The second achievement'),('Achievement 2',52,'The second achievement'),('Achievement 2',53,'The second achievement'),('Achievement 2',54,'The second achievement'),('Achievement 2',55,'The second achievement'),('Achievement 3',30,'The third achievement'),('Achievement 3',31,'The third achievement'),('Achievement 3',32,'The third achievement'),('Achievement 3',33,'The third achievement'),('Achievement 3',34,'The third achievement'),('Achievement 3',35,'The third achievement'),('Achievement 3',36,'The third achievement'),('Achievement 3',37,'The third achievement'),('Achievement 3',38,'The third achievement'),('Achievement 3',39,'The third achievement'),('Achievement 3',40,'The third achievement'),('Achievement 3',41,'The third achievement'),('Achievement 3',42,'The third achievement'),('Achievement 3',43,'The third achievement'),('Achievement 3',44,'The third achievement'),('Achievement 3',45,'The third achievement'),('Achievement 3',46,'The third achievement'),('Achievement 3',47,'The third achievement'),('Achievement 3',48,'The third achievement'),('Achievement 3',49,'The third achievement'),('Achievement 3',50,'The third achievement'),('Achievement 3',51,'The third achievement'),('Achievement 3',52,'The third achievement'),('Achievement 3',53,'The third achievement'),('Achievement 3',54,'The third achievement'),('Achievement 3',55,'The third achievement');
/*!40000 ALTER TABLE `achievement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `achievement_unlock`
--

DROP TABLE IF EXISTS `achievement_unlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `achievement_unlock` (
  `date` datetime DEFAULT NULL,
  `achievement` varchar(255) NOT NULL DEFAULT '',
  `game_id` int(50) NOT NULL DEFAULT '0',
  `user` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`achievement`,`game_id`,`user`),
  KEY `achievement_unlock_ibfk_2` (`game_id`),
  KEY `achievement_unlock_ibfk_3` (`user`),
  CONSTRAINT `achievement_unlock_ibfk_1` FOREIGN KEY (`achievement`) REFERENCES `achievement` (`title`),
  CONSTRAINT `achievement_unlock_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `achievement_unlock_ibfk_3` FOREIGN KEY (`user`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievement_unlock`
--

LOCK TABLES `achievement_unlock` WRITE;
/*!40000 ALTER TABLE `achievement_unlock` DISABLE KEYS */;
INSERT INTO `achievement_unlock` VALUES (NULL,'Achievement 1',50,'kylekyle'),(NULL,'Achievement 2',50,'kylekyle');
/*!40000 ALTER TABLE `achievement_unlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `body` text,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_ibfk_1` (`discussion_id`),
  KEY `comment_ibfk_3` (`username`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`discussion_id`) REFERENCES `discussion` (`id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,5,'kylekyle','adslfkalskdjf','2013-11-15 17:06:41'),(2,5,'kylekyle','adslfkalskdjf','2013-11-15 17:06:41'),(3,5,'kylekyle','laksdjflkw3j324','2013-11-15 17:06:55'),(4,5,'kylekyle','laksdjflkw3j324','2013-11-15 17:06:55'),(5,4,'onetwothree','fag','2013-11-19 15:24:14'),(6,4,'onetwothree','random','2013-11-19 15:24:20'),(7,6,'onetwothree','adfasdfasdf','2013-11-19 15:58:40'),(8,6,'test','weeeee','2013-11-19 15:59:33'),(9,6,'test','weeeee','2013-11-19 15:59:33');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion`
--

DROP TABLE IF EXISTS `discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discussion` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `game_id` int(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`game_id`),
  KEY `discussion_ibfk_1` (`game_id`),
  KEY `discussion_ibfk_2` (`username`),
  CONSTRAINT `discussion_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `discussion_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion`
--

LOCK TABLES `discussion` WRITE;
/*!40000 ALTER TABLE `discussion` DISABLE KEYS */;
INSERT INTO `discussion` VALUES (1,30,'yo',NULL,NULL,NULL),(3,31,'everythingiscool','test','test','2013-11-14 15:01:28'),(4,31,'kylekyle','test','test','2013-11-15 16:18:59'),(5,52,'kylekyle','bitches','yo','2013-11-15 17:06:34'),(6,32,'onetwothree','Test','testtsetaessdfkjalsdkfjlasdf','2013-11-19 15:58:35'),(7,50,'kylemalong','Hi','Hidhih','2013-11-19 21:58:35');
/*!40000 ALTER TABLE `discussion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `user_0` varchar(255) NOT NULL DEFAULT '',
  `user_1` varchar(255) NOT NULL DEFAULT '',
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_0`,`user_1`),
  KEY `friend_ibfk_2` (`user_1`),
  CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`user_0`) REFERENCES `user` (`username`),
  CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`user_1`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `title` varchar(511) DEFAULT NULL,
  `price` float(5,2) DEFAULT NULL,
  `description` text,
  `developer` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (30,'test',NULL,NULL,NULL,NULL,NULL),(31,'Alien Swarm',0.00,'Alien Swarm is a game and Source SDK release from a group of talented designers at Valve who were hired from the Mod community. Available free of charge, the game thrusts players into an epic bug hunt featuring a unique blend of co-op play and squad-level tactics. With your friends, form a squad of four distinct IAF Marine classes.','Valve','http://cdn4.steampowered.com/v/gfx/apps/630/header_292x136.jpg?t=1348009302','Action'),(32,'Half-Life: Source',9.99,'Winner of over 50 Game of the Year awards, Half-Life set new standards for action games when it was released in 1998. Half-Life: Source is a digitally remastered version of the critically acclaimed and best selling PC game, enhanced via Source technology to include physics simulation, enhanced effects, and more.','Valve','http://cdn4.steampowered.com/v/gfx/apps/280/header_292x136.jpg?t=1380558763','Action'),(33,'Dota 2',0.00,'Dota is a competitive game of action and strategy, played both professionally and casually by millions of passionate fans worldwide. Players pick from a pool of over a hundred heroes, forming two teams of five players.','','http://cdn4.steampowered.com/v/gfx/apps/570/header_292x136.jpg?t=1382637963','Action'),(34,'Half-Life 2',9.99,'1998. HALF-LIFE sends a shock through the game industry with its combination of pounding action and continuous, immersive storytelling. Valve\'s debut title wins more than 50 game-of-the-year awards on its way to being named \"Best PC Game Ever\" by PC Gamer, and launches a franchise with more than eight million retail units sold worldwide.','Valve','http://cdn4.steampowered.com/v/gfx/apps/220/header_292x136.jpg?t=1374613898','Action'),(35,'Counter-Strike',9.99,'Play the world\'s number 1 online action game. Engage in an incredibly realistic brand of terrorist warfare in this wildly popular team-based game. Ally with teammates to complete strategic missions. Take out enemy sites. Rescue hostages. Your role affects your team\'s success. Your team\'s success affects your role.','Valve','http://cdn4.steampowered.com/v/gfx/apps/10/header_292x136.jpg?t=1360355165','Action'),(36,'Half-Life',9.99,'Named Game of the Year by over 50 publications, Valve\'s debut title blends action and adventure with award-winning technology to create a frighteningly realistic world where players must think to survive. Also includes an exciting multiplayer mode that allows you to play against friends and enemies around the world.','Valve','http://cdn4.steampowered.com/v/gfx/apps/70/header_292x136.jpg?t=1360355165','Action'),(37,'Portal',19.99,'Portal&trade; is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay.','Valve','http://cdn4.steampowered.com/v/gfx/apps/400/header_292x136.jpg?t=1374685745','Action'),(38,'Counter-Strike: Condition Zero',9.99,'With its extensive Tour of Duty campaign, a near-limitless number of skirmish modes, updates and new content for Counter-Strike\'s award-winning multiplayer game play, plus over 12 bonus single player missions, Counter-Strike: Condition Zero is a tremendous offering of single and multiplayer content.','Valve','http://cdn4.steampowered.com/v/gfx/apps/80/header_292x136.jpg?t=1362608307','Action'),(39,'Left 4 Dead 2',19.99,'Set in the zombie apocalypse, Left 4 Dead 2 (L4D2) is the highly anticipated sequel to the award-winning Left 4 Dead, the #1 co-op game of 2008. This co-operative action horror FPS takes you and your friends through the cities, swamps and cemeteries of the Deep South, from Savannah to New Orleans across five expansive campaigns.','Valve','http://cdn4.steampowered.com/v/gfx/apps/550/header_292x136.jpg?t=1382642654','Action'),(40,'Portal 2',99.99,'Portal 2 draws from the award-winning formula of innovative gameplay, story, and music that earned the original Portal over 70 industry accolades and created a cult following. The single-player portion of Portal 2 introduces a cast of dynamic new characters, a host of fresh puzzle elements, and a much larger set of devious test chambers.','Developer:','http://cdn4.steampowered.com/v/gfx/apps/620/header_292x136.jpg?t=1382638717','Action'),(41,'Counter-Strike: Source',19.99,'THE NEXT INSTALLMENT OF THE WORLD\'S # 1 ONLINE ACTION GAME Counter-Strike: Source blends Counter-Strike\'s award-winning teamplay action with the advanced technology of Source&trade; technology. Featuring state of the art graphics, all new sounds, and introducing physics, Counter-Strike: Source is a must-have for every action gamer.','Valve','http://cdn4.steampowered.com/v/gfx/apps/240/header_292x136.jpg?t=1360273366','Action'),(42,'Half-Life: Opposing Force',4.99,'Return to the Black Mesa Research Facility as one of the military specialists assigned to eliminate Gordon Freeman. Experience an entirely new episode of single player action. Meet fierce alien opponents, and experiment with new weaponry. Named \'Game of the Year\' by the Academy of Interactive Arts and Sciences.','Gearbox Software','http://cdn4.steampowered.com/v/gfx/apps/50/header_292x136.jpg?t=1364932044','Action'),(43,'Ricochet',4.99,'A futuristic action game that challenges your agility as well as your aim, Ricochet features one-on-one and team matches played in a variety of futuristic battle arenas.','Valve','http://cdn4.steampowered.com/v/gfx/apps/60/header_292x136.jpg?t=1376051908','Action'),(44,'Half-Life 2: Lost Coast',39.99,'Originally planned as a section of the Highway 17 chapter of Half-Life 2, Lost Coast is a playable technology showcase that introduces High Dynamic Range lighting to the Source engine.','Valve','http://cdn4.steampowered.com/v/gfx/apps/340/header_292x136.jpg?t=1374509172','Action'),(45,'Half-Life Deathmatch: Source',9.99,'Half-Life Deathmatch: Source is a recreation of the first multiplayer game set in the Half-Life universe. Features all the classic weapons and most-played maps, now running on the Source engine.','Valve','http://cdn4.steampowered.com/v/gfx/apps/360/header_292x136.jpg?t=1380559184','Action'),(46,'Half-Life 2: Deathmatch',4.99,'Fast multiplayer action set in the Half-Life 2 universe! HL2\'s physics adds a new dimension to deathmatch play. Play straight deathmatch or try Combine vs. Resistance teamplay. Toss a toilet at your friend today!','Valve','http://cdn4.steampowered.com/v/gfx/apps/320/header_292x136.jpg?t=1374509605','Action'),(47,'Team Fortress Classic',4.99,'One of the most popular online action games of all time, Team Fortress Classic features over nine character classes -- from Medic to Spy to Demolition Man -- enlisted in a unique style of online team warfare. Each character class possesses unique weapons, items, and abilities, as teams compete online in a variety of game play modes.','Valve','http://cdn4.steampowered.com/v/gfx/apps/20/header_292x136.jpg?t=1364932044','Action'),(48,'Half-Life: Blue Shift',4.99,'Made by Gearbox Software and originally released in 2001 as an add-on to Half-Life, Blue Shift is a return to the Black Mesa Research Facility in which you play as Barney Calhoun, the security guard sidekick who helped Gordon out of so many sticky situations.','Gearbox Software','http://cdn4.steampowered.com/v/gfx/apps/130/header_292x136.jpg?t=1364932044','Action'),(49,'Deathmatch Classic',4.99,'Enjoy fast-paced multiplayer gaming with Deathmatch Classic (a.k.a. DMC). Valve\'s tribute to the work of id software, DMC invites players to grab their rocket launchers and put their reflexes to the test in a collection of futuristic settings.','Valve','http://cdn4.steampowered.com/v/gfx/apps/40/header_292x136.jpg?t=1364932044','Action'),(50,'Left 4 Dead',19.99,'From Valve (the creators of Counter-Strike, Half-Life and more) comes Left 4 Dead, a co-op action horror game for the PC and Xbox 360 that casts up to four players in an epic struggle for survival against swarming zombie hordes and terrifying mutant monsters.','Valve','http://cdn4.steampowered.com/v/gfx/apps/500/header_292x136.jpg?t=1382642531','Action'),(51,'Day of Defeat',4.99,'Enlist in an intense brand of Axis vs. Allied teamplay set in the WWII European Theatre of Operations. Players assume the role of light/assault/heavy infantry, sniper or machine-gunner class, each with a unique arsenal of historical weaponry at their disposal. Missions are based on key historical operations.','Valve','http://cdn4.steampowered.com/v/gfx/apps/30/header_292x136.jpg?t=1364932044','Action'),(52,'Half-Life 2: Episode Two',7.99,'Half-Life&reg; 2: Episode Two is the second in a trilogy of new games created by Valve that extends the award-winning and best-selling Half-Life&reg; adventure. As Dr. Gordon Freeman, you were last seen exiting City 17 with Alyx Vance as the Citadel erupted amidst a storm of unknown proportions.','Valve','http://cdn4.steampowered.com/v/gfx/apps/420/header_292x136.jpg?t=1374509404','Action'),(53,'Half-Life 2: Episode One',7.99,'Half-Life 2 has sold over 4 million copies worldwide, and earned over 35 Game of the Year Awards. Episode One is the first in a series of games that reveal the aftermath of Half-Life 2 and launch a journey beyond City 17. Also features two multiplayer games. Half-Life 2 not required.','Valve','http://cdn4.steampowered.com/v/gfx/apps/380/header_292x136.jpg?t=1374614012','Action'),(54,'Day of Defeat: Source',9.99,'Day of Defeat offers intense online action gameplay set in Europe during WWII. Assume the role of infantry, sniper or machine-gunner classes, and more. DoD:S features enhanced graphics and sounds design to leverage the power of Source, Valve\'s new engine technology.','Valve','http://cdn4.steampowered.com/v/gfx/apps/300/header_292x136.jpg?t=1381424224','Action'),(55,'Counter-Strike: Global Offensive',14.99,'Counter-Strike: Global Offensive (CS: GO) will expand upon the team-based action gameplay that it pioneered when it was launched 12 years ago. CS: GO features new maps, characters, and weapons and delivers updated versions of the classic CS content (de_dust, etc.).','Valve','http://cdn4.steampowered.com/v/gfx/apps/730/header_292x136.jpg?t=1382638559','Action');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_achievement`
--

DROP TABLE IF EXISTS `game_achievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_achievement` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `game_id` int(50) DEFAULT NULL,
  `achievement` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `game_id` (`game_id`),
  KEY `achievement` (`achievement`),
  CONSTRAINT `game_achievement_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `game_achievement_ibfk_2` FOREIGN KEY (`achievement`) REFERENCES `achievement` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_achievement`
--

LOCK TABLES `game_achievement` WRITE;
/*!40000 ALTER TABLE `game_achievement` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_achievement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_item`
--

DROP TABLE IF EXISTS `game_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_item` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `game_id` int(50) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `game_id` (`game_id`),
  KEY `item` (`item`),
  CONSTRAINT `game_item_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `game_item_ibfk_2` FOREIGN KEY (`item`) REFERENCES `item` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_item`
--

LOCK TABLES `game_item` WRITE;
/*!40000 ALTER TABLE `game_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_purchase`
--

DROP TABLE IF EXISTS `game_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_purchase` (
  `user` varchar(255) NOT NULL DEFAULT '',
  `game` int(50) NOT NULL DEFAULT '0',
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`user`,`game`),
  KEY `game_purchase_ibfk_1` (`game`),
  CONSTRAINT `game_purchase_ibfk_1` FOREIGN KEY (`game`) REFERENCES `game` (`id`),
  CONSTRAINT `game_purchase_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_purchase`
--

LOCK TABLES `game_purchase` WRITE;
/*!40000 ALTER TABLE `game_purchase` DISABLE KEYS */;
INSERT INTO `game_purchase` VALUES ('kyletest',31,'2013-11-21 11:22:02'),('kyletest',35,'2013-11-21 11:22:27'),('kyletest',39,'2013-11-21 11:22:54'),('kyletest',41,'2013-11-21 11:24:03'),('kyletest',42,'2013-11-21 11:16:56'),('kyletest',44,'2013-11-21 11:14:36'),('kyletest',45,'2013-11-21 11:23:18');
/*!40000 ALTER TABLE `game_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_members` (
  `id` int(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`username`),
  KEY `group_members_ibfk_2` (`username`),
  CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`id`) REFERENCES `group` (`id`),
  CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_members`
--

LOCK TABLES `group_members` WRITE;
/*!40000 ALTER TABLE `group_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `title` varchar(255) NOT NULL,
  `game_id` int(50) NOT NULL DEFAULT '0',
  `description` text,
  PRIMARY KEY (`title`,`game_id`),
  KEY `item_ibfk_1` (`game_id`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES ('Item 1',30,'The first item'),('Item 1',31,'The first item'),('Item 1',32,'The first item'),('Item 1',33,'The first item'),('Item 1',34,'The first item'),('Item 1',35,'The first item'),('Item 1',36,'The first item'),('Item 1',37,'The first item'),('Item 1',38,'The first item'),('Item 1',39,'The first item'),('Item 1',40,'The first item'),('Item 1',41,'The first item'),('Item 1',42,'The first item'),('Item 1',43,'The first item'),('Item 1',44,'The first item'),('Item 1',45,'The first item'),('Item 1',46,'The first item'),('Item 1',47,'The first item'),('Item 1',48,'The first item'),('Item 1',49,'The first item'),('Item 1',50,'The first item'),('Item 1',51,'The first item'),('Item 1',52,'The first item'),('Item 1',53,'The first item'),('Item 1',54,'The first item'),('Item 1',55,'The first item'),('Item 2',30,'The second item'),('Item 2',31,'The second item'),('Item 2',32,'The second item'),('Item 2',33,'The second item'),('Item 2',34,'The second item'),('Item 2',35,'The second item'),('Item 2',36,'The second item'),('Item 2',37,'The second item'),('Item 2',38,'The second item'),('Item 2',39,'The second item'),('Item 2',40,'The second item'),('Item 2',41,'The second item'),('Item 2',42,'The second item'),('Item 2',43,'The second item'),('Item 2',44,'The second item'),('Item 2',45,'The second item'),('Item 2',46,'The second item'),('Item 2',47,'The second item'),('Item 2',48,'The second item'),('Item 2',49,'The second item'),('Item 2',50,'The second item'),('Item 2',51,'The second item'),('Item 2',52,'The second item'),('Item 2',53,'The second item'),('Item 2',54,'The second item'),('Item 2',55,'The second item'),('Item 3',30,'The third item'),('Item 3',31,'The third item'),('Item 3',32,'The third item'),('Item 3',33,'The third item'),('Item 3',34,'The third item'),('Item 3',35,'The third item'),('Item 3',36,'The third item'),('Item 3',37,'The third item'),('Item 3',38,'The third item'),('Item 3',39,'The third item'),('Item 3',40,'The third item'),('Item 3',41,'The third item'),('Item 3',42,'The third item'),('Item 3',43,'The third item'),('Item 3',44,'The third item'),('Item 3',45,'The third item'),('Item 3',46,'The third item'),('Item 3',47,'The third item'),('Item 3',48,'The third item'),('Item 3',49,'The third item'),('Item 3',50,'The third item'),('Item 3',51,'The third item'),('Item 3',52,'The third item'),('Item 3',53,'The third item'),('Item 3',54,'The third item'),('Item 3',55,'The third item');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_unlock`
--

DROP TABLE IF EXISTS `item_unlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_unlock` (
  `date` datetime DEFAULT NULL,
  `item` varchar(255) NOT NULL DEFAULT '',
  `game_id` int(50) NOT NULL DEFAULT '0',
  `user` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`item`,`game_id`,`user`),
  KEY `item_unlock_ibfk_2` (`game_id`),
  KEY `item_unlock_ibfk_3` (`user`),
  CONSTRAINT `item_unlock_ibfk_1` FOREIGN KEY (`item`) REFERENCES `item` (`title`),
  CONSTRAINT `item_unlock_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `item_unlock_ibfk_3` FOREIGN KEY (`user`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_unlock`
--

LOCK TABLES `item_unlock` WRITE;
/*!40000 ALTER TABLE `item_unlock` DISABLE KEYS */;
INSERT INTO `item_unlock` VALUES (NULL,'Item 1',50,'kylekyle'),(NULL,'Item 2',50,'kylekyle'),(NULL,'Item 3',50,'kylekyle');
/*!40000 ALTER TABLE `item_unlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session` (
  `session_id` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user` (`user`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('795a2e5d-cea1-49c6-83ac-9b05a07f2e73',''),('8f6dc0ef-d9bd-469a-b8aa-cf855ab0e894',''),('edf0fa38-ecc3-4a82-a3e5-46e4efe6cd60',''),('f7a9c849-ffaa-4488-b119-0b907b663641','everythingiscool'),('13d68731-e924-4b23-8c43-78efcb470f73','kylekyle'),('ed4aa2e0-a9c9-4835-883a-d6516ccf48ca','kylekyle'),('91541318-055f-45e7-a553-732666c7e1a4','kylekyle1'),('b1942a9d-b30b-475f-930e-6bd591411e21','kylekyle2'),('27042d81-7b9d-4c50-af91-399c7da8a251','kylemalong'),('397e8110-a57e-4a43-b17d-5a64363a3c19','kylemalong'),('4de85146-f6de-45ce-a6e4-e41ebed01a8d','kylemalong'),('54f935fd-3fbc-45cd-ab09-8c37d296e13d','kylemalong'),('601120b6-8e31-4ae6-ab38-cd040ffbbc46','kylemalong'),('e1dcfc1d-8ce2-41e0-9f0a-037fa9c84df4','kylemalong'),('fb448177-2bf9-4e49-abd3-61f757c38531','kylemalong'),('16cd96bd-3474-454f-a429-ce4831f48a71','kyletest'),('83bd3c8c-4fc6-4346-81f0-c5406376e1ed','kyletest'),('96f69389-f4fb-454c-b61d-d5795ba7a318','kyletest'),('fc05383b-c6fd-4215-8cf3-87a562516a99','LORDGABEN'),('c1ada29c-0a11-4c60-b16a-673c4ef78467','onetwothree'),('45655c0c-dc68-45f4-bf4f-00e8d7004725','test'),('e1ecff9b-4eae-4d5e-99ee-63f1979b5001','test'),('f82a6974-2b4e-4773-b7c6-c8eb94d52a8e','test');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_banned` tinyint(1) DEFAULT NULL,
  `cc_num` varchar(255) DEFAULT NULL,
  `join_date` datetime DEFAULT NULL,
  `account_balance` int(10) DEFAULT NULL,
  `billing_address` varchar(511) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('','',NULL,NULL,NULL,NULL,NULL),('123','123',NULL,NULL,NULL,NULL,NULL),('128347239854u1oi4u1234','o3i4uo1324oi12u34oi123u4',NULL,NULL,'2013-11-14 12:57:09',NULL,NULL),('2542354352534254325234','5342352434525234534354',NULL,NULL,'2013-11-14 13:07:01',NULL,NULL),('2h12345o2i34u5','9183204192384098203948029384029384',NULL,NULL,'2013-11-14 13:08:49',NULL,NULL),('32423423566777','53234',NULL,NULL,NULL,NULL,NULL),('324252525234234','234234234',NULL,NULL,NULL,NULL,NULL),('adfasdf','erwer',NULL,NULL,NULL,NULL,NULL),('asudhfuehurh','uehrwer',NULL,NULL,NULL,NULL,NULL),('ekrjekjrkejrkejrkejrke','213',NULL,NULL,'2013-11-14 13:16:22',NULL,NULL),('ethkjhakjwelhjklwaerkhjlarwe','23j423jjlk234ljk234',NULL,NULL,'2013-11-14 12:58:10',NULL,NULL),('everythingiscool','cool',NULL,NULL,'2013-11-14 15:01:15',NULL,NULL),('kyle','kyle',NULL,NULL,NULL,NULL,NULL),('kylekyle','1',NULL,NULL,'2013-11-15 16:18:49',NULL,NULL),('kylekyle1','1',NULL,NULL,'2013-11-15 16:19:11',NULL,NULL),('kylekyle2','2',NULL,NULL,'2013-11-15 16:19:16',NULL,NULL),('kylemalong','kyle',NULL,NULL,'2013-11-14 13:40:55',NULL,NULL),('kylepdm','onetwothree',NULL,NULL,NULL,NULL,NULL),('kyletest','kyletest',NULL,NULL,'2013-11-21 11:03:36',NULL,NULL),('kyleumreueru','20390293',NULL,NULL,'2013-11-14 13:21:42',NULL,NULL),('laskejrlakesjrlaser','werwerasdfasdf',NULL,NULL,'2013-11-14 12:40:48',NULL,NULL),('lk2j3l1k2j3','311313',NULL,NULL,'2013-11-14 13:23:44',NULL,NULL),('lol','p',NULL,NULL,NULL,NULL,NULL),('LORDGABEN','gaben',NULL,NULL,'2013-11-20 14:12:40',NULL,NULL),('oewkrowekrowekr','okewr',NULL,NULL,NULL,NULL,NULL),('oewkrowekrowekr2','okewr',NULL,NULL,NULL,NULL,NULL),('onetwothree','onetwothree',NULL,NULL,'2013-11-18 18:35:59',NULL,NULL),('test','123',NULL,NULL,NULL,NULL,NULL),('test123123123','123123123123123123',NULL,NULL,NULL,NULL,NULL),('test4444444','4',NULL,NULL,NULL,NULL,NULL),('thrh4544656456456','2',NULL,NULL,NULL,NULL,NULL),('yo','',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-11-21 11:31:49
