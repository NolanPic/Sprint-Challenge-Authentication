const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/model');
const createJwt = require('./createJwt');

router.post('/register', async (req, res) => {
  const user = req.body;
  // check that user is valid
  if(!user.username || !user.password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  // check to see if user with this username exists
  const userWithThisUsername = await Users.getByUsername(user.username);
  if(userWithThisUsername && userWithThisUsername.username) {
    res.status(409).json({ error: 'This username is taken' });
    return;
  }

  // create user w/ hashed pwd
  user.password = bcrypt.hashSync(user.password, 12);
  const createdUser = await Users.create(user);

  // create token
  const jwt = createJwt(createdUser);

  // respond with jwt
  res.status(201).json({
    message: 'Success',
    token: jwt
  });

});

router.post('/login', (req, res) => {
  
});



module.exports = router;
