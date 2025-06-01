/**
 * ============================================================================
 * File: userProfile.test.js
 * Purpose:
 * This Jest test validates the `/users/profile` endpoint using Firebase Authentication.
 * 
 * What it does:
 * - Initializes Firebase Client SDK
 * - Signs in (or creates) a test user using Firebase Auth
 * - Generates an ID token from the client side
 * - Sends a GET request to the `/users/profile` endpoint with the token
 * - Expects a valid user profile response
 * 
 * After tests:
 * - Deletes the test user to keep Firebase clean
 *
 * Requirements:
 * - Firebase Admin SDK and Firebase Client SDK must be correctly configured
 * - The `/users/profile` route must validate the ID token and return user data
 * ============================================================================
 */

global.fetch = require('node-fetch'); // Required for Firebase Client SDK in Node.js

const request = require('supertest');
const { initializeApp } = require('firebase/app');
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
} = require('firebase/auth');

const admin = require('../../src/config/firebaseAdmin'); // Firebase Admin initialized
const app = require('../../src/app'); // Express app

// Test credentials
const testEmail = 'test-user-profile@munchly.com';
const testPassword = 'test1234';
let uid = '';
let idToken = '';
let clientAuth;

// Firebase Client configuration
const firebaseClientConfig = {
  apiKey: 'AIzaSyCvMohRcj_qH4EwNtIj3uTt8OJt5EOrfFk',
  authDomain: 'munchly-48936.firebaseapp.com',
  projectId: 'munchly-48936',
  storageBucket: 'munchly-48936.appspot.com',
  messagingSenderId: '1003950167016',
  appId: '1:1003950167016:android:6b2818b59c041fa9c30a5d',
};

beforeAll(async () => {
  console.log('🔐 Initializing Firebase Client App...');
  const firebaseClientApp = initializeApp(firebaseClientConfig);
  clientAuth = getAuth(firebaseClientApp);

  try {
    console.log('📲 Signing in test user...');
    let cred;
    try {
      // Try to sign in
      cred = await signInWithEmailAndPassword(clientAuth, testEmail, testPassword);
    } catch (err) {
      console.warn('👤 User not found, creating...');
      // Create if not found
      cred = await createUserWithEmailAndPassword(clientAuth, testEmail, testPassword);
    }

    idToken = await cred.user.getIdToken();
    uid = cred.user.uid;
    console.log('✅ UID:', uid);

    // Add to Firestore
    await admin.firestore().collection('users').doc(uid).set({
      email: testEmail,
      uid: uid,
      createdAt: new Date().toISOString(),
      test: true,
    });
  } catch (error) {
    console.error('❌ Error during beforeAll:', error.message);
    throw error;
  }
});

afterAll(async () => {
  try {
    const user = clientAuth.currentUser;
    if (user) {
      await deleteUser(user);
      console.log('🧹 Test user deleted.');
    }
  } catch (err) {
    console.warn('⚠️ Could not delete test user:', err.message);
  }
});

// Test: GET /users/profile with valid token
describe('/users/profile – valid token', () => {
  test('Should return profile info with valid token', async () => {
    const res = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${idToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('uid', uid);
    expect(res.body).toHaveProperty('email', testEmail);
  });
});
