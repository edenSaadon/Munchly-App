// ==============================================================================
// File: jest-test/mvc-flow/helloApp.js
// Purpose:
// This file sets up the Express app used in the MVC test.
// It loads middleware (like JSON parser) and registers the helloRoutes,
// which contain the endpoint(s) for testing the full MVC flow.
// This app is used in the Jest test to simulate a real server.
// ==============================================================================

const express = require('express');
const helloRoutes = require('./helloRoutes');

const app = express();
app.use(express.json());
app.use('/', helloRoutes);

module.exports = app;
