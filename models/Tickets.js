// Database connection
const db = require('../config/dbConfig');

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
