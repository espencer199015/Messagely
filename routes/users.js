const express = require('express');
const router = express.Router();

// Assuming you have a user database or data store
const users = require('../data/users'); // Replace with your actual user data

router.get('/', (req, res) => {
  const userList = users.map(user => ({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
  }));

  return res.json({ users: userList });
});

module.exports = router;

router.get('/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({
    user: {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      join_at: user.join_at, // Assuming you have this property in your user data
      last_login_at: user.last_login_at, // Assuming you have this property in your user data
    },
  });
});

router.get('/:username/to', (req, res) => {
  const { username } = req.params;
  const messagesToUser = messages.filter(message => message.to_user.username === username);

  return res.json({ messages: messagesToUser });
});

router.get('/:username/from', (req, res) => {
  const { username } = req.params;
  const messagesFromUser = messages.filter(message => message.from_user.username === username);

  return res.json({ messages: messagesFromUser });
});