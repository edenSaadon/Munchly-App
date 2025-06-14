/**
 * File: jest.setup.js
 *
 * Purpose:
 * This file runs **before every test** and is used to set up the testing environment globally.
 * In this case, we are mocking the `fetch` API used in the app, so that tests do not rely on real network calls.
 *
 * Why it's useful:
 * - Prevents tests from making actual API calls
 * - Ensures consistent and predictable test results
 * - Speeds up tests by avoiding network delays
 */

// Mock the global fetch function to always return a dummy recipe response
global.fetch = jest.fn().mockResolvedValue({
  ok: true, // Simulate successful HTTP response (status 200)
  json: async () => ({
    title: 'Test Recipe',
    ingredients: ['Tomato'],
    instructions: 'Chop vegetables',
  }),
});
