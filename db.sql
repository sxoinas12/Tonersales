CREATE TABLE Globals (
    Name VARCHAR(255),
    Value VARCHAR(255)

);


CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
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




