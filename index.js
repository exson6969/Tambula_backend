const express = require('express');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Initialize Express.js app
const app = express();

// Middleware for JSON request body parsing
app.use(express.json());

// Register routes
app.use('/auth', authRoutes); // Use the authRoutes middleware
app.use('/tickets', ticketRoutes); // Use the ticketRoutes middleware

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
