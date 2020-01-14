CREATE DATABASE recipes_db;
USE recipesDB;

CREATE TABLE recipes
(
    id INT NOT NULL
    AUTO_INCREMENT,
	photo LONGBLOB NULL,
	title VARCHAR
    (100) NOT NULL,
	prep_time INT NOT NULL,
    servings INT NOT NULL,
	ingredients VARCHAR
    (255) NOT NULL,
	directions LONGTEXT NOT NULL,
    PRIMARY KEY
    (id)
);

    -- The client table will be used when login authentication is implemented
    CREATE TABLE clients
    (
        id int NOT NULL
        AUTO_INCREMENT,
	client VARCHAR
        (50) NOT NULL,
    pwd  CHAR
        (60),
	PRIMARY KEY
        (id)
);


