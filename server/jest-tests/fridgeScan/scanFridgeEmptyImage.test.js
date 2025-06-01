/**
 * File: jest-tests/fridgeScan/scanFridgeEmptyImage.test.js
 *
 * Purpose:
 * This test checks that the /fridge/scan endpoint properly handles an invalid image upload case.
 * Specifically, it tests the behavior when an empty image file (zero bytes) is sent.
 *
 * Test flow:
 * 1. Create a temporary Firebase Auth test user and sign in.
 * 2. Generate an ID token for authentication.
 * 3. Create an empty image file (empty.jpg) and upload it to /fridge/scan.
 * 4. Expect the server to respond with an error (400 or 500).
 * 5. Clean up the test user and temporary file.
 */

require('dotenv/config');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const admin = require('config/firebaseAdmin');
const { initializeApp } = require('firebase/app');
const {
  getAuth,
  signInWithEmailAndPassword,
} = require('firebase/auth');
const app = require('@/app');

// Initialize Firebase client app to retrieve ID token
const firebaseClientApp = initializeApp({
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
});
const clientAuth = getAuth(firebaseClientApp);
const adminAuth = admin.auth();

describe('/scan-fridge – empty image test (with user token)', () => {
  const testEmail = 'empty-image-test@example.com';
  const testPassword = '12345678';
  let testUid;
  let idToken;

  // Create Firebase Auth user and get ID token
  beforeAll(async () => {
    const user = await adminAuth.createUser({ email: testEmail, password: testPassword });
    testUid = user.uid;

    const cred = await signInWithEmailAndPassword(clientAuth, testEmail, testPassword);
    idToken = await cred.user.getIdToken();
  });

  // Clean up Firebase user
  afterAll(async () => {
    if (testUid) await adminAuth.deleteUser(testUid);
  });

  test(
    'Should return 400 or 500 on empty image',
    async () => {
      // Create an empty image file
      const imagePath = path.join(__dirname, 'empty.jpg');
      fs.writeFileSync(imagePath, '');

      // Send request with empty image file
      const res = await request(app)
        .post('/fridge/scan')
        .set('Authorization', `Bearer ${idToken}`)
        .attach('image', imagePath);

      // Delete the temporary image file
      fs.unlinkSync(imagePath);

      // Expect an error response (400 or 500)
      expect([400, 500]).toContain(res.statusCode);
    },
    15000 // Extend timeout to allow for async operations
  );
});
