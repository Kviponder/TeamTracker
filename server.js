// Initialize express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'Kv1ponder!',
    database: 'myTeam_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
});


//BELOW are the CRUD functions which are called in the inquirer prompts

function start() {
    inquirer
    .prompt({                   //this is the inquirer prompt that is displayed when the app is run which asks the user what they would like to do
        name: 'action',
        type: 'list',
        message: 'what would you like to do?',
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'View All Employees By Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'Add Department',
            'Remove Department',
            'Quit'
        ]
    })
    .then((answer) => {                         //Note to self: Switch cases are used to perform different actions based on different conditions, in this case the user's answer to the prompt
        switch (answer.action) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Employees By Department':
                viewAllEmployeesByDepartment();
                break;
            case 'View All Employees By Manager':
                viewAllEmployeesByManager();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Remove Role':
                removeRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Remove Department':
                removeDepartment();
                break;
            case 'Quit':
                connection.end();
                break;
        };
        });
    }

    function viewAllEmployees() {
        const query = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id;`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
        }
        )
        start();
    };

    function viewAllEmployeesByDepartment() {
        const query = `
        SELECT department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        ORDER BY department.name;`
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
        }
        )
        start();
    }

    function viewAllEmployeesByManager() {

    }

    