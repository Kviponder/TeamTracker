DROP DATABASE IF EXISTS `myTeam_db`;
CREATE DATABASE `myTeam_db`;

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
    ('IT');

CREATE  TABLE role (
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
    ('IT Assistant', 100000.00, 7);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
        REFERENCES role (id),
    FOREIGN KEY (manager_id)
        REFERENCES employee (id)
);


