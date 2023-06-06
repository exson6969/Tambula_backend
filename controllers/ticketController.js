const { generateTicketId } = require('../utils/generateTicketId');

// Create ticket controller
exports.createTicket = (req, res) => {
  const { ticketData } = req.body;
  const ticketId = generateTicketId();
  const userId = req.user.id;

  // Create a new ticket in the database
  Ticket.create(userId, ticketId, ticketData, (err) => {
    if (err) {
      console.error('Error creating ticket');
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ ticketId });
    }
  });
};

// Fetch tickets controller
exports.fetchTickets = (req, res) => {
  const userId = req.user.id;

  // Fetch all tickets associated with the user ID from the database
  Ticket.fetchAll(userId, (err, tickets) => {
    if (err) {
      console.error('Error fetching tickets');
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ tickets });
    }
  });
};
