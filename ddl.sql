CREATE TABLE `achievement` (
  `title` varchar(255) NOT NULL,
  `game_id` int(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`title`, `game_id`),
  CONSTRAINT `achievement_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `achievement_unlock` (
  `date` datetime DEFAULT NULL,
  `achievement` varchar(255) DEFAULT NULL,
  `game_id` int(50) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`achievement`, `game_id`, `user`),
  CONSTRAINT `achievement_unlock_ibfk_1` FOREIGN KEY (`achievement`) REFERENCES `achievement` (`title`),
  CONSTRAINT `achievement_unlock_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `achievement_unlock_ibfk_3` FOREIGN KEY (`user`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




CREATE TABLE `admin` (
  `username` varchar(255),
  PRIMARY KEY (`username`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




CREATE TABLE `comment` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `discussion_id` int(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `body` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id` ),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`discussion_id`) REFERENCES `discussion` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `discussion` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `game_id` int(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `discussion_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `discussion_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




CREATE TABLE `friend` (
  `user_0` varchar(255) DEFAULT NULL,
  `user_1` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_0`, `user_1`),
  CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`user_0`) REFERENCES `user` (`username`),
  CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`user_1`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




CREATE TABLE `game` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `title` varchar(511) UNIQUE DEFAULT NULL,
  `price` float(5,2) DEFAULT NULL,
  `description` text,
  `developer` varchar(255) DEFAULT NULL,
  `image` varchar(255),
  `genre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;



CREATE TABLE `game_purchase` (
  `user` varchar(255) DEFAULT NULL,
  `game` int(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`user`, `game`),
  CONSTRAINT `game_purchase_ibfk_1` FOREIGN KEY (`game`) REFERENCES `game` (`id`),
  CONSTRAINT `game_purchase_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




CREATE TABLE `item` (
  `title` varchar(255) NOT NULL,
  `game_id` int(50) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`title`, `game_id`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `item_unlock` (
  `date` datetime DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `game_id` int(50) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`item`, `game_id`, `user`),
  CONSTRAINT `item_unlock_ibfk_1` FOREIGN KEY (`item`) REFERENCES `item` (`title`),
  CONSTRAINT `item_unlock_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `item_unlock_ibfk_3` FOREIGN KEY (`user`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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
