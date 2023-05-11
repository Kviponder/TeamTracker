// Import and require dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const functions = require('./functions');
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


//Want to 1- move functions to sep file, create a constructor function for each table, and export them to this file 

function viewAllEmployees() {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
    connection.query(query, (err, res) => {
      if (err) throw err;
    });
    start();
  }
  
  function viewAllEmployeesByDepartment() {
    const query = `
      SELECT department.name AS department, employee.id, employee.first_name, employee.last_name, role.title, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      ORDER BY department.name;`;
    connection.query(query, (err, res) => {
      if (err) throw err;
    });
    start();
  }
  //this function below will not work until I add a manager_id column to the employee table
  //which i can do by adding a foreign key to the employee table that references the employee id
  function viewAllEmployeesByManager() {
    const query = `
      SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, employee.id, employee.first_name, employee.last_name, role.title, role.salary
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON manager.id = employee.manager_id
      ORDER BY manager;`;
    connection.query(query, (err, res) => {
      if (err) throw err;
    });
    start();
  }
  
    function addEmployee() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function removeEmployee() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function updateEmployeeRole() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function updateEmployeeManager() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function viewAllRoles() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function addRole() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function removeRole() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function viewAllDepartments() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function addDepartment() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    function removeDepartment() {
        const query = `
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
          });
          start();
    }
    
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
start();

// module.exports = {
//    connection,
//     start
// };