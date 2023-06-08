// Database connection
const db = require('../config/dbConfig');

// Get user by id
exports.getById = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0].id);
    }
  });
};

// Create ticket
exports.create = (userData,callback) => {

  db.query('INSERT INTO tickets (id, ticket_id, ticket_data) VALUES (?, ?, ?)', [userData.userId, userData.ticketId, userData.ticketData], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

// Fetch ticket lists associated with the respective ID with pagination
exports.fetchAll = (id, page, limit, callback) => {
  const offset = (page - 1) * limit;

  db.query('SELECT * FROM tickets WHERE id = ? LIMIT ?, ?', [id, offset, limit], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      const tickets = results.map((row) => {
        return {
          ticketData: row.ticket_data,
        };
      });
      callback(null, tickets);
    }
  });
};
