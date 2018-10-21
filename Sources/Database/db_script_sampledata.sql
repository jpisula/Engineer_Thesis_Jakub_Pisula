USE 'APP_DB';

-- COUNTRIES
INSERT INTO Countries (country_name) VALUES ('Poland');
INSERT INTO Countries (country_name) VALUES ('Germany');
INSERT INTO Countries (country_name) VALUES ('England');
INSERT INTO Countries (country_name) VALUES ('USA');
INSERT INTO Countries (country_name) VALUES ('Spain');

-- ROLES
INSERT INTO Roles (role_name, events, articles, god) VALUES ('Admin', 1, 1, 1);
INSERT INTO Roles (role_name, events, articles, god) VALUES ('Journalist', 0, 1, 0);
INSERT INTO Roles (role_name, events, articles, god) VALUES ('User', 1, 0, 0);

-- USERS
INSERT INTO Users (user_fb_id, user_spotify_id, login, password, age, sex, logged_in, registration_date, role_id, country_id)
	VALUES ('', '', 'Admin', SHA1('Admin1'), 22, 'M', 0, NOW(), 1, 1);
	-- login: Admin
	-- password: Admin1
INSERT INTO Users (user_fb_id, user_spotify_id, login, password, age, sex, logged_in, registration_date, role_id, country_id)
	VALUES ('', '', 'Kowalsky', SHA1('Kowalska'), 30, 'M', 0, NOW(), 2, 1);
	-- login: Kowalsky
	-- password: Kowalska
INSERT INTO Users (user_fb_id, user_spotify_id, login, password, age, sex, logged_in, registration_date, role_id, country_id)
	VALUES ('', '', 'User1', SHA1('Userowy'), 19, 'M', 0, NOW(), 3, 1);
	-- login: User1
	-- password: Userowy	
INSERT INTO Users (user_fb_id, user_spotify_id, login, password, age, sex, logged_in, registration_date, role_id, country_id)
	VALUES ('', '', 'User2', SHA1('Userowa2'), 31, 'K', 0, NOW(), 3, 1);
	-- login: User2
	-- password: Userowa2	

-- TEXTS
INSERT INTO Texts (text, text_short) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum ligula quis libero mollis malesuada. Suspendisse vitae dignissim quam. In eros dolor, dignissim a elementum et, congue a eros. Donec est odio, egestas id ultrices id, blandit sit amet nibh. Nullam at arcu odio. Aenean congue orci mi, ut vehicula sapien malesuada vitae. Etiam ut urna sem. Aliquam dapibus mollis eleifend. Phasellus enim velit, tincidunt ut nisl eget, cursus maximus dolor. Maecenas lacus neque, pretium non mi vitae, vestibulum congue turpis. Curabitur interdum laoreet turpis in venenatis. Integer consectetur aliquam enim, sit amet feugiat sem dictum at.
Aliquam erat volutpat. Nullam at pellentesque purus. Nulla facilisi. Quisque scelerisque eleifend orci, sit amet dapibus lectus sodales eu. Ut nec mi eget metus rutrum scelerisque et eu arcu. Pellentesque a vehicula nibh. Sed ligula quam, lacinia sed erat sit amet, tincidunt placerat velit. Nulla ut libero nec erat consectetur mattis vitae ut sem. Maecenas vel porta erat, ac faucibus dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras porta, enim a fermentum posuere, nulla nisi interdum sem, et convallis mi odio sit amet mauris. Phasellus molestie, nunc ac ultricies maximus, sem enim semper eros, nec vulputate sem erat id turpis. Fusce vitae magna ex. Nulla auctor mi vitae eros tempor, eget egestas mi mattis. Pellentesque ut facilisis arcu, non ultricies arcu.
Praesent erat quam, ornare non ligula in, consequat feugiat sem. Aenean egestas nisi erat, ut ornare sem suscipit at. Cras eu mollis metus. Nam sit amet feugiat tortor, quis egestas nunc. Fusce lectus neque, semper a arcu vestibulum, cursus tristique libero. Proin euismod, ex vitae dictum eleifend, augue erat aliquet mauris, et fermentum tellus nisi ac sem. Pellentesque mattis accumsan convallis. Quisque facilisis lobortis tincidunt. Nulla ornare lorem vel sapien vulputate, vitae suscipit nisi viverra. Ut auctor ipsum urna, at tristique nibh sollicitudin eget. Vestibulum vitae aliquam sem. Sed vitae ligula non nibh suscipit volutpat.
Morbi ut vulputate tellus. Phasellus sapien tellus, ornare interdum nunc ac, facilisis convallis justo. Pellentesque dignissim dapibus purus at finibus. In hac habitasse platea dictumst. Proin ac justo mattis, cursus risus pharetra, porttitor lectus. Proin non mattis dolor. Nulla magna nunc, mollis sed dictum ac, pulvinar quis elit. Sed malesuada erat vel ligula egestas, ut fermentum risus suscipit. Sed et leo leo. Curabitur blandit dolor vel eleifend viverra. Aenean consectetur auctor justo, hendrerit condimentum orci egestas in. Curabitur ac metus felis. Sed viverra quam dui, nec lacinia turpis vulputate quis.
Integer venenatis est at arcu tempus vestibulum. Pellentesque fermentum mollis diam vitae aliquet. Proin efficitur, leo ut pellentesque vehicula, justo purus lobortis elit, nec tincidunt dui nulla vitae lectus. Mauris consectetur posuere tortor sed pellentesque. Vestibulum non varius sapien, a consectetur risus. Donec nec libero fringilla, condimentum odio sit amet, ullamcorper ante. Pellentesque euismod hendrerit rutrum. Curabitur sed ultrices nulla. Curabitur luctus blandit augue, malesuada blandit enim viverra ut. Proin tempus diam a tincidunt lacinia. Nam consequat vehicula justo a tempus. Duis lobortis, mauris ac gravida auctor, orci ipsum placerat sem, in imperdiet libero quam id enim.',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum ligula quis libero mollis malesuada. Suspendisse vitae dignissim quam. In eros dolor, dignissim a elementum et, congue a eros. Donec est odio, egestas id ultrices id, blandit sit amet nibh. Nullam at arcu odio. Aenean congue orci mi, ut vehicula sapien malesuada vitae. Etiam ut urna sem. Aliquam dapibus mollis eleifend. Phasellus enim velit, tincidunt ut nisl eget, cursus maximus dolor. Maecenas lacus neque, pretium non mi vitae, vestibulum congue turpis. Curabitur interdum laoreet turpis in venenatis. Integer consectetur aliquam enim, sit amet feugiat sem dictum at.');

