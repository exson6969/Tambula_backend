const jwt = require('jsonwebtoken');

// Middleware for authenticating JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        console.error('Error verifying JWT token');
        res.status(403).json({ error: 'Forbidden' });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

module.exports = authenticateToken;
