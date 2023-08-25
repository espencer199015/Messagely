const express = require('express');
const router = express.Router();

// Assuming you have a user database or data store
const users = require('../data/users'); // Replace with your actual user data

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a token (you would typically use a library for this)
  const token = generateToken(user);

  // Update last-login timestamp
  user.lastLogin = new Date();

  return res.json({ token });
});

module.exports = router;

router.post('/register', (req, res) => {
  const { username, password, first_name, last_name, phone } = req.body;

  // Create a new user (you would typically handle this using a database)
  const newUser = {
    username,
    password,
    first_name,
    last_name,
    phone,
    lastLogin: new Date(), // Set initial last-login timestamp
  };

  // Add the new user to the user database (again, this depends on your setup)
  users.push(newUser);

  // Generate a token for the new user
  const token = generateToken(newUser);

  return res.json({ token });
});