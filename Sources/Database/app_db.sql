-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Czas generowania: 28 Lis 2018, 09:50
-- Wersja serwera: 5.7.23
-- Wersja PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `app_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE IF NOT EXISTS `addresses` (
  `address_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `street` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `house_num` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  `apart_num` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  `city_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `city_id` (`city_id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `addresses`
--

INSERT INTO `addresses` (`address_id`, `street`, `house_num`, `apart_num`, `city_id`) VALUES
(8, 'Krakowskie Przedmieście', '48', '50', 2),
(7, 'Mikołowska', '100', '615', 1),
(6, 'Krakowska', '5665', '34abc', 4),
(9, 'Katowicka', '5', '7', 1),
(24, 'Zielonaaa', '5', '1', 5),
(23, 'Zielonkawa', '5', '10s', 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `albums`
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `album_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `album_spotify_id` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `artist_id` int(8) UNSIGNED DEFAULT NULL,
  `oslist_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`album_id`),
  KEY `artist_id` (`artist_id`),
  KEY `oslist_id` (`oslist_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `albums`
--

INSERT INTO `albums` (`album_id`, `album_spotify_id`, `name`, `release_date`, `artist_id`, `oslist_id`) VALUES
(1, NULL, 'Expectations', '2018-06-22 00:00:00', 1, 1),
(2, NULL, '÷', '2017-03-03 00:00:00', 2, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `article_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_polish_ci DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `author_id` int(8) UNSIGNED DEFAULT NULL,
  `text_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `author_id` (`author_id`),
  KEY `text_id` (`text_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `articles`
--

INSERT INTO `articles` (`article_id`, `title`, `create_date`, `author_id`, `text_id`) VALUES
(1, 'Lorem Ipsum', '2018-10-25 01:58:09', 1, 1),
(2, 'Lorem Ipsum2', '2018-10-25 01:58:09', 2, 2),
(50, 'Nowy artykułs', '2018-11-14 15:09:45', 2, 49),
(49, 'Nowy artykułs', '2018-11-14 15:09:44', 2, 49),
(48, 'Nowy artykułs', '2018-11-14 15:09:43', 2, 49),
(46, 'Nowy artykułs', '2018-11-09 13:30:20', 2, 49),
(47, 'Nowy artykułs', '2018-11-14 15:09:42', 2, 49);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `artists`
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE IF NOT EXISTS `artists` (
  `artist_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `artist_spotify_id` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `born_date` datetime DEFAULT NULL,
  `oslist_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`artist_id`),
  KEY `oslist_id` (`oslist_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `artists`
--

INSERT INTO `artists` (`artist_id`, `artist_spotify_id`, `name`, `born_date`, `oslist_id`) VALUES
(1, NULL, 'Bebe Rexha', '1989-08-30 00:00:00', 1),
(2, NULL, 'Ed Sheeran', '1991-02-17 00:00:00', 2),
(3, NULL, 'Corbyn Besson', '1998-11-25 00:00:00', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE IF NOT EXISTS `cities` (
  `city_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `city_name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`) VALUES
(1, 'Katowice'),
(2, 'Warszawa'),
(3, 'Kraków'),
(4, 'Gdynia'),
(5, 'Poznań');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_id` int(8) UNSIGNED DEFAULT NULL,
  `event_id` int(8) UNSIGNED DEFAULT NULL,
  `user_id` int(8) UNSIGNED DEFAULT NULL,
  `text` text COLLATE utf8_polish_ci,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `article_id` (`article_id`),
  KEY `event_id` (`event_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`comment_id`, `article_id`, `event_id`, `user_id`, `text`, `create_date`) VALUES
