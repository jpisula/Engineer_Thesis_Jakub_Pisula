DROP SCHEMA IF EXISTS 'APP_DB';
CREATE SCHEMA IF NOT EXISTS 'APP_DB' DEFAULT CHARACTER SET utf8_polish_ci;
USE 'APP_DB';

CREATE TABLE Voting_types (
vtype_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar,
PRIMARY KEY (vtype_id)
);

CREATE TABLE Votings (
voting_id int(8) unsigned NOT NULL AUTO_INCREMENT,
start_date datetime,
end_date datetime,
active bit,
vtype_id int(8) unsigned,
PRIMARY KEY (voting_id),
FOREIGN KEY (vtype_id) REFERENCES Voting_types(vtype_id)
);

CREATE TABLE Voting_options (
voptions_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar,
voting_id int(8) unsigned,
PRIMARY KEY (voptions_id),
FOREIGN KEY (voting_id) REFERENCES Votings(voting_id)
);

CREATE TABLE Votes (
votes_id int(8) unsigned NOT NULL AUTO_INCREMENT,
voting_id int(8) unsigned,
voptions_id int(8) unsigned,
user_id int(8) unsigned,
PRIMARY KEY (votes_id),
FOREIGN KEY (voting_id) REFERENCES Votings(voting_id),
FOREIGN KEY (voptions_id) REFERENCES Voting_options(voptions_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Toplists (
toplist_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar,
oslist_id int(8) unsigned,
genre_id int(8) unsigned,
user_id int(8) unsigned,
PRIMARY KEY (toplist_id),
FOREIGN KEY (oslist_id) REFERENCES Ordered_song_lists(oslist_id),
FOREIGN KEY (genre_id) REFERENCES Genres(genre_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Playlists (
playlist_id int(8) unsigned NOT NULL AUTO_INCREMENT,
playlist_spotify_id varchar,
name varchar,
oslist_id int(8) unsigned,
user_id int(8) unsigned,
PRIMARY KEY (playlist_id),
FOREIGN KEY (oslist_id) REFERENCES Ordered_song_lists(oslist_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ordered_song_lists (
oslist_id int(8) unsigned NOT NULL AUTO_INCREMENT,
song_id int(8) unsigned,
order_ int unsigned,
PRIMARY KEY (oslist_id),
FOREIGN KEY (song_id) REFERENCES Songs(song_id)
);

CREATE TABLE Genres (
genre_id int(8) unsigned NOT NULL AUTO_INCREMENT,
typ varchar,
PRIMARY KEY (genre_id)
);

CREATE TABLE Albums (
album_id int(8) unsigned NOT NULL AUTO_INCREMENT,
album_spotify_id varchar,
name varchar,
artist_id int(8) unsigned,
oslist_id int(8) unsigned,
PRIMARY KEY (album_id),
FOREIGN KEY (artist_id) REFERENCES Artists(artist_id)
FOREIGN KEY (oslist_id) REFERENCES Ordered_song_lists(oslist_id)
);

CREATE TABLE Artists (
artist_id int(8) unsigned NOT NULL AUTO_INCREMENT,
artist_spotify_id varchar,
name varchar,
born_date datetime
oslist_id int(8) unsigned,
PRIMARY KEY (artist_id),
FOREIGN KEY (oslist_id) REFERENCES Ordered_song_lists(oslist_id)
);

CREATE TABLE Songs (
song_id int(8) unsigned NOT NULL AUTO_INCREMENT,
song_spotify_id varchar,
title varchar,
release_date datetime,
artist_id int(8) unsigned,
album_id int(8) unsigned,
genre_id int(8) unsigned,
PRIMARY KEY (song_id),
FOREIGN KEY (artist_id) REFERENCES Artists(artist_id),
FOREIGN KEY (album_id) REFERENCES Albums(album_id),
FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

CREATE TABLE Roles (
role_id int(8) unsigned NOT NULL AUTO_INCREMENT,
events bit,
articles bit,
god bit,
PRIMARY KEY (role_id)
);

CREATE TABLE Countries (
country_id int(8) unsigned NOT NULL AUTO_INCREMENT,
country_name varchar,
PRIMARY KEY (country_id)
);

CREATE TABLE Users (
user_id int(8) unsigned NOT NULL AUTO_INCREMENT,
user_fb_id varchar,
user_spotify_id varchar,
login varchar(40),
password char(40),
age int(2),
sex char(1),
logged_in bit,
registration_date datetime,
role_id int(8) unsigned,
country_id int(8) unsigned,
PRIMARY KEY (user_id),
FOREIGN KEY (role_id) REFERENCES Roles(role_id),
FOREIGN KEY (country_id) REFERENCES Countries(country_id)
);

CREATE TABLE Cities (
city_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar,
PRIMARY KEY (city_id)
);

CREATE TABLE Addresses (
address_id int(8) unsigned NOT NULL AUTO_INCREMENT,
street varchar,
house_num varchar,
apart_num varchar,
city_id int(8) unsigned,
PRIMARY KEY (address_id),
FOREIGN KEY (city_id) REFERENCES Cities(city_id)
);

CREATE TABLE Texts (
text_id int(8) unsigned NOT NULL AUTO_INCREMENT,
text text,
text_short text
PRIMARY KEY (text_id)
);

CREATE TABLE Photos (
photo_id int(8) unsigned NOT NULL AUTO_INCREMENT,
photo_path varchar,
PRIMARY KEY (photo_id)
);

CREATE TABLE Modifications (
mod_id int(8) unsigned NOT NULL AUTO_INCREMENT,
user_id int(8) unsigned,
mod_date datetime
PRIMARY KEY (mod_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Articles (
article_id int(8) unsigned NOT NULL AUTO_INCREMENT,
title varchar(50),
create_date datetime,
author_id int(8) unsigned,
photo_id int(8) unsigned,
text_id int(8) unsigned,
mod_id int(8) unsigned,
PRIMARY KEY (article_id),
FOREIGN KEY (author_id) REFERENCES Users(user_id),
FOREIGN KEY (photo_id) REFERENCES Photos(photo_id),
FOREIGN KEY (text_id) REFERENCES Texts(text_id),
FOREIGN KEY (mod_id) REFERENCES Modifications(mod_id)
);

CREATE TABLE Events (
event_id int(8) unsigned NOT NULL AUTO_INCREMENT,
name varchar,
start_time datetime,
end_time datetime,
create_date datetime,
address_id int(8) unsigned,
user_id int(8) unsigned,
photo_id int(8) unsigned,
text_id int(8) unsigned,
mod_id int(8) unsigned,
PRIMARY KEY (event_id),
FOREIGN KEY (address_id) REFERENCES Addresses(address_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id),
FOREIGN KEY (photo_id) REFERENCES Photos(photo_id),
FOREIGN KEY (text_id) REFERENCES Texts(text_id),
FOREIGN KEY (mod_id) REFERENCES Modifications(mod_id)
);