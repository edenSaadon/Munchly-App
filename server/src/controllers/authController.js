// server/src/controllers/authController.js

const ping = (req, res) => {
    res.status(200).json({ message: 'pong 🏓' });
  };
  
  module.exports = {
    ping,
  };
  