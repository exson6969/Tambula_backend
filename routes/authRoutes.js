const express = require('express');
const authController = require('../controllers/authController');

// Create router instance
const router = express.Router();

// Register route
router.route('/register').post(authController.register)

// Login route
router.post('/login', function(req, res){
    authController.login
  } );

module.exports = router;
