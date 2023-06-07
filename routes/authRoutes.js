const express = require('express');
const authController = require('../controllers/authController');

// Create router instance
const router = express.Router();

// Register route
router.route('/register').post(authController.register)

// Login route
router.route('/login').post(authController.login);

module.exports = router;
