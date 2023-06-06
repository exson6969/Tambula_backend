// Database connection
const db = require('../config/dbConfig');

// Create ticket
exports.create = (userId, ticketId, ticketData, callback) => {
  db.query('INSERT INTO tickets (ticket_id, user_id, ticket_data) VALUES (?, ?, ?)', [ticketId, userId, ticketData], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};
