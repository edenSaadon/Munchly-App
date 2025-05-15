// jest.config.js

// ### Purpose ###
// This configuration file defines how Jest should behave when running tests in this project.
// It sets the environment, tells Jest where to find test files, and ensures environment variables are loaded.

// Set the test environment to Node.js (default for backend/server-side testing)
module.exports = {
    testEnvironment: 'node',
  
    // Look for test files in the 'jest-test' directory that end with .test.js
    // For example: jest-test/auth.test.js, jest-test/firestore.test.js
    testMatch: ['**/jest-test/**/*.test.js'],
  
    // Automatically load environment variables from a .env file before running tests
    // This is useful for Firebase credentials or other secrets
    setupFiles: ['dotenv/config'],
  };
  