// Import and require dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const cTable = require("console.table");
// const functions = require('./functions');
const express = require("express");

// Connect to database
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  console.log(` -------------------------------------- `),
  console.log(`   Connected to your Team's database.   `),
  console.log(` -------------------------------------- `)
);

//Want to 1- move functions to sep file, create a constructor function for each table, and export them to this file
//CONCAT is used to concatenate
function viewAllEmployees() {
  const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager. first_name, ' ', manager.last_name, " ", manager.id) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });

  //function to call table- make constructor function for the next step for each table
}

//this function below will not work until I add a manager_id column to the employee table      - i also need to add a manager table- then add 3-4 managers to the manager table
//which i can do by adding a foreign key to the employee table that references the employee id

//For all of these functiuons, create a class constructor for function
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the employee's role id?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the employee's manager id?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the employee's salary?",
      },
    ])
    //(?, ?, ?, ?, ?) ties this to the above answers in the inquirer prompt
    .then((answers) => {
      const { first_name, last_name, role_id, manager_id, salary } = answers;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id, salary) VALUES (?, ?, ?, ?, ?)
        `;
      connection.query(
        query,
        [first_name, last_name, role_id, manager_id, salary],
        (err, res) => {
          if (err) throw err;
          console.log("Employee added successfully!");
          start();
        }
      );
    });
}
//Might not use delete functions

function removeEmployee() {
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "What is the employee's id?",
    })

    .then((answers) => {
      const employeeid = answers.id;
      const query = `
        DELETE FROM employee WHERE id = ?
        `;
      connection.query(query, [employeeid], (err, res) => {
        if (err) throw err;
        console.log("Employee deleted successfully!");
      });
      start();
    });
}
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's id?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the employee's new role id?",
      },
    ])
    .then((answers) => {
      const { id, role_id } = answers;
      const query = `UPDATE employee SET role_id = ? WHERE ID = ?
        `;
      connection.query(query, [role_id, id], (err, res) => {
        if (err) throw err;
        console.log("Employee role updated successfully!");
        start();
      });
    });
}

function viewAllRoles() {
  const query = `SELECT * FROM role
        `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the starting salary of the new role?",
      },
      {
        name: "department_id",
        type: "input",
        message:
          "What is the department id of the new role? (PLEASE ENTER A NUMBER)",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answers) => {
      const { title, salary, department_id } = answers;
      const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)
        `;
      connection.query(query, [title, salary, department_id], (err, res) => {
        if (err) throw err;
        console.log("Role added successfully!");
        start();
      });
    });
}

function viewAllDepartments() {
  const query = `SELECT * FROM department;
        `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new department?",
      },
    ])
    .then((answers) => {
      const { title } = answers;
      const query = `INSERT INTO department (name) VALUES (?);
        `;
      connection.query(query, title, (err, res) => {
        if (err) throw err;
        console.log("Department created successfully!");
        start();
      });
    });
}

//BELOW are the CRUD functions which are called in the inquirer prompts
//CRUD stands for Create, Read, Update, Delete -- My equivalent of CRUD here is: Add, View, Update, Remove
function start() {
  inquirer
    .prompt({
      //this is the inquirer prompt that is displayed when the app is run which asks the user what they would like to do
      name: "action",
      type: "list",
      message: "What would you like to do Today?",
      //THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Remove Employee",
        "Quit",
      ],
    })
    .then((answer) => {
      //Note to self: Switch cases are used to perform different actions based on different conditions, in this case the user's answer to the prompt
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Quit":
          connection.end();
          break;
      }
    });
}
start();

// module.exports = {
//    connection,
//     start
// };
