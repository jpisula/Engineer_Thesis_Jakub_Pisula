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

-- 