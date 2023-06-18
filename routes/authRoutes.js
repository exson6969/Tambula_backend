const express = require('express');
const authController = require('../controllers/authController');

// Create router instance
const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

module.exports = router;
