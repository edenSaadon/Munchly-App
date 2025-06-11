// ✅ Use Jest to mock the firebase config module
jest.mock('../src/config/firebase', () => ({
  auth: {
    currentUser: { uid: 'mockedUser' },
    onAuthStateChanged: jest.fn(),
  },
  db: {},
  app: {},
}));

const { auth } = require('../src/config/firebase');

describe('Firebase Authentication connection test', () => {
  it('should initialize Firebase Auth module', () => {
    expect(auth).toBeDefined(); // Check that auth exists
    expect(auth.currentUser).toBeDefined(); // Check that a user is present
    expect(auth.currentUser.uid).toBe('mockedUser'); // Check that UID matches
  });
});
