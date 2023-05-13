const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = require("./database.js");


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
        "Remove Department",
        "Remove Role",
        "Quit"
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

        case "Remove Department":
            removeDepartment();
          break;

        case "Remove Role":
            removeRole();
          break;

        case "Quit":
          connection.end();
          break;
      };
    });
}

//For all of these functions, create a class constructor for function
function viewAllEmployees() {
  const query = `SELECT * FROM employee
          `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

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
        start();
      });
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

function removeDepartment() {
  inquirer
  .prompt({
    name: "id",
    type: "input",
    message: "What is the departments's id?",
  })

  .then((answers) => {
    const employeeid = answers.id;
    const query = `
        DELETE FROM department WHERE id = ?
        `;
    connection.query(query, [employeeid], (err, res) => {
      if (err) throw err;
      console.log("Department removed successfully!");
      start();
    });
  });
}

function removeRole() {
  inquirer
  .prompt({
    name: "id",
    type: "input",
    message: "What is the role's id?",
  })

  .then((answers) => {
    const employeeid = answers.id;
    const query = `
        DELETE FROM role WHERE id = ?
        `;
    connection.query(query, [employeeid], (err, res) => {
      if (err) throw err;
      console.log("Role removed successfully!");
      start();
    });
  });
}


module.exports = start;