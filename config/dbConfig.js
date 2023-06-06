const mysql = require('mysql');
require("dotenv").config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

// MySQL database connection
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
});


// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Failed to connect to MySQL database');
    throw err;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