INSERT INTO Texts (text, text_short) VALUES ('22Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum ligula quis libero mollis malesuada. Suspendisse vitae dignissim quam. In eros dolor, dignissim a elementum et, congue a eros. Donec est odio, egestas id ultrices id, blandit sit amet nibh. Nullam at arcu odio. Aenean congue orci mi, ut vehicula sapien malesuada vitae. Etiam ut urna sem. Aliquam dapibus mollis eleifend. Phasellus enim velit, tincidunt ut nisl eget, cursus maximus dolor. Maecenas lacus neque, pretium non mi vitae, vestibulum congue turpis. Curabitur interdum laoreet turpis in venenatis. Integer consectetur aliquam enim, sit amet feugiat sem dictum at.
Aliquam erat volutpat. Nullam at pellentesque purus. Nulla facilisi. Quisque scelerisque eleifend orci, sit amet dapibus lectus sodales eu. Ut nec mi eget metus rutrum scelerisque et eu arcu. Pellentesque a vehicula nibh. Sed ligula quam, lacinia sed erat sit amet, tincidunt placerat velit. Nulla ut libero nec erat consectetur mattis vitae ut sem. Maecenas vel porta erat, ac faucibus dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras porta, enim a fermentum posuere, nulla nisi interdum sem, et convallis mi odio sit amet mauris. Phasellus molestie, nunc ac ultricies maximus, sem enim semper eros, nec vulputate sem erat id turpis. Fusce vitae magna ex. Nulla auctor mi vitae eros tempor, eget egestas mi mattis. Pellentesque ut facilisis arcu, non ultricies arcu.
Praesent erat quam, ornare non ligula in, consequat feugiat sem. Aenean egestas nisi erat, ut ornare sem suscipit at. Cras eu mollis metus. Nam sit amet feugiat tortor, quis egestas nunc. Fusce lectus neque, semper a arcu vestibulum, cursus tristique libero. Proin euismod, ex vitae dictum eleifend, augue erat aliquet mauris, et fermentum tellus nisi ac sem. Pellentesque mattis accumsan convallis. Quisque facilisis lobortis tincidunt. Nulla ornare lorem vel sapien vulputate, vitae suscipit nisi viverra. Ut auctor ipsum urna, at tristique nibh sollicitudin eget. Vestibulum vitae aliquam sem. Sed vitae ligula non nibh suscipit volutpat.
Morbi ut vulputate tellus. Phasellus sapien tellus, ornare interdum nunc ac, facilisis convallis justo. Pellentesque dignissim dapibus purus at finibus. In hac habitasse platea dictumst. Proin ac justo mattis, cursus risus pharetra, porttitor lectus. Proin non mattis dolor. Nulla magna nunc, mollis sed dictum ac, pulvinar quis elit. Sed malesuada erat vel ligula egestas, ut fermentum risus suscipit. Sed et leo leo. Curabitur blandit dolor vel eleifend viverra. Aenean consectetur auctor justo, hendrerit condimentum orci egestas in. Curabitur ac metus felis. Sed viverra quam dui, nec lacinia turpis vulputate quis.
Integer venenatis est at arcu tempus vestibulum. Pellentesque fermentum mollis diam vitae aliquet. Proin efficitur, leo ut pellentesque vehicula, justo purus lobortis elit, nec tincidunt dui nulla vitae lectus. Mauris consectetur posuere tortor sed pellentesque. Vestibulum non varius sapien, a consectetur risus. Donec nec libero fringilla, condimentum odio sit amet, ullamcorper ante. Pellentesque euismod hendrerit rutrum. Curabitur sed ultrices nulla. Curabitur luctus blandit augue, malesuada blandit enim viverra ut. Proin tempus diam a tincidunt lacinia. Nam consequat vehicula justo a tempus. Duis lobortis, mauris ac gravida auctor, orci ipsum placerat sem, in imperdiet libero quam id enim.',
'22Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum ligula quis libero mollis malesuada. Suspendisse vitae dignissim quam. In eros dolor, dignissim a elementum et, congue a eros. Donec est odio, egestas id ultrices id, blandit sit amet nibh. Nullam at arcu odio. Aenean congue orci mi, ut vehicula sapien malesuada vitae. Etiam ut urna sem. Aliquam dapibus mollis eleifend. Phasellus enim velit, tincidunt ut nisl eget, cursus maximus dolor. Maecenas lacus neque, pretium non mi vitae, vestibulum congue turpis. Curabitur interdum laoreet turpis in venenatis. Integer consectetur aliquam enim, sit amet feugiat sem dictum at.');

