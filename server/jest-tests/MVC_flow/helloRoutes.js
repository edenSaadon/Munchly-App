// ==============================================================================
// File: jest-tests/mvc-flow/helloRoutes.js
// Purpose:
// This file defines the Express route for the `/hello` endpoint.
// It connects the route to the controller function `sayHello`, which handles the logic.
// This is part of the MVC flow demonstration test.
// ==============================================================================

const express = require('express');
const { sayHello } = require('./helloController');

const router = express.Router();

// Route: GET /hello
// Description: Accepts a `name` query parameter and returns a greeting message.
// Example: GET /hello?name=Eden → "Hello, Eden! Welcome to the MVC test."
router.get('/hello', sayHello);

module.exports = router;
