// jest.config.js

module.exports = {
    // Use Expo preset for Jest (handles Expo-specific configs)
    preset: 'jest-expo',
  
    // Use jsdom to simulate browser-like environment (needed for some React Native features)
    testEnvironment: 'jsdom',
  
    // File that runs before every test (e.g., mocks or global config)
    setupFiles: ['./jest.setup.js'],
  
    // Transpile these specific node_modules even if they are normally ignored
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@react-navigation/.*|@expo-google-fonts/.*)'
    ],
  
    // Support for path aliases like @/src/...
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  
    // Supported file extensions for modules
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  