INSERT INTO Texts (text, text_short) VALUES ('Event longtext', 'Event short text');
-- ARTICLES
INSERT INTO Articles (title, create_date, author_id, text_id) VALUES ('Lorem Ipsum', NOW(), 1, 1);
INSERT INTO Articles (title, create_date, author_id, text_id) VALUES ('Lorem Ipsum2', NOW(), 2, 2);

-- CITIES
INSERT INTO Cities (name) VALUES ('Katowice');
INSERT INTO Cities (name) VALUES ('Warszawa');
INSERT INTO Cities (name) VALUES ('Kraków');
INSERT INTO Cities (name) VALUES ('Gdynia');

-- ADDRESSES
INSERT INTO Addresses (street, house_num, apart_num, city_id) VALUES ('Piastów', '10b', NULL, 1);
INSERT INTO Addresses (street, house_num, apart_num, city_id) VALUES ('Mikołowska', '100', '615', 1);
INSERT INTO Addresses (street, house_num, apart_num, city_id) VALUES ('Krakowskie Przedmieście', '48', '50', 2);
INSERT INTO Addresses (street, house_num, apart_num, city_id) VALUES ('Wawel', '5', '1', 3);

-- EVENTS
INSERT INTO Events (name, start_time, end_time, create_date, address_id, user_id, photo_id, text_id, mod_id) 
	VALUES ('Impreza u senatorów', '2018-11-21 14:00:00', '2018-11-22 05:00:00', NOW(), 3, 1, NULL, 1, NULL);
	
INSERT INTO Events (name, start_time, end_time, create_date, address_id, user_id, photo_id, text_id, mod_id) 
	VALUES ('Impreza w COIGU', '2019-11-21 14:00:00', '2019-10-25 05:00:00', NOW(), 2, 2, NULL, 2, NULL);

-- EVENT PARTICIPANTS
INSERT INTO Event_participants (event_id, user_id) VALUES (1, 1);
INSERT INTO Event_participants (event_id, user_id) VALUES (1, 2);
INSERT INTO Event_participants (event_id, user_id) VALUES (1, 3);
INSERT INTO Event_participants (event_id, user_id) VALUES (1, 4);
INSERT INTO Event_participants (event_id, user_id) VALUES (2, 3);
INSERT INTO Event_participants (event_id, user_id) VALUES (2, 4);

-- GENRES
INSERT INTO Genres (typ) VALUES ('Rock');
INSERT INTO Genres (typ) VALUES ('Pop');
INSERT INTO Genres (typ) VALUES ('Hip Hop');
INSERT INTO Genres (typ) VALUES ('Blues');

-- ARTISTS
INSERT INTO Artists (artist_spotify_id, name, born_date, oslist_id) VALUES (NULL, 'Bebe Rexha', '1989-08-30', 1);
INSERT INTO Artists (artist_spotify_id, name, born_date, oslist_id) VALUES (NULL, 'Ed Sheeran', '1991-02-17', 2);
INSERT INTO Artists (artist_spotify_id, name, born_date, oslist_id) VALUES (NULL, 'Corbyn Besson', '1998-11-25', 3);

