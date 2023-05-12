
DROP DATABASE IF EXISTS myTeam_db;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE DATABASE myTeam_db;
USE myTeam_db;

-- Create the departments table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,      
    PRIMARY KEY (id)

);

-- Creates sample departments into the department table
INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('HR'),
    ('Marketing'),
    ('IT'),
    ('Management');

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,   
    salary DECIMAL(10,2) NOT NULL,          
    department_id INT NOT NULL,            
    PRIMARY KEY (id),                       
    FOREIGN KEY (department_id)             
        REFERENCES department (id)          
);


INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Lead', 100000.00, 1),
    ('Salesperson', 80000.00, 1),
    ('Lead Engineer', 150000.00, 2),
    ('Software Engineer', 120000.00, 2),
    ('Accountant', 125000.00, 3),
    ('Legal Team Lead', 250000.00, 4),
    ('Lawyer', 190000.00, 4),
    ('HR Lead', 150000.00, 5),
    ('HR Assistant', 100000.00, 5),
    ('Marketing Lead', 150000.00, 6),
    ('Marketing Assistant', 100000.00, 6),
    ('IT Lead', 150000.00, 7),
    ('IT Assistant', 100000.00, 7),
    ('Manager', 200000.00, 8);

    CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id)
    );


    INSERT INTO manager (first_name, last_name, role_id)
VALUES
    ('James', 'Anderson', 1),
    ('Sophie', 'Walker', 1),
    ('Matthew', 'Thompson', 1),
    ('Isabella', 'Harris', 1),
    ('Daniel', 'Wilson', 1),
    ('Olivia', 'Garcia', 1),
    ('Benjamin', 'Davis', 1),
    ('Emily', 'Clark', 1);



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

INSERT INTO employee (first_name, last_name, role_id, manager_id, salary)
VALUES
    -- Sales Department
    ('John', 'Smith', 1, 1, 100000.00),             -- Sales Lead
    ('Emma', 'Johnson', 2, 1, 80000.00),             -- Salesperson

    -- Engineering Department
    ('Michael', 'Williams', 3, 3, 150000.00),        -- Lead Engineer
    ('Olivia', 'Brown', 4, 3, 120000.00),            -- Software Engineer

    -- Finance Department
    ('William', 'Jones', 5, 5, 125000.00),           -- Accountant
    ('Sophia', 'Davis', 6, 5, 250000.00),            -- Legal Team Lead

    -- Legal Department
    ('Chloe', 'Hernandez', 7, 7, 190000.00),         -- Lawyer
    ('Andrew', 'Diaz', 8, 7, 150000.00),             -- HR Lead

    -- HR Department
    ('Samantha', 'Garcia', 9, 5, 100000.00),         -- HR Assistant
    ('David', 'Martinez', 10, 5, 150000.00),         -- Marketing Lead

    -- Marketing Department
    ('Ava', 'Anderson', 11, 6, 100000.00),          -- Marketing Assistant
    ('Ethan', 'Gonzalez', 12, 6, 150000.00),        -- IT Lead

    -- IT Department
    ('Avery', 'Roberts', 13, 7, 100000.00),         -- IT Assistant
    ('Mason', 'Turner', 14, 8, 150000.00),          -- Manager

    -- Sales Department (Second set of employees)
    ('Liam', 'Taylor', 1, 1, 95000.00),              -- Sales Lead
    ('Oliver', 'Walker', 2, 1, 90000.00),            -- Salesperson

    -- Engineering Department (Second set of employees)
    ('Emma', 'Martin', 3, 3, 145000.00),             -- Lead Engineer
    ('Lily', 'Thompson', 4, 3, 110000.00),           -- Software Engineer

    -- Finance Department (Second set of employees)
    ('Ava', 'Allen', 5, 5, 120000.00),               -- Accountant
    ('Lucas', 'Wright', 6, 5, 115000.00);            -- Legal Team Lead
 