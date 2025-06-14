/**
 * File: jest.config.js
 *
 * Purpose:
 * This is the main configuration file for running **Jest** tests in a React Native + Expo environment.
 * It defines how tests are run, how modules are resolved, and what setup files or transformations are used.
 *
 * Why it's important:
 * - Enables smooth testing of React Native components using `jest-expo`
 * - Simulates a browser environment using jsdom
 * - Applies custom setups (like global mocks)
 * - Ensures compatibility with non-standard node_modules (like Expo, @react-navigation)
 * - Supports TypeScript and modern alias imports (e.g., @/utils instead of ../../utils)
 */

module.exports = {
  // Use Expo preset for Jest (handles Expo-specific setup like react-native-web, asset mocks, etc.)
  preset: 'jest-expo',

  // Simulate a browser-like environment in Node.js (required for some React Native libraries)
  testEnvironment: 'jsdom',

  // Setup file to configure test environment before each test run
  setupFiles: ['./jest.setup.js'],

  // Include specific node_modules for transformation (most are ignored by default)
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@react-navigation/.*|@expo-google-fonts/.*)'
  ],

  // Handle import aliases like "@/components/Button" → "src/components/Button"
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Supported file extensions for modules
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
