

DROP DATABASE IF EXISTS myTeam_db;
CREATE DATABASE myTeam_db;
USE myTeam_db;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- Create the departments table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,      
    PRIMARY KEY (id)
);

-- Creates sample departments into the department table

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,   
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,   
    PRIMARY KEY (id),                       
    FOREIGN KEY (department_id)              
        REFERENCES department (id)    
);

    CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id)
    );




CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    salary DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
        REFERENCES role (id),
    FOREIGN KEY (manager_id)
        REFERENCES manager (id)
);

