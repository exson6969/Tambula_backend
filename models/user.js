const db = require('../config/dbConfig');

// Get user by username
exports.getByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Check if username already exists
exports.checkUsernameExists = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.length > 0);
    }
  });
};

// Create user
exports.create = (username, password, callback) => {
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};
