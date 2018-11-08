DROP SCHEMA IF EXISTS 'APP_DB';
CREATE SCHEMA IF NOT EXISTS 'APP_DB' DEFAULT CHARACTER SET utf8_polish_ci;
USE 'APP_DB';

CREATE TABLE IF NOT EXISTS Voting_types (
vtype_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar(200),
PRIMARY KEY (vtype_id)
);

CREATE TABLE IF NOT EXISTS Votings (
voting_id int(8) unsigned NOT NULL AUTO_INCREMENT,
start_date datetime,
end_date datetime,
active bit,
vtype_id int(8) unsigned,
PRIMARY KEY (voting_id),
FOREIGN KEY (vtype_id) REFERENCES Voting_types(vtype_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Voting_options (
voptions_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar(200),
voting_id int(8) unsigned,
PRIMARY KEY (voptions_id),
FOREIGN KEY (voting_id) REFERENCES Votings(voting_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Votes (
votes_id int(8) unsigned NOT NULL AUTO_INCREMENT,
voting_id int(8) unsigned,
voptions_id int(8) unsigned,
user_id int(8) unsigned,
PRIMARY KEY (votes_id),
FOREIGN KEY (voting_id) REFERENCES Votings(voting_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (voptions_id) REFERENCES Voting_options(voptions_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Toplists (
toplist_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar(200),
oslist_id int(8) unsigned,
genre_id int(8) unsigned,
user_id int(8) unsigned,
PRIMARY KEY (toplist_id),
FOREIGN KEY (oslist_id) REFERENCES Ordered_song_lists(oslist_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Playlists (
playlist_id int(8) unsigned NOT NULL AUTO_INCREMENT,
playlist_spotify_id varchar(200),
name varchar(200),
oslist_id int(8) unsigned,
user_id int(8) unsigned,
PRIMARY KEY (playlist_id),
FOREIGN KEY (oslist_id) REFERENCES Ordered_song_lists(oslist_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS song_lists (
oslist_id int(8) unsigned NOT NULL AUTO_INCREMENT,
PRIMARY KEY (oslist_id)
);

CREATE TABLE IF NOT EXISTS ordered_songs (
ordsongs_id int(8) unsigned NOT NULL AUTO_INCREMENT,
song_id int(8) unsigned,
oslist_id int(8) unsigned,
order_ int unsigned,
PRIMARY KEY (ordsongs_id),
FOREIGN KEY (song_id) REFERENCES Songs(song_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (oslist_id) REFERENCES song_lists(oslist_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Genres (
genre_id int(8) unsigned NOT NULL AUTO_INCREMENT,
typ varchar(200),
PRIMARY KEY (genre_id)
);

CREATE TABLE IF NOT EXISTS Albums (
album_id int(8) unsigned NOT NULL AUTO_INCREMENT,
album_spotify_id varchar(200),
name varchar(200),
release_date datetime,
artist_id int(8) unsigned,
oslist_id int(8) unsigned,
PRIMARY KEY (album_id),
FOREIGN KEY (artist_id) REFERENCES Artists(artist_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (oslist_id) REFERENCES Ordered_song_lists(oslist_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Artists (
artist_id int(8) unsigned NOT NULL AUTO_INCREMENT,
artist_spotify_id varchar(200),
name varchar(200),
born_date datetime,
oslist_id int(8) unsigned,
PRIMARY KEY (artist_id),
FOREIGN KEY (oslist_id) REFERENCES Ordered_song_lists(oslist_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Songs (
song_id int(8) unsigned NOT NULL AUTO_INCREMENT,
song_spotify_id varchar(200),
title varchar(200),
release_date datetime,
artist_id int(8) unsigned,
album_id int(8) unsigned,
genre_id int(8) unsigned,
PRIMARY KEY (song_id),
FOREIGN KEY (artist_id) REFERENCES Artists(artist_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (album_id) REFERENCES Albums(album_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Roles (
role_id int(8) unsigned NOT NULL AUTO_INCREMENT,
role_name varchar(200),
events bit,
articles bit,
god bit,
PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS Countries (
country_id int(8) unsigned NOT NULL AUTO_INCREMENT,
country_name varchar(200),
PRIMARY KEY (country_id)
);

CREATE TABLE IF NOT EXISTS Users (
user_id int(8) unsigned NOT NULL AUTO_INCREMENT,
user_fb_id varchar(200),
user_spotify_id varchar(200),
login varchar(40),
password char(40),
email varchar(200),
email_validate bit,
age int(2),
sex char(1),
logged_in bit,
registration_date datetime,
role_id int(8) unsigned,
country_id int(8) unsigned,
PRIMARY KEY (user_id),
FOREIGN KEY (role_id) REFERENCES Roles(role_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (country_id) REFERENCES Countries(country_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Cities (
city_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar(200),
PRIMARY KEY (city_id)
);

CREATE TABLE IF NOT EXISTS Addresses (
address_id int(8) unsigned NOT NULL AUTO_INCREMENT,
street varchar(200),
house_num varchar(10),
apart_num varchar(10),
city_id int(8) unsigned,
PRIMARY KEY (address_id),
FOREIGN KEY (city_id) REFERENCES Cities(city_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Texts (
text_id int(8) unsigned NOT NULL AUTO_INCREMENT,
text text,
text_short text,
PRIMARY KEY (text_id)
);

CREATE TABLE IF NOT EXISTS Photos (
photo_id int(8) unsigned NOT NULL AUTO_INCREMENT,
photo_path varchar(200),
PRIMARY KEY (photo_id)
);

CREATE TABLE IF NOT EXISTS Modifications (
mod_id int(8) unsigned NOT NULL AUTO_INCREMENT,
user_id int(8) unsigned,
mod_date datetime,
PRIMARY KEY (mod_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Articles (
article_id int(8) unsigned NOT NULL AUTO_INCREMENT,
title varchar(50),
create_date datetime,
author_id int(8) unsigned,
photo_id int(8) unsigned,
text_id int(8) unsigned,
mod_id int(8) unsigned,
PRIMARY KEY (article_id),
FOREIGN KEY (author_id) REFERENCES Users(user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (photo_id) REFERENCES Photos(photo_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY (text_id) REFERENCES Texts(text_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY (mod_id) REFERENCES Modifications(mod_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Event_Participants (
event_part_id int(8) unsigned NOT NULL AUTO_INCREMENT,
event_id int(8) unsigned,
user_id int(8) unsigned,
PRIMARY KEY (event_part_id),
FOREIGN KEY (event_id) REFERENCES Events(event_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Comments (
comment_id int(8) unsigned NOT NULL AUTO_INCREMENT,
article_id int(8) unsigned,
event_id int(8) unsigned,
user_id int(8) unsigned,
text text,
PRIMARY KEY (comment_id),
FOREIGN KEY (article_id) REFERENCES Articles(article_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (event_id) REFERENCES Events(event_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Events (
event_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar(200),
start_time datetime,
end_time datetime,
create_date datetime,
address_id int(8) unsigned,
user_id int(8) unsigned,
photo_id int(8) unsigned,
text_id int(8) unsigned,
mod_id int(8) unsigned,
PRIMARY KEY (event_id),
FOREIGN KEY (address_id) REFERENCES Addresses(address_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION,
FOREIGN KEY (photo_id) REFERENCES Photos(photo_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY (text_id) REFERENCES Texts(text_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY (mod_id) REFERENCES Modifications(mod_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);