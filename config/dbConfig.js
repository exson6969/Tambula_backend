const mysql = require('mysql2');
require("dotenv").config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

// MySQL database connection
const db = mysql.createPool({
  host: DB_HOST,       //This is your localhost IP
  user: DB_USER,         // db username
  password: DB_PASSWORD,  // password for the db
  database: DB_DATABASE,      // Database name
  port: DB_PORT             // port name, "3306" by default
})


// Connect to the MySQL database
db.getConnection(err => {
  if (err) {
    console.error('Failed to connect to MySQL database');
    throw err;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
