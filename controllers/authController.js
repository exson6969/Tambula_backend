const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register controller
exports.register = (req, res) => {
  const { username, password } = req.body;
  // Check if the username already exists in the database
  User.checkUsernameExists(username, (err, existingUser) => {
    if (err) {
      console.error('Error finding user');
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (existingUser) {
      // Username already exists
      res.status(400).json({ error: 'Username already exists' });
    } else {
      // Hash the password before storing it in the database
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password');
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Create a new user in the database
          User.create(username, hashedPassword, (err) => {
            if (err) {
              console.error('Error creating user');
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.json({ message: 'User registered successfully' });
            }
          });
        }
      });
    }
  });
};

// Login controller...
exports.login = (req, res) => {
    const { username, password } = req.body;
  
    // Fetch user from the database based on the provided username
    User.getByUsername(username, (err, user) => {
      if (err) {
        console.error('Error fetching user from database');
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (!user) {
        // User not found
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        // Compare the provided password with the hashed password stored in the database
        bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
          if (bcryptErr) {
            console.error('Error comparing passwords');
            res.status(500).json({ error: 'Internal Server Error' });
          } else if (!bcryptResult) {
            // Passwords don't match
            res.status(401).json({ error: 'Invalid credentials' });
          } else {
            // Generate and return a JWT token for successful login
            const token = jwt.sign({ username: user.username }, 'your_secret_key');
            res.json({ token });
          }
        });
      }
    });
  };