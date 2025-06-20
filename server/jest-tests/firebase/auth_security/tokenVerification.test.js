// tokenVerification.test.js

// ### Purpose ###
// This test verifies that the Firebase Admin SDK can successfully verify an ID token.
// It creates a user, generates a custom token for that user,
// signs in using Firebase Client SDK to get an ID token,
// and finally verifies that token using admin.auth().verifyIdToken().

require('dotenv/config');
const admin = require('../../../src/config/firebaseAdmin'); // Adjust path
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithCustomToken } = require('firebase/auth');

// Firebase Client SDK config for testing (same project as admin)
const firebaseClientApp = initializeApp({
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_IOS,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
});

const clientAuth = getAuth(firebaseClientApp);
const adminAuth = admin.auth();

describe('Firebase Token Verification Test', () => {
  const testEmail = 'tokentest@example.com';
  const testPassword = '123456';
  let testUid = null;
  let idToken = null;

  beforeAll(async () => {
    // 1. Create user in Auth
    const user = await adminAuth.createUser({
      email: testEmail,
      password: testPassword,
    });
    testUid = user.uid;

    // 2. Generate custom token
    const customToken = await adminAuth.createCustomToken(testUid);

    // 3. Sign in via Firebase Client SDK to get ID token
    const userCredential = await signInWithCustomToken(clientAuth, customToken);
    idToken = await userCredential.user.getIdToken();
  });

  afterAll(async () => {
    // Clean up user
    if (testUid) {
      await adminAuth.deleteUser(testUid);
    }
  });

  test('Should verify ID token via Firebase Admin SDK', async () => {
    // 4. Verify token on server side
    const decoded = await adminAuth.verifyIdToken(idToken);

    // 5. Validate UID and structure
    expect(decoded).toHaveProperty('uid', testUid);
    expect(decoded).toHaveProperty('iat'); // issued-at timestamp
    expect(decoded).toHaveProperty('exp'); // expiration
  });
});
