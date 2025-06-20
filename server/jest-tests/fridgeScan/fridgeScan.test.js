/**
 * Integration Test: fridgeScan.test.js
 * 
 * Purpose:
 * This Jest test verifies the functionality of the /fridge/scan API endpoint.
 * The test covers the following:
 * 1. Creating a test user in Firebase Authentication.
 * 2. Creating a matching user document in Firestore.
 * 3. Signing in the test user to obtain a valid ID token.
 * 4. Sending a sample image of a fridge to the /fridge/scan endpoint.
 * 5. Validating that the response includes detected items from:
 *    - Google Vision API
 *    - YOLOv8 model
 *    - Combined item list
 *    - Public image URL from Firebase Storage
 * 6. Cleaning up the created user and Firestore document after the test.
 * 
 * Notes:
 * - The test uses Supertest to simulate HTTP requests.
 * - Jest timeout is extended due to Firebase + file upload operations.
 * - This test requires a valid Firebase Admin SDK setup and a test image.
 */

require('dotenv/config');
const request = require('supertest');
const path = require('path');
const admin = require('config/firebaseAdmin');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const app = require('@/app');

// Extend Jest timeout (important for async Firebase operations)
jest.setTimeout(20000);

// Initialize Firebase client-side app to simulate sign-in
const firebaseClientApp = initializeApp({
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
});

const clientAuth = getAuth(firebaseClientApp);
const adminAuth = admin.auth();

describe('/scan-fridge API (with user token)', () => {
  // Dummy user credentials for testing
  const testEmail = 'fridge-test@example.com';
  const testPassword = '12345678';

  let testUid = null;   // Will hold the UID of the test user
  let idToken = null;   // Will store the user's Firebase Auth token

  // Setup: runs once before all tests
  beforeAll(async () => {
    // 1. Create a test user in Firebase Authentication (admin SDK)
    const userRecord = await adminAuth.createUser({
      email: testEmail,
      password: testPassword,
    });
    testUid = userRecord.uid;

    // 2. Create a matching Firestore document under "users" collection
    await admin.firestore().collection('users').doc(testUid).set({
      email: testEmail,
      aiFridgeItems: [],
      generatedRecipes: [],
      lastFridgeScan: new Date().toISOString(),
    });

    // 3. Sign in using Firebase client SDK to retrieve a valid ID token
    const userCredential = await signInWithEmailAndPassword(clientAuth, testEmail, testPassword);
    idToken = await userCredential.user.getIdToken();
  });

  // Cleanup: runs once after all tests complete
  afterAll(async () => {
    if (testUid) {
      // Delete the test user from Firebase Auth
      await adminAuth.deleteUser(testUid);

      // Delete the Firestore user document
      await admin.firestore().collection('users').doc(testUid).delete();
    }
  });

  // Main test: sending an image to /fridge/scan and checking the response
  test('Should upload image and return detected labels from /scan-fridge', async () => {
    // Define path to a sample fridge image stored locally
    const imagePath = path.join(__dirname, '../../manual-tests/roboflow_visionModels/images/fridge.jpg');

    // Perform a POST request to the API with the image and ID token
    const res = await request(app)
      .post('/fridge/scan?clearLastScan=true')
      .set('Authorization', `Bearer ${idToken}`)
      .attach('image', imagePath);

    // Debug print: response status and body
    console.log(' Response code:', res.statusCode);
    console.log(' Body:', res.body);

    // Expectations: check structure and content of the response
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('vision');         // Google Vision detection results
    expect(res.body).toHaveProperty('yolo');           // YOLO detection results
    expect(res.body).toHaveProperty('items');          // Merged list of detected items
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body).toHaveProperty('imageUrl');       // Firebase Storage image URL
    expect(typeof res.body.imageUrl).toBe('string');
    expect(res.body.imageUrl.startsWith('https://')).toBe(true);
  });
});
