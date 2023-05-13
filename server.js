// Import and require dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
require("dotenv").config();

const start = require('./prompts.js');

// const functions = require('./functions');

const connection = require("./database.js");
const PORT = process.env.PORT || 3001;

const app = express();



// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//BELOW are the CRUD functions which are called in the inquirer prompts
//CRUD stands for Create, Read, Update, Delete -- My equivalent of CRUD here is: Add, View, Update, Remove

start();