(1, 46, NULL, 12, 'Naprawde super artykul!\njhafsbdakhjfbdhijlafdsbkjladf\nah\nhda\nahf\nhf\nahdf\nfhad\nfhffdfhafhdfhad\nafh\nadfh\nadfh\nadfh\nadfh\nadfh\nadfh\nadfh\nafhddfhahdfhiodhjasbhijafsnadfsnaf\n', '2018-11-11 17:53:03'),
(3, 46, NULL, 14, 'Naprawde super artykul!\r\njhafsbdakhjfbdhijlafdsbkjladf\r\nah\r\nhda\r\nahf\r\nhf<br>\r\nahdf\r\nfhad\r\nfhffdfhafhdfhad\r\nafh\r\nadfh\r\nadfh\r\nadfh\r\nadfh\r\nadfh\r\nadfh\r\nadfh\r\nafhddfhahdfhiodhjasbhijafsnadfsnaf\r\n', '2018-11-11 17:58:30'),
(4, NULL, 13, 1, 'Hahahahaha', '2018-11-12 01:00:50'),
(5, NULL, 13, 2, 'Hahahahahaaassadadsads', '2018-11-12 01:01:03'),
(6, 50, NULL, 14, 'Naprawde super artykul!\njhafsbdakhjfbdhijlafdsbkjladf\nah\nhda\nahf\nhf\nahdf\nfhad\nfhffdfhafhdfhad\nafh\nadfh\nadfh\nadfh\nadfh\nadfh\nadfh\nadfh\nafhddfhahdfhiodhjasbhijafsnadfsnaf\n', '2018-11-15 01:05:51'),
(7, 50, NULL, 1, 'Naprawde super artykul!\njhafsbdakhjfbdhijlafdsbkjladf\nah\nhda\nahf\nhf\nahdf\nfhad\nfhffdfhafhdfhad\nafh\nadfh\nadfh\nadfh\nadfh\nadfh\nadfh\nadfh\nafhddfhahdfhiodhjasbhijafsnadfsnaf\n', '2018-11-15 01:05:55'),
(8, 50, NULL, 2, 'Naprawde super artykul!\njhafsbdakhjfbdhijlafdsbkjladf\nah\nhda\nahf\nhf\nahdf\nfhad\nfhffdfhafhdfhad\nafh\nadfh\nadfh\nadfh\nadfh\nadfh\nadfh\nadfh\nafhddfhahdfhiodhjasbhijafsnadfsnaf\n', '2018-11-15 01:05:57'),
(9, 50, NULL, 2, 'Dobra dobra, coś innego XD\nhahaha\nspacja\nenter \nXD', '2018-11-15 01:25:58'),
(10, 50, NULL, 20, 'cwcrwwewedwwde', '2018-11-19 14:15:40'),
(11, 50, NULL, 20, 'hahahaha nowy koment', '2018-11-19 14:16:15'),
(13, 49, NULL, 20, 'haha, pierwszy!', '2018-11-19 14:39:43'),
(15, 50, NULL, 20, 'assa', '2018-11-19 23:16:31'),
(16, 50, NULL, 20, 'dgfdfg', '2018-11-19 23:40:50'),
(22, 50, NULL, 30, 'sddfs\nd\nsd\nd\nd\nd', '2018-11-23 10:24:34'),
(21, NULL, 2, 30, 'xd', '2018-11-23 10:16:34');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `countries`
--

DROP TABLE IF EXISTS `countries`;
CREATE TABLE IF NOT EXISTS `countries` (
  `country_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `country_name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `countries`
--

INSERT INTO `countries` (`country_id`, `country_name`) VALUES
(1, 'Polska'),
(2, 'Niemcy'),
(3, 'Anglia'),
(4, 'USA'),
(5, 'Hiszpania');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `address_id` int(8) UNSIGNED DEFAULT NULL,
  `user_id` int(8) UNSIGNED DEFAULT NULL,
  `text_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `address_id` (`address_id`),
  KEY `user_id` (`user_id`),
  KEY `text_id` (`text_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `start_time`, `end_time`, `create_date`, `active`, `address_id`, `user_id`, `text_id`) VALUES
