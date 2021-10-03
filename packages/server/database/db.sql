CREATE DATABASE db_alkemy;

USE db_alkemy;

CREATE TABLE Expenses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) UNSIGNED NOT NULL,
    description VARCHAR(50) NOT NULL,
    created_at DATE NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL
);

CREATE TABLE Incomes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) UNSIGNED NOT NULL,
    description VARCHAR(50) NOT NULL,
    created_at DATE NOT NULL
);

CREATE TABLE Expense_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(20) NOT NULL
);

ALTER TABLE Expenses ADD FOREIGN KEY (category_id) REFERENCES Expense_categories(id);

INSERT INTO Expense_categories (category_name) VALUES ('libreria'), ('alimentos'), ('vestimenta'), ('transporte'), ('otro');