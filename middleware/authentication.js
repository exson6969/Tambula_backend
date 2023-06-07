const jwt = require('jsonwebtoken');

// Middleware for authenticating JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    jwt.verify(authHeader, 'your_secret_key', (err, user) => {
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
