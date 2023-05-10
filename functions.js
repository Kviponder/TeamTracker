choices: [
  "View All Employees",
  "View All Employees By Department",
  "View All Employees By Manager",
  "Add Employee",
  "Remove Employee",
  "Update Employee Role",
  "Update Employee Manager",
  "View All Roles",
  "Add Role",
  "Remove Role",
  "View All Departments",
  "Add Department",
  "Remove Department",
  "Quit",
];

function viewAllEmployees() {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
  const { connection } = require("./server.js");
  connection.query(query, (err, res) => {
    if (err) throw err;
  });
  const { start } = require("./functions.js");
  start();
}

function viewAllEmployeesByDepartment() {
  const query = `
    SELECT department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
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
    SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, employee.id, employee.first_name, employee.last_name, role.title
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

module.exports = {
  viewAllEmployees,
  viewAllEmployeesByDepartment,
  viewAllEmployeesByManager,
  // addEmployee,
  // removeEmployee,
  // updateEmployeeRole,
  // updateEmployeeManager,
  // viewAllRoles,
  // addRole,
  // removeRole,
  // viewAllDepartments,
  // addDepartment,
  // removeDepartment,
  // quit
};
