const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

module.exports = user => {
    const payload = {
        sub: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '3h'
    };

    return jwt.sign(payload, jwtSecret, options);
};
