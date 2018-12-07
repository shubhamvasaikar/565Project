-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema invoice_project
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema invoice_project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `invoice_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `invoice_project` ;

-- -----------------------------------------------------
-- Table `invoice_project`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_project`.`clients` (
  `client_id` INT(11) NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(45) NOT NULL,
  `client_address` VARCHAR(45) NULL DEFAULT NULL,
  `client_email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`client_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `invoice_project`.`invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_project`.`invoices` (
  `invoice_id` INT(11) NOT NULL AUTO_INCREMENT,
  `total` DECIMAL(10,2) NOT NULL,
  `date` VARCHAR(30) NOT NULL,
  `client_id` INT(11) NOT NULL,
  PRIMARY KEY (`invoice_id`),
  INDEX `client_id_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `client_id`
    FOREIGN KEY (`client_id`)
    REFERENCES `invoice_project`.`clients` (`client_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `invoice_project`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_project`.`products` (
  `product_id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `price_per_unit` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `invoice_project`.`invoice_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoice_project`.`invoice_details` (
  `quantity` INT(11) NOT NULL,
  `client_id` INT(11) NULL DEFAULT NULL,
  `invoice_id` INT(11) NULL DEFAULT NULL,
  `product_id` INT(11) NULL DEFAULT NULL,
  INDEX `client_id_idx` (`client_id` ASC) VISIBLE,
  INDEX `invoice_id_idx` (`invoice_id` ASC) VISIBLE,
  INDEX `product_id_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `clientid`
    FOREIGN KEY (`client_id`)
    REFERENCES `invoice_project`.`clients` (`client_id`)
    ON UPDATE CASCADE,
  CONSTRAINT `invoiceid`
    FOREIGN KEY (`invoice_id`)
    REFERENCES `invoice_project`.`invoices` (`invoice_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `productid`
    FOREIGN KEY (`product_id`)
    REFERENCES `invoice_project`.`products` (`product_id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
