// jest.config.js

// =====================
// 📄 Jest Configuration
// =====================
//
// ### Purpose ###
// This configuration file defines how Jest should behave when running tests in this project.
// It sets the environment, specifies the location of test files, and ensures environment
// variables from .env are loaded before tests run. It also supports alias imports.
//
// This setup is especially useful for backend testing (e.g. Firebase, Express, API calls).

module.exports = {
  // Set the testing environment to Node.js
  // This ensures that global objects like 'process', 'Buffer', etc. behave as in a backend context
  testEnvironment: 'node',

  // Specify the pattern for locating test files
  // This looks for any files ending in '.test.js' inside any subdirectory of 'jest-tests'
  testMatch: ['**/jest-tests/**/*.test.js'],

  // Load environment variables from a .env file before each test run
  // This is essential when using Firebase credentials, API keys, or other secrets in tests
  setupFiles: ['dotenv/config'],

  // Support for path aliasing
  // Allows you to import modules using '@/someModule' instead of relative paths like '../../../'
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Jest will also look for modules in the 'src' directory, not just 'node_modules'
  // This enables clean absolute imports from 'src/'
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};
