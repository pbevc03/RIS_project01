SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema recepti_db
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS `recepti_db` DEFAULT CHARACTER SET utf8;
USE `recepti_db`;

-- -----------------------------------------------------
-- Table `kategorija`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kategorija` (
  `idkategorija` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idkategorija`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `uporabnik`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `uporabnik` (
  `iduporabnik` INT NOT NULL AUTO_INCREMENT,
  `uporabniskoIme` VARCHAR(45) NOT NULL,
  `geslo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduporabnik`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `recept`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recept` (
  `idrecept` INT NOT NULL,
  `ime` VARCHAR(255) NOT NULL,
  `navodila` VARCHAR(255) NOT NULL,
  `sestavine` VARCHAR(255) NOT NULL,
  `TK_kategorija` INT NOT NULL,
  `TK_uporabnik` INT NOT NULL,
  PRIMARY KEY (`idrecept`),
  INDEX `fk_recept_kategorija_idx` (`TK_kategorija` ASC),
  INDEX `fk_recept_uporabnik1_idx` (`TK_uporabnik` ASC),
  CONSTRAINT `fk_recept_kategorija`
    FOREIGN KEY (`TK_kategorija`)
    REFERENCES `kategorija` (`idkategorija`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_recept_uporabnik1`
    FOREIGN KEY (`TK_uporabnik`)
    REFERENCES `uporabnik` (`iduporabnik`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `komentar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `komentar` (
  `idkomentar` INT NOT NULL AUTO_INCREMENT,
  `vsebina` VARCHAR(45) NULL,
  `ocena` INT NOT NULL,
  `TK_uporabnik` INT NOT NULL,
  `TK_recept` INT NOT NULL,
  PRIMARY KEY (`idkomentar`),
  INDEX `fk_komentar_uporabnik1_idx` (`TK_uporabnik` ASC),
  INDEX `fk_komentar_recept1_idx` (`TK_recept` ASC),
  CONSTRAINT `fk_komentar_uporabnik1`
    FOREIGN KEY (`TK_uporabnik`)
    REFERENCES `uporabnik` (`iduporabnik`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_komentar_recept1`
    FOREIGN KEY (`TK_recept`)
    REFERENCES `recept` (`idrecept`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Sample Data for `kategorija`
-- -----------------------------------------------------
INSERT INTO `kategorija` (`naziv`) VALUES 
('Desserts'),
('Main Courses'),
('Appetizers'),
('Salads'),
('Drinks');

-- -----------------------------------------------------
-- Sample Data for `uporabnik`
-- -----------------------------------------------------
INSERT INTO `uporabnik` (`uporabniskoIme`, `geslo`) VALUES 
('chefJohn', 'password123'),
('bakingQueen', 'sugarRush'),
('healthyLife', 'greens123'),
('meatLover', 'steak45'),
('drinkMaster', 'mixology');

-- -----------------------------------------------------
-- Sample Data for `recept`
-- -----------------------------------------------------
INSERT INTO `recept` (`idrecept`, `ime`, `navodila`, `sestavine`, `TK_kategorija`, `TK_uporabnik`) VALUES 
(1, 'Chocolate Cake', 'Mix ingredients and bake.', 'Flour, Sugar, Cocoa Powder, Eggs, Butter', 1, 1),
(2, 'Caesar Salad', 'Mix dressing with greens and croutons.', 'Lettuce, Caesar Dressing, Croutons, Parmesan', 4, 3),
(3, 'Steak Dinner', 'Grill steak to desired doneness.', 'Beef Steak, Salt, Pepper, Butter', 2, 4),
(4, 'Fruit Smoothie', 'Blend all ingredients.', 'Banana, Berries, Yogurt, Milk', 5, 5),
(5, 'Garlic Bread', 'Toast bread with garlic and butter.', 'Bread, Garlic, Butter, Parsley', 3, 2);

-- -----------------------------------------------------
-- Sample Data for `komentar`
-- -----------------------------------------------------
INSERT INTO `komentar` (`vsebina`, `ocena`, `TK_uporabnik`, `TK_recept`) VALUES 
('Delicious and moist!', 5, 2, 1),
('Too salty for my taste.', 3, 3, 3),
('Perfectly balanced flavors.', 4, 1, 2),
('Simple and refreshing.', 5, 5, 4),
('Burnt the first time, but great recipe!', 4, 4, 5);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;