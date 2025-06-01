// ==============================================================================
// File: jest-tests/mvc-flow/helloController.js
// Purpose:
// This is the controller layer in the MVC test flow.
// It handles the incoming HTTP request, extracts query parameters,
// delegates logic to the model, and returns a JSON response.
// ==============================================================================

const { getGreeting } = require('./helloModel');

function sayHello(req, res) {
  const name = req.query.name || 'TestUser';
  const message = getGreeting(name);
  res.status(200).json({ message });
}

module.exports = { sayHello };
