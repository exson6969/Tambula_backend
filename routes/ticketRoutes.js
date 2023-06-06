const express = require('express');
const ticketController = require('../controllers/ticketController');
const authentication = require('../middleware/authentication');

// Create router instance
const router = express.Router();

// Create ticket route
router.post('/create', authentication, ticketController.createTicket);

// Fetch tickets route
router.get('/allTickets', authentication, ticketController.fetchTickets);

module.exports = router;
