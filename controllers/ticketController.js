const { generateTicketId } = require('../utils/generateTicketId');

// Create ticket controller
exports.createTicket = (req, res) => {
  console.log(req)
  // Retrieve necessary data from the request body and user object
  const { userId } = req.user;
  const ticketId = generateTicketId();
  const ticketData = generateTicketData();

  // Create a new ticket in the database
  Ticket.create({ userId, ticketId, ticketData }, (err, createdTicket) => {
    if (err) {
      console.error('Error creating ticket:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ ticketId: createdTicket.ticketId });
    }
  });
};

// Generate ticket data based on the rules
function generateTicketData(ticketCount) {
  const tickets = {};

  for (let i = 1; i <= ticketCount; i++) {
    const ticket = [];
    for (let j = 0; j < 3; j++) {
      const row = [];
      for (let k = 0; k < 9; k++) {
        const column = [];
        for (let l = 0; l < 5; l++) {
          // Generate a random number between 0 and 90
          let number = Math.floor(Math.random() * 91);
          // Exclude 0
          number = number === 0 ? 'x' : number;
          column.push(number);
        }
        row.push(column);
      }
      ticket.push(row);
    }
    tickets[`ticket${i}`] = ticket;
  }

  return { tickets };
}

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
