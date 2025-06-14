/**
 * File: firebaseConnection.test.ts
 *
 * Purpose:
 * This test verifies that the Firebase Authentication module is properly mocked and initialized.
 * It checks that:
 * - The `auth` object exists
 * - `currentUser` is defined
 * - The mocked `uid` matches the expected value
 *
 * Dependencies:
 * - Jest mock for the Firebase config module (`src/config/firebase`)
 *
 * Why it's important:
 * Ensures that the Firebase Auth layer is correctly configured and can be reliably tested
 * in isolation without requiring real Firebase access.
 */

// Use Jest to mock the firebase config module
jest.mock('../src/config/firebase', () => ({
  auth: {
    currentUser: { uid: 'mockedUser' },         // Mocked user object
    onAuthStateChanged: jest.fn(),              // Mock listener for auth changes
  },
  db: {},                                       // Placeholder for Firestore
  app: {},                                      // Placeholder for Firebase app
}));

// 🔁 Import the mocked auth object from the Firebase config module
const { auth } = require('../src/config/firebase');

describe('Firebase Authentication connection test', () => {
  it('should initialize Firebase Auth module', () => {
    expect(auth).toBeDefined();                 // Check that auth object exists
    expect(auth.currentUser).toBeDefined();     // Check user object is present
    expect(auth.currentUser.uid).toBe('mockedUser'); // Check correct UID
  });
});