(1, 'Impreza u senatorów', '2018-11-21 14:00:00', '2018-11-22 05:00:00', '2018-10-25 01:58:09', b'1', 6, 1, 1),
(2, 'Impreza w COIGU', '2019-11-21 14:00:00', '2019-10-25 05:00:00', '2018-10-25 01:58:09', b'1', 7, 2, 2),
(14, 'Zabawa w chowanego', '2018-03-29 13:34:00', '2019-03-29 13:34:00', '2018-11-13 21:38:07', b'1', 24, 1, 62),
(13, 'Update Zabawa w Chowanego', '2019-01-01 00:00:00', '2019-01-01 05:00:00', '2018-11-12 00:31:42', b'1', 23, 1, 61);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `event_participants`
--

DROP TABLE IF EXISTS `event_participants`;
CREATE TABLE IF NOT EXISTS `event_participants` (
  `event_part_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_id` int(8) UNSIGNED DEFAULT NULL,
  `user_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`event_part_id`),
  KEY `event_id` (`event_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `event_participants`
--

INSERT INTO `event_participants` (`event_part_id`, `event_id`, `user_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 3),
(6, 2, 4),
(20, 14, 1),
(19, 13, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `genres`
--

DROP TABLE IF EXISTS `genres`;
CREATE TABLE IF NOT EXISTS `genres` (
  `genre_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `typ` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `genres`
--

INSERT INTO `genres` (`genre_id`, `typ`) VALUES
(1, 'Rock'),
(2, 'Pop'),
(3, 'Hip Hop'),
(4, 'Blues');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ordered_songs`
--

DROP TABLE IF EXISTS `ordered_songs`;
CREATE TABLE IF NOT EXISTS `ordered_songs` (
  `ordsongs_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `song_id` int(8) UNSIGNED DEFAULT NULL,
  `oslist_id` int(8) UNSIGNED DEFAULT NULL,
  `order_` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`ordsongs_id`),
  KEY `song_id` (`song_id`),
  KEY `oslist_id` (`oslist_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `ordered_songs`
--

INSERT INTO `ordered_songs` (`ordsongs_id`, `song_id`, `oslist_id`, `order_`) VALUES
(1, 1, 1, 2),
(2, 2, 1, 1),
(3, 3, 1, 3),
(4, 4, 2, 1),
(5, 6, 2, 3),
(6, 5, 2, 2),
(7, 1, 3, 3),
(8, 4, 3, 1),
(9, 6, 3, 4),
(10, 5, 3, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `photos`
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE IF NOT EXISTS `photos` (
  `photo_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `photo_path` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `article_id` int(8) UNSIGNED DEFAULT NULL,
  `event_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `article_id` (`article_id`),
  KEY `event_id` (`event_id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `photos`
--

INSERT INTO `photos` (`photo_id`, `photo_path`, `article_id`, `event_id`) VALUES
(37, 'E:\\Programming\\Projects\\Engineer_Thesis_Jakub_Pisula\\Sources\\Application\\api\\models\\..\\uploads\\Events\\11_ja.jpg', NULL, 11),
(36, 'E:\\Programming\\Projects\\Engineer_Thesis_Jakub_Pisula\\Sources\\Application\\api\\models\\..\\uploads\\Events\\4_ja.jpg', NULL, 4),
(39, 'E:\\Programming\\Projects\\Engineer_Thesis_Jakub_Pisula\\Sources\\Application\\api\\models\\..\\uploads\\Events\\13_ja.jpg', NULL, 13);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `playlists`
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE IF NOT EXISTS `playlists` (
  `playlist_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `playlist_spotify_id` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `oslist_id` int(8) UNSIGNED DEFAULT NULL,
  `user_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `oslist_id` (`oslist_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `playlists`
--

INSERT INTO `playlists` (`playlist_id`, `playlist_spotify_id`, `name`, `oslist_id`, `user_id`) VALUES
(1, NULL, 'Moja playlista adminowa', 3, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `events` bit(1) DEFAULT NULL,
  `articles` bit(1) DEFAULT NULL,
  `god` bit(1) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `events`, `articles`, `god`) VALUES
(1, 'Admin', b'1', b'1', b'1'),
(2, 'Journalist', b'0', b'1', b'0'),
(3, 'User', b'1', b'0', b'0');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songs`
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE IF NOT EXISTS `songs` (
  `song_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `song_spotify_id` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `title` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `artist_id` int(8) UNSIGNED DEFAULT NULL,
  `album_id` int(8) UNSIGNED DEFAULT NULL,
  `genre_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`song_id`),
  KEY `artist_id` (`artist_id`),
  KEY `album_id` (`album_id`),
  KEY `genre_id` (`genre_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `songs`
--

INSERT INTO `songs` (`song_id`, `song_spotify_id`, `title`, `release_date`, `artist_id`, `album_id`, `genre_id`) VALUES
(1, NULL, 'Ferrari', '2018-06-22 00:00:00', 1, 1, 2),
(2, NULL, 'I\'m a mess', '2018-06-22 00:00:00', 1, 1, 2),
(3, NULL, 'Mine', '2018-06-22 00:00:00', 1, 1, 2),
(4, NULL, 'Eraser', '2017-03-03 00:00:00', 2, 2, 2),
(5, NULL, 'Dive', '2017-03-03 00:00:00', 2, 2, 2),
(6, NULL, 'Shape of You', '2017-03-03 00:00:00', 2, 2, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `song_lists`
--

DROP TABLE IF EXISTS `song_lists`;
CREATE TABLE IF NOT EXISTS `song_lists` (
  `oslist_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`oslist_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `texts`
--

DROP TABLE IF EXISTS `texts`;
CREATE TABLE IF NOT EXISTS `texts` (
  `text_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` mediumtext COLLATE utf8_polish_ci,
  `text_short` mediumtext COLLATE utf8_polish_ci,
  PRIMARY KEY (`text_id`)
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `texts`
--

INSERT INTO `texts` (`text_id`, `text`, `text_short`) VALUES
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum ligula quis libero mollis malesuada. Suspendisse vitae dignissim quam. In eros dolor, dignissim a elementum et, congue a eros. Donec est odio, egestas id ultrices id, blandit sit amet nibh. Nullam at arcu odio. Aenean congue orci mi, ut vehicula sapien malesuada vitae. Etiam ut urna sem. Aliquam dapibus mollis eleifend. Phasellus enim velit, tincidunt ut nisl eget, cursus maximus dolor. Maecenas lacus neque, pretium non mi vitae, vestibulum congue turpis. Curabitur interdum laoreet turpis in venenatis. Integer consectetur aliquam enim, sit amet feugiat sem dictum at.\r\nAliquam erat volutpat. Nullam at pellentesque purus. Nulla facilisi. Quisque scelerisque eleifend orci, sit amet dapibus lectus sodales eu. Ut nec mi eget metus rutrum scelerisque et eu arcu. Pellentesque a vehicula nibh. Sed ligula quam, lacinia sed erat sit amet, tincidunt placerat velit. Nulla ut libero nec erat consectetur mattis vitae ut sem. Maecenas vel porta erat, ac faucibus dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras porta, enim a fermentum posuere, nulla nisi interdum sem, et convallis mi odio sit amet mauris. Phasellus molestie, nunc ac ultricies maximus, sem enim semper eros, nec vulputate sem erat id turpis. Fusce vitae magna ex. Nulla auctor mi vitae eros tempor, eget egestas mi mattis. Pellentesque ut facilisis arcu, non ultricies arcu.\r\nPraesent erat quam, ornare non ligula in, consequat feugiat sem. Aenean egestas nisi erat, ut ornare sem suscipit at. Cras eu mollis metus. Nam sit amet feugiat tortor, quis egestas nunc. Fusce lectus neque, semper a arcu vestibulum, cursus tristique libero. Proin euismod, ex vitae dictum eleifend, augue erat aliquet mauris, et fermentum tellus nisi ac sem. Pellentesque mattis accumsan convallis. Quisque facilisis lobortis tincidunt. Nulla ornare lorem vel sapien vulputate, vitae suscipit nisi viverra. Ut auctor ipsum urna, at tristique nibh sollicitudin eget. Vestibulum vitae aliquam sem. Sed vitae ligula non nibh suscipit volutpat.\r\nMorbi ut vulputate tellus. Phasellus sapien tellus, ornare interdum nunc ac, facilisis convallis justo. Pellentesque dignissim dapibus purus at finibus. In hac habitasse platea dictumst. Proin ac justo mattis, cursus risus pharetra, porttitor lectus. Proin non mattis dolor. Nulla magna nunc, mollis sed dictum ac, pulvinar quis elit. Sed malesuada erat vel ligula egestas, ut fermentum risus suscipit. Sed et leo leo. Curabitur blandit dolor vel eleifend viverra. Aenean consectetur auctor justo, hendrerit condimentum orci egestas in. Curabitur ac metus felis. Sed viverra quam dui, nec lacinia turpis vulputate quis.\r\nInteger venenatis est at arcu tempus vestibulum. Pellentesque fermentum mollis diam vitae aliquet. Proin efficitur, leo ut pellentesque vehicula, justo purus lobortis elit, nec tincidunt dui nulla vitae lectus. Mauris consectetur posuere tortor sed pellentesque. Vestibulum non varius sapien, a consectetur risus. Donec nec libero fringilla, condimentum odio sit amet, ullamcorper ante. Pellentesque euismod hendrerit rutrum. Curabitur sed ultrices nulla. Curabitur luctus blandit augue, malesuada blandit enim viverra ut. Proin tempus diam a tincidunt lacinia. Nam consequat vehicula justo a tempus. Duis lobortis, mauris ac gravida auctor, orci ipsum placerat sem, in imperdiet libero quam id enim.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum ligula quis libero mollis malesuada. Suspendisse vitae dignissim quam. In eros dolor, dignissim a elementum et, congue a eros. Donec est odio, egestas id ultrices id, blandit sit amet nibh. Nullam at arcu odio. Aenean congue orci mi, ut vehicula sapien malesuada vitae. Etiam ut urna sem. Aliquam dapibus mollis eleifend. Phasellus enim velit, tincidunt ut nisl eget, cursus maximus dolor. Maecenas lacus neque, pretium non mi vitae, vestibulum congue turpis. Curabitur interdum laoreet turpis in venenatis. Integer consectetur aliquam enim, sit amet feugiat sem dictum at.'),
(2, '22Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum ligula quis libero mollis malesuada. Suspendisse vitae dignissim quam. In eros dolor, dignissim a elementum et, congue a eros. Donec est odio, egestas id ultrices id, blandit sit amet nibh. Nullam at arcu odio. Aenean congue orci mi, ut vehicula sapien malesuada vitae. Etiam ut urna sem. Aliquam dapibus mollis eleifend. Phasellus enim velit, tincidunt ut nisl eget, cursus maximus dolor. Maecenas lacus neque, pretium non mi vitae, vestibulum congue turpis. Curabitur interdum laoreet turpis in venenatis. Integer consectetur aliquam enim, sit amet feugiat sem dictum at.\r\nAliquam erat volutpat. Nullam at pellentesque purus. Nulla facilisi. Quisque scelerisque eleifend orci, sit amet dapibus lectus sodales eu. Ut nec mi eget metus rutrum scelerisque et eu arcu. Pellentesque a vehicula nibh. Sed ligula quam, lacinia sed erat sit amet, tincidunt placerat velit. Nulla ut libero nec erat consectetur mattis vitae ut sem. Maecenas vel porta erat, ac faucibus dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras porta, enim a fermentum posuere, nulla nisi interdum sem, et convallis mi odio sit amet mauris. Phasellus molestie, nunc ac ultricies maximus, sem enim semper eros, nec vulputate sem erat id turpis. Fusce vitae magna ex. Nulla auctor mi vitae eros tempor, eget egestas mi mattis. Pellentesque ut facilisis arcu, non ultricies arcu.\r\nPraesent erat quam, ornare non ligula in, consequat feugiat sem. Aenean egestas nisi erat, ut ornare sem suscipit at. Cras eu mollis metus. Nam sit amet feugiat tortor, quis egestas nunc. Fusce lectus neque, semper a arcu vestibulum, cursus tristique libero. Proin euismod, ex vitae dictum eleifend, augue erat aliquet mauris, et fermentum tellus nisi ac sem. Pellentesque mattis accumsan convallis. Quisque facilisis lobortis tincidunt. Nulla ornare lorem vel sapien vulputate, vitae suscipit nisi viverra. Ut auctor ipsum urna, at tristique nibh sollicitudin eget. Vestibulum vitae aliquam sem. Sed vitae ligula non nibh suscipit volutpat.\r\nMorbi ut vulputate tellus. Phasellus sapien tellus, ornare interdum nunc ac, facilisis convallis justo. Pellentesque dignissim dapibus purus at finibus. In hac habitasse platea dictumst. Proin ac justo mattis, cursus risus pharetra, porttitor lectus. Proin non mattis dolor. Nulla magna nunc, mollis sed dictum ac, pulvinar quis elit. Sed malesuada erat vel ligula egestas, ut fermentum risus suscipit. Sed et leo leo. Curabitur blandit dolor vel eleifend viverra. Aenean consectetur auctor justo, hendrerit condimentum orci egestas in. Curabitur ac metus felis. Sed viverra quam dui, nec lacinia turpis vulputate quis.\r\nInteger venenatis est at arcu tempus vestibulum. Pellentesque fermentum mollis diam vitae aliquet. Proin efficitur, leo ut pellentesque vehicula, justo purus lobortis elit, nec tincidunt dui nulla vitae lectus. Mauris consectetur posuere tortor sed pellentesque. Vestibulum non varius sapien, a consectetur risus. Donec nec libero fringilla, condimentum odio sit amet, ullamcorper ante. Pellentesque euismod hendrerit rutrum. Curabitur sed ultrices nulla. Curabitur luctus blandit augue, malesuada blandit enim viverra ut. Proin tempus diam a tincidunt lacinia. Nam consequat vehicula justo a tempus. Duis lobortis, mauris ac gravida auctor, orci ipsum placerat sem, in imperdiet libero quam id enim.', '22Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum ligula quis libero mollis malesuada. Suspendisse vitae dignissim quam. In eros dolor, dignissim a elementum et, congue a eros. Donec est odio, egestas id ultrices id, blandit sit amet nibh. Nullam at arcu odio. Aenean congue orci mi, ut vehicula sapien malesuada vitae. Etiam ut urna sem. Aliquam dapibus mollis eleifend. Phasellus enim velit, tincidunt ut nisl eget, cursus maximus dolor. Maecenas lacus neque, pretium non mi vitae, vestibulum congue turpis. Curabitur interdum laoreet turpis in venenatis. Integer consectetur aliquam enim, sit amet feugiat sem dictum at.'),
(3, 'Event longtext', 'Event short text'),
(49, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.\n\nAenean accumsan eget risus eget pretium. Aenean auctor leo eget purus dapibus molestie. Duis eu lacus eu ante tincidunt pellentesque nec a quam. Aliquam erat volutpat. Morbi sagittis cursus nunc, at commodo nisl facilisis suscipit. Fusce metus ante, vehicula et iaculis eget, ornare nec ipsum. Aenean in lacus dui. Proin vitae tellus sit amet neque semper cursus ac et massa.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.'),
(61, 'Witam was na moim przyjeciu......', 'witam :)))))'),
(62, 'Witam was na moim przyjeciu.', 'witam :)'),
(63, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.\n\nAenean accumsan eget risus eget pretium. Aenean auctor leo eget purus dapibus molestie. Duis eu lacus eu ante tincidunt pellentesque nec a quam. Aliquam erat volutpat. Morbi sagittis cursus nunc, at commodo nisl facilisis suscipit. Fusce metus ante, vehicula et iaculis eget, ornare nec ipsum. Aenean in lacus dui. Proin vitae tellus sit amet neque semper cursus ac et massa.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.'),
(64, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.\n\nAenean accumsan eget risus eget pretium. Aenean auctor leo eget purus dapibus molestie. Duis eu lacus eu ante tincidunt pellentesque nec a quam. Aliquam erat volutpat. Morbi sagittis cursus nunc, at commodo nisl facilisis suscipit. Fusce metus ante, vehicula et iaculis eget, ornare nec ipsum. Aenean in lacus dui. Proin vitae tellus sit amet neque semper cursus ac et massa.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.'),
(65, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.\n\nAenean accumsan eget risus eget pretium. Aenean auctor leo eget purus dapibus molestie. Duis eu lacus eu ante tincidunt pellentesque nec a quam. Aliquam erat volutpat. Morbi sagittis cursus nunc, at commodo nisl facilisis suscipit. Fusce metus ante, vehicula et iaculis eget, ornare nec ipsum. Aenean in lacus dui. Proin vitae tellus sit amet neque semper cursus ac et massa.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.'),
(66, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.\n\nAenean accumsan eget risus eget pretium. Aenean auctor leo eget purus dapibus molestie. Duis eu lacus eu ante tincidunt pellentesque nec a quam. Aliquam erat volutpat. Morbi sagittis cursus nunc, at commodo nisl facilisis suscipit. Fusce metus ante, vehicula et iaculis eget, ornare nec ipsum. Aenean in lacus dui. Proin vitae tellus sit amet neque semper cursus ac et massa.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel mi mollis, tempus ante nec, congue elit. Etiam accumsan mauris et nisl mattis, auctor mollis libero rhoncus. Quisque laoreet eros eu massa dignissim, non laoreet urna tincidunt. Fusce a mollis sapien. Nullam facilisis tempus diam, at dictum turpis sodales ut. Cras porta placerat orci, ut congue nunc posuere nec. Proin blandit porttitor metus ut laoreet. Etiam quis dapibus purus.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `toplists`
--

DROP TABLE IF EXISTS `toplists`;
CREATE TABLE IF NOT EXISTS `toplists` (
  `toplist_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `oslist_id` int(8) UNSIGNED DEFAULT NULL,
  `genre_id` int(8) UNSIGNED DEFAULT NULL,
  `user_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`toplist_id`),
  KEY `oslist_id` (`oslist_id`),
  KEY `genre_id` (`genre_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `toplists`
--

INSERT INTO `toplists` (`toplist_id`, `name`, `oslist_id`, `genre_id`, `user_id`) VALUES
(1, 'Moja adminowa toplista', 3, 2, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_fb_id` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `user_spotify_id` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `login` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `password` char(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `email_validate` bit(1) NOT NULL,
  `age` int(2) DEFAULT NULL,
  `gender` char(1) COLLATE utf8_polish_ci DEFAULT NULL,
  `logged_in` bit(1) DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  `role_id` int(8) UNSIGNED DEFAULT NULL,
  `country_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  KEY `country_id` (`country_id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`user_id`, `user_fb_id`, `user_spotify_id`, `login`, `password`, `email`, `email_validate`, `age`, `gender`, `logged_in`, `registration_date`, `role_id`, `country_id`) VALUES
(21, NULL, NULL, 'abb', 'c64d3fcde20c5cd03142171e5ac47a87aa3c8ace', 'abb@abb.pl', b'0', 24, 'M', b'0', '2018-11-18 02:24:01', 2, 1),
(2, '', '', 'Kowalsky', '71e31eb20e81532b538f538c1fb372ec3a22388a', 'Kowalsky@Kowalsky.pl', b'1', 30, 'M', b'0', '2018-10-25 01:58:09', 2, 1),
(3, '', '', 'User1', 'fdd417966818209f6c8f66c37220fc33165811c2', 'User1@User1.com', b'0', 19, 'M', b'0', '2018-10-25 01:58:09', 3, 1),
(4, '', '', 'User2', 'e9cc031eb059fb518802c7b0932a1b62c670ff95', 'User2@User2.pl', b'1', 31, 'K', b'0', '2018-10-25 01:58:09', 3, 1),
(30, '2125886454112325', NULL, 'Kuba Pisula', NULL, 'jakub.pisula@wp.pl', b'1', 22, 'M', b'0', '2018-11-21 01:46:13', 3, 1),
(1, NULL, NULL, 'Admin', '2ec10e4f7cd2159e7ea65d2454f68287ecf81251', 'admin@admin.pl', b'1', 33, 'M', b'0', '2018-11-08 13:17:53', 1, 1),
(17, NULL, NULL, 'abec', '5fa39cedde9f53146f656677571f560407d30604', 'abec@abec.pl', b'0', 25, 'M', b'1', '2018-11-08 13:19:37', 3, 1),
(11, NULL, NULL, 'NewUser', 'b7d2612d1ab0ae6afe47c5d5d495edcc35b2846d', 'NewUser@NewUser.pl', b'0', 22, 'M', b'0', '2018-11-03 01:03:37', 3, 3),
(12, NULL, NULL, 'abc', 'a9993e364706816aba3e25717850c26c9cd0d89d', 'abc@abc.pl', b'0', 25, 'M', b'0', '2018-11-03 01:04:36', 3, 1),
(19, '32552433235225426634', NULL, 'Ferdek Kiepski', NULL, 'Ferdek@Kiepski.gmail.com', b'1', 50, 'M', b'1', '2018-11-17 18:41:56', 3, 1),
(14, NULL, NULL, 'adsasd', '930a0029225aa4c28b8ef095b679285eaae27078', 'asda@dsdsa.plp', b'0', 24, 'M', b'0', '2018-11-04 14:11:23', 3, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `votes`
--

DROP TABLE IF EXISTS `votes`;
CREATE TABLE IF NOT EXISTS `votes` (
  `votes_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `voting_id` int(8) UNSIGNED DEFAULT NULL,
  `voptions_id` int(8) UNSIGNED DEFAULT NULL,
  `user_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`votes_id`),
  KEY `voting_id` (`voting_id`),
  KEY `voptions_id` (`voptions_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `votes`
--

INSERT INTO `votes` (`votes_id`, `voting_id`, `voptions_id`, `user_id`) VALUES
(1, 1, 2, 1),
(2, 1, 2, 2),
(3, 1, 1, 4),
(4, 2, 4, 1),
(5, 2, 4, 3),
(6, 3, 7, 1),
(7, 3, 6, 4),
(8, 4, 8, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `votings`
--

DROP TABLE IF EXISTS `votings`;
CREATE TABLE IF NOT EXISTS `votings` (
  `voting_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `vtype_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`voting_id`),
  KEY `vtype_id` (`vtype_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `votings`
--

INSERT INTO `votings` (`voting_id`, `start_date`, `end_date`, `active`, `vtype_id`) VALUES
(1, '2018-10-01 00:00:00', '2018-10-31 00:00:00', b'1', 1),
(2, '2018-10-01 00:00:00', '2018-10-31 00:00:00', b'1', 2),
(3, '2018-09-01 00:00:00', '2018-09-30 00:00:00', b'0', 1),
(4, '2018-09-01 00:00:00', '2018-09-30 00:00:00', b'0', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `voting_options`
--

DROP TABLE IF EXISTS `voting_options`;
CREATE TABLE IF NOT EXISTS `voting_options` (
  `voptions_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `voting_id` int(8) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`voptions_id`),
  KEY `voting_id` (`voting_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `voting_options`
--

INSERT INTO `voting_options` (`voptions_id`, `name`, `voting_id`) VALUES
(1, 'Ed Sheeran', 1),
(2, 'Bebe Rexha', 1),
(3, 'Ed Sheeran - Shape of You', 2),
(4, 'Pharell Williams - Happy', 2),
(5, 'Why Don\'t We', 3),
(6, 'Adele', 3),
(7, 'Paweł Domagała', 3),
(8, 'Why Don\'t We - Trust Fund Baby', 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `voting_types`
--

DROP TABLE IF EXISTS `voting_types`;
CREATE TABLE IF NOT EXISTS `voting_types` (
  `vtype_id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`vtype_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `voting_types`
--

INSERT INTO `voting_types` (`vtype_id`, `name`) VALUES
(1, 'Artysta miesiąca'),
(2, 'Utwór dnia');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
