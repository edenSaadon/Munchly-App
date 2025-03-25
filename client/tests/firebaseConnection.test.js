// tests/firebaseConnection.test.js
const { getAuth } = require('firebase/auth');
const { auth } = require('../src/config/firebaseConfig');

describe('🔥 Firebase Authentication connection test', () => {
  it('should initialize Firebase Auth module', () => {
    expect(auth).toBeDefined();
    expect(auth).toBe(getAuth());
  });

  it('should contain currentUser property', () => {
    expect('currentUser' in auth).toBe(true);
  });

  it('auth.signOut should be a function', () => {
    expect(typeof auth.signOut).toBe('function');
  });
});
