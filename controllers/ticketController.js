const { generateTicketId } = require('../utils/generateTicketId');
const {generateTicketData} = require('../utils/generateTicketData');
const Ticket = require('../models/Tickets');

// Create ticket controller
exports.createTicket = (req, res) => {
  Ticket.getById(req.user.username, (err, id) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const userId = id;
      const ticketId = generateTicketId();
      const ticketData = generateTicketData(req.body.ticketCount);

      // Create a new ticket in the database
      Ticket.create({ userId, ticketId, ticketData }, (err, createdTicket) => {
        if (err) {
          console.error('Error creating ticket:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ ticketId: ticketId });
        }
      });
    }
  });
};

// Fetch tickets controller
exports.fetchTickets = (req, res) => {
  const id = req.body.userId;
  const page = req.body.page;
  const limit = req.body.limit;

  // Fetch all tickets associated with the user ID from the database
  Ticket.fetchAll(id, page, limit, (err, tickets) => {
    if (err) {
      console.error('Error fetching tickets:', err);
    } else {
      res.status(200).json(tickets)
    }
  });
};
