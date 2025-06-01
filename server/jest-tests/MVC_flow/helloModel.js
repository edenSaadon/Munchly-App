// ==============================================================================
// File: jest-tests/mvc-flow/helloModel.js
// Purpose:
// This is the model layer in the MVC test flow.
// It contains the core logic that generates the greeting message based on input.
// Called by the controller.
// ==============================================================================

function getGreeting(name) {
  return `Hello, ${name}! Welcome to the MVC test.`;
}

module.exports = { getGreeting };
