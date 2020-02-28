const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {

  const userToken = req.headers.authorization;

  jwt.verify(userToken, jwtSecret, (err, decoded) => {
    if(err) {
      res.status(401).json({ you: 'shall not pass!' });
    }
    else {
      req.userToken = decoded;
      next();
    }
  });
};
