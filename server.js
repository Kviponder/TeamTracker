// Import and require dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const functions = require('./functions');
const express = require('express');

// Connect to database
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Kv1ponder!',
    database: 'myTeam_db'
  },
  console.log(`Connected to the books_db database.`),
  console.log(`-----------------------------------`)
);



//BELOW are the CRUD functions which are called in the inquirer prompts

function start() {
    inquirer
    .prompt({                   //this is the inquirer prompt that is displayed when the app is run which asks the user what they would like to do
        name: 'action',
        type: 'list',
        message: 'What would you like to do Today?',
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
                functions.viewAllEmployees();
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
start();

module.exports = {
   connection,
    start
};