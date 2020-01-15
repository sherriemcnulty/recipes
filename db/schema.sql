USE j1v864fyr1mqktix;
DROP TABLE recipes;
DROP TABLE clients;
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