-- ALMBUMS
INSERT INTO Albums (album_spotify_id, name, release_date, artist_id, oslist_id) VALUES (NULL, 'Expectations', '2018-06-22', 1, 1);
INSERT INTO Albums (album_spotify_id, name, release_date, artist_id, oslist_id) VALUES (NULL, '÷', '2017-03-03', 2, 2);

-- SONGS
INSERT INTO Songs (song_spotify_id, title, release_date, artist_id, album_id, genre_id)
	VALUES (NULL, 'Ferrari', '2018-06-22', 1, 1, 2);
INSERT INTO Songs (song_spotify_id, title, release_date, artist_id, album_id, genre_id)
	VALUES (NULL, 'I\'m a mess', '2018-06-22', 1, 1, 2);
INSERT INTO Songs (song_spotify_id, title, release_date, artist_id, album_id, genre_id)
	VALUES (NULL, 'Mine', '2018-06-22', 1, 1, 2);
INSERT INTO Songs (song_spotify_id, title, release_date, artist_id, album_id, genre_id)
	VALUES (NULL, 'Eraser', '2017-03-03', 2, 2, 2);
INSERT INTO Songs (song_spotify_id, title, release_date, artist_id, album_id, genre_id)
	VALUES (NULL, 'Dive', '2017-03-03', 2, 2, 2);
INSERT INTO Songs (song_spotify_id, title, release_date, artist_id, album_id, genre_id)
	VALUES (NULL, 'Shape of You', '2017-03-03', 2, 2, 2);
	
-- ORDERED_SONGS
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (1, 1, 2);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (2, 1, 1);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (3, 1, 3);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (4, 2, 1);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (6, 2, 3);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (5, 2, 2);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (1, 3, 3);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (4, 3, 1);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (6, 3, 4);
INSERT INTO Ordered_songs (song_id, oslist_id, order_) VALUES (5, 3, 2);

-- PLAYLISTS
INSERT INTO Playlists (playlist_spotify_id, name, oslist_id, user_id) VALUES (NULL, 'Moja playlista adminowa', 3, 1);

-- TOPLISTS
INSERT INTO Toplists (name, oslist_id, genre_id, user_id) VALUES ('Moja adminowa toplista', 3, 2, 1);

-- VOTING TYPES
INSERT INTO Voting_types (name) VALUES ('Artysta miesiąca');
INSERT INTO Voting_types (name) VALUES ('Utwór dnia');

-- VOTINGS
INSERT INTO Votings (start_date, end_date, active, vtype_id) VALUES ('2018-10-01', '2018-10-31', 1, 1);
INSERT INTO Votings (start_date, end_date, active, vtype_id) VALUES ('2018-10-01', '2018-10-31', 1, 2);
INSERT INTO Votings (start_date, end_date, active, vtype_id) VALUES ('2018-09-01', '2018-09-30', 0, 1);
INSERT INTO Votings (start_date, end_date, active, vtype_id) VALUES ('2018-09-01', '2018-09-30', 0, 2);

-- VOTING OPTIONS
INSERT INTO Voting_options (name, voting_id) VALUES ('Ed Sheeran',1);
INSERT INTO Voting_options (name, voting_id) VALUES ('Bebe Rexha',1);
INSERT INTO Voting_options (name, voting_id) VALUES ('Ed Sheeran - Shape of You',2);
INSERT INTO Voting_options (name, voting_id) VALUES ('Pharell Williams - Happy',2);
INSERT INTO Voting_options (name, voting_id) VALUES ('Why Don\'t We',3);
INSERT INTO Voting_options (name, voting_id) VALUES ('Adele',3);
INSERT INTO Voting_options (name, voting_id) VALUES ('Paweł Domagała',3);
INSERT INTO Voting_options (name, voting_id) VALUES ('Why Don\'t We - Trust Fund Baby',4);

-- Votes
INSERT INTO Votes (voting_id, voptions_id, user_id) VALUES (1, 2, 1);
INSERT INTO Votes (voting_id, voptions_id, user_id) VALUES (1, 2, 2);
INSERT INTO Votes (voting_id, voptions_id, user_id) VALUES (1, 1, 4);
INSERT INTO Votes (voting_id, voptions_id, user_id) VALUES (2, 4, 1);
INSERT INTO Votes (voting_id, voptions_id, user_id) VALUES (2, 4, 3);
INSERT INTO Votes (voting_id, voptions_id, user_id) VALUES (3, 7, 1);
INSERT INTO Votes (voting_id, voptions_id, user_id) VALUES (3, 6, 4);
INSERT INTO Votes (voting_id, voptions_id, user_id) VALUES (4, 8, 1);