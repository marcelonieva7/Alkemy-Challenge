CREATE DATABASE db_alkemy;

USE db_alkemy;

CREATE TABLE operations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    typeOf CHAR(7) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(50) NOT NULL,
    created_at DATE NOT NULL
);
