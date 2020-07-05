CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	-- eaten BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
