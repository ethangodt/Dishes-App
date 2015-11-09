DROP DATABASE dishes_db;

CREATE DATABASE dishes_db;

USE dishes_db;

CREATE TABLE recipes (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE ingredients (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  section varchar(255) DEFAULT 'other',
  PRIMARY KEY (id)
  -- todo change section to another table
);

CREATE TABLE r_i_join (
  r_id int NOT NULL,
  i_id int NOT NULL,
  quantity varchar(255),
  FOREIGN KEY (r_id) REFERENCES recipes(id),
  FOREIGN KEY (i_id) REFERENCES ingredients(id)
);

CREATE TABLE lists (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL, -- todo consider changing this to a db timestamp
  PRIMARY KEY (id)
);

CREATE TABLE l_i_join (
  l_id int NOT NULL,
  i_id int NOT NULL,
  quantity varchar(255),
  FOREIGN KEY (l_id) REFERENCES lists(id),
  FOREIGN KEY (i_id) REFERENCES ingredients(id)
);