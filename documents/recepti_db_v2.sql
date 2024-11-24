-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema recepti_db
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `recepti_db` DEFAULT CHARACTER SET utf8;
USE `recepti_db`;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL UNIQUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Recipes (
    RecipeID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    CategoryID INT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Ingredients TEXT NOT NULL,
    Instructions TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Favorites (
    FavoriteID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    RecipeID INT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE,
    UNIQUE (UserID, RecipeID) -- Ensures a user cannot favorite the same recipe multiple times
);

CREATE TABLE IF NOT EXISTS Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    RecipeID INT NOT NULL,
    UserID INT NOT NULL,
    Content TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

INSERT INTO Users (Username, Email, PasswordHash) VALUES
('Alice', 'alice@example.com', 'hashed_password1'),
('Bob', 'bob@example.com', 'hashed_password2'),
('Charlie', 'charlie@example.com', 'hashed_password3'),
('Diana', 'diana@example.com', 'hashed_password4'),
('Edward', 'edward@example.com', 'hashed_password5'),
('Fiona', 'fiona@example.com', 'hashed_password6'),
('George', 'george@example.com', 'hashed_password7'),
('Hannah', 'hannah@example.com', 'hashed_password8'),
('Ivan', 'ivan@example.com', 'hashed_password9'),
('Julia', 'julia@example.com', 'hashed_password10');

INSERT INTO Categories (CategoryName) VALUES
('Appetizers'),
('Main Courses'),
('Desserts'),
('Beverages'),
('Soups'),
('Salads'),
('Breakfast'),
('Snacks'),
('Vegetarian'),
('Seafood');

INSERT INTO Recipes (UserID, CategoryID, Title, Description, Ingredients, Instructions) VALUES
(1, 1, 'Bruschetta', 'A classic Italian appetizer.', 'Tomatoes, Basil, Olive Oil, Bread', 'Chop tomatoes, mix with basil and olive oil, serve on toasted bread.'),
(2, 2, 'Spaghetti Bolognese', 'Hearty Italian pasta dish.', 'Spaghetti, Ground Beef, Tomato Sauce', 'Cook spaghetti, prepare sauce with beef, mix and serve.'),
(3, 3, 'Chocolate Cake', 'Rich and moist chocolate cake.', 'Flour, Cocoa Powder, Sugar, Eggs', 'Mix ingredients, bake in oven at 350°F for 30 minutes.'),
(4, 4, 'Mojito', 'Refreshing cocktail with lime and mint.', 'Mint, Lime, Sugar, Rum, Soda', 'Muddle mint and lime, add rum, sugar, and soda.'),
(5, 5, 'Tomato Soup', 'Classic comfort food.', 'Tomatoes, Cream, Salt, Pepper', 'Cook tomatoes, blend with cream and spices.'),
(6, 6, 'Caesar Salad', 'Crisp lettuce with Caesar dressing.', 'Lettuce, Croutons, Parmesan, Caesar Dressing', 'Toss ingredients together and serve chilled.'),
(7, 7, 'Pancakes', 'Fluffy breakfast pancakes.', 'Flour, Milk, Eggs, Baking Powder', 'Mix ingredients, cook on skillet.'),
(8, 8, 'Nachos', 'Cheesy and spicy snack.', 'Tortilla Chips, Cheese, Jalapenos', 'Melt cheese over chips, top with jalapenos.'),
(9, 9, 'Vegetable Stir-fry', 'Quick and healthy stir-fry.', 'Mixed Vegetables, Soy Sauce, Oil', 'Stir-fry vegetables in oil, add soy sauce.'),
(10, 10, 'Grilled Salmon', 'Light and healthy seafood dish.', 'Salmon, Lemon, Garlic', 'Grill salmon, season with lemon and garlic.');

INSERT INTO Favorites (UserID, RecipeID) VALUES
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5), (2, 6),
(3, 7), (3, 8), (3, 9),
(4, 10);

INSERT INTO Comments (RecipeID, UserID, Content) VALUES
(1, 2, 'This recipe is amazing!'),
(2, 3, 'Loved this dish!'),
(3, 4, 'Great recipe, will try again.'),
(4, 5, 'Very refreshing!'),
(5, 6, 'Comfort food at its best.'),
(6, 7, 'A healthy and tasty salad.'),
(7, 8, 'Perfect pancakes!'),
(8, 9, 'A crowd favorite.'),
(9, 10, 'Quick and easy.'),
(10, 1, 'Absolutely delicious.');