const express = require('express');
const router = express.Router();

// Assuming you have a messages database or data store
const messages = require('../data/messages'); // Replace with your actual message data

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const message = messages.find(m => m.id === id);

  if (!message) {
    return res.status(404).json({ message: 'Message not found' });
  }

  // Check if the logged-in user is either the sender or recipient of the message
  const loggedInUser = getLoggedInUser(); // Replace with your authentication logic
  if (message.from_user.username !== loggedInUser.username && message.to_user.username !== loggedInUser.username) {
    return res.status(403).json({ message: 'Access denied' });
  }

  return res.json({ message });
});

module.exports = router;

router.post('/', (req, res) => {
  const { to_username, body } = req.body;
  const loggedInUser = getLoggedInUser(); // Replace with your authentication logic

  // Create a new message (you would typically handle this using a database)
  const newMessage = {
    id: generateUniqueId(), // Replace with a function that generates unique IDs
    from_user: loggedInUser,
    to_user: getUserByUsername(to_username), // Replace with a function that retrieves the user by username
    body,
    sent_at: new Date(),
  };

  // Add the new message to the messages database (again, this depends on your setup)
  messages.push(newMessage);

  return res.json({ message: newMessage });
});

router.post('/:id/read', (req, res) => {
  const { id } = req.params;
  const loggedInUser = getLoggedInUser(); // Replace with your authentication logic
  const message = messages.find(m => m.id === id);

  if (!message) {
    return res.status(404).json({ message: 'Message not found' });
  }

  if (message.to_user.username !== loggedInUser.username) {
    return res.status(403).json({ message: 'Access denied' });
  }

  // Update the read_at timestamp
  message.read_at = new Date();

  return res.json({ message });
});