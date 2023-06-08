const { generateTicketId } = require('../utils/generateTicketId');
const Ticket = require('../models/Tickets');

// Create ticket controller
exports.createTicket = (req, res) => {
  Ticket.getById(req.user.username, (err, id) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(id);
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


// Generate ticket data based on the rules
function generateTicketData(ticketCount) {
  const tickets = {};

  // Function to generate a single ticket
  function generateTicket() {
    const ticket = [];

    // Generate an array with numbers 1 to 90
    const numbers = Array.from({ length: 90 }, (_, index) => index + 1);

    // Shuffle the numbers randomly
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Divide the shuffled numbers into 9 columns
    const columns = Array.from({ length: 9 }, () => []);

    // Distribute the numbers into the columns
    numbers.forEach((number) => {
      const column = Math.floor((number - 1) / 10);
      columns[column].push(number);
    });

    // Generate a unique ticket
    while (ticket.length < 3) {
      const row = [];
      const selectedColumns = new Set();

      // Select a random column for each row
      while (selectedColumns.size < 5) {
        const column = Math.floor(Math.random() * 9);
        selectedColumns.add(column);
      }

      // Fill the selected columns with numbers, otherwise fill with "x"
      for (let i = 0; i < 9; i++) {
        if (selectedColumns.has(i)) {
          const columnIndex = Math.floor(Math.random() * columns[i].length);
          row.push(columns[i].splice(columnIndex, 1)[0]);
        } else {
          row.push(0);
        }
      }

      ticket.push(row);
    }

    return ticket;
  }

  // Generate the specified number of unique tickets
  let ticketIndex = 1;
  while (ticketIndex <= ticketCount) {
    const ticketName = `ticket${ticketIndex}`;
    const ticket = generateTicket();

    // Check if the generated ticket is unique
    const isUnique = Object.values(tickets).every((existingTicket) => {
      return JSON.stringify(existingTicket) !== JSON.stringify(ticket);
    });

    if (isUnique) {
      tickets[ticketName] = ticket;
      ticketIndex++;
    }
  }
  return JSON.stringify(tickets);
}

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
