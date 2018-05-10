DROP DATABASE IF EXISTS tonersales;
CREATE DATABASE tonersales;
USE tonersales;

CREATE TABLE Globals (
    Name VARCHAR(255),
    Value VARCHAR(255)
);


CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    googleId VARCHAR(255),
    facebookId VARCHAR(255),
    token VARCHAR(255),
    role TINYINT(4),
    PRIMARY KEY(id)
);

CREATE TABLE Products (
	id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    price int,
    PRIMARY KEY(id)
    

);


CREATE TABLE Payment_method (
    id int NOT NULL AUTO_INCREMENT,
    description VARCHAR(255),
    PRIMARY KEY(id)
    
);


CREATE TABLE Shipping_method (
    id int NOT NULL AUTO_INCREMENT,
    description VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE Orders (
    id int NOT NULL AUTO_INCREMENT,
    shipping_id int,
    userId int,
    payment_meth_id int,
    PRIMARY KEY(id),
    FOREIGN KEY (shipping_id) REFERENCES Shipping_method(id),
    FOREIGN KEY (payment_meth_id) REFERENCES Payment_method(id),
    FOREIGN KEY (userId) REFERENCES Users(id)

);


CREATE TABLE Order_Products (
	product_id int,
	order_id int,
	FOREIGN KEY (product_id) REFERENCES Products(id),
	FOREIGN KEY (order_id) REFERENCES Orders(id)
);


INSERT INTO Users (id,username,email,password)
VALUES (1, 'admin', 'kwnstantinosxoinas@hotmail.gr', '$2a$10$peAQMFu9FSLJUT8HTnjUJu7l.lSBFFNvtTr2w.7S7..refdlZ3JAG');
INSERT INTO Users (id,username,email,password)
VALUES (2, 'nikatlas', 'nikatlas@gmail.com', '$2a$10$peAQMFu9FSLJUT8HTnjUJu7l.lSBFFNvtTr2w.7S7..refdlZ3JAG');



INSERT INTO Products (name,description,price)
VALUES ('purple toner','jp',20);

INSERT INTO Products (name,description,price)
VALUES ('diamond toner','laser',25);

INSERT INTO Products (name,description,price)
VALUES ('black toner','inkjet',50);

INSERT INTO Products (name,description,price)
VALUES ('red toner','inkjet',230);

INSERT INTO Products (name,description,price)
VALUES ('rgb toner','inkjet',150);

INSERT INTO Products (name,description,price)
VALUES ('green toner','laser',150);

INSERT INTO Products (name,description,price)
VALUES ('blue toner','laser',250);

INSERT INTO Products (name,description,price)
VALUES ('yellow toner','laser',80);

INSERT INTO Products (name,description,price)
VALUES ('black toner','inkjet',40);

INSERT INTO Products (name,description,price)
VALUES ('zouma toner','laser',25);

INSERT INTO Products (name,description,price)
VALUES ('copp toner','jp',35);

INSERT INTO Products (name,description,price)
VALUES ('shit toner','jp',75);

INSERT INTO Products (name,description,price)
VALUES ('black toner','jp',50);



