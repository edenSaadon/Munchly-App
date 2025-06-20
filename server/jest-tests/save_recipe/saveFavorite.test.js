/**
 * ================================================================================
 * File: saveFavorite.test.js
 * Purpose:
 * This test checks that a liked recipe can be successfully saved to a user's 
 * `likedRecipes` array in Firestore via the `/users/:uid/like` route.
 *
 * What it does:
 * - Initializes Firebase Client and Admin SDKs
 * - Signs in or creates a test user
 * - Creates a test recipe document in a separate `recipes_test` collection
 * - Sends a POST request to the `/users/:uid/like` endpoint with a valid token
 * - Asserts that the recipe ID was added to the user's `likedRecipes` field
 *
 * After tests:
 * - Deletes the test user and test recipe from Firestore
 * 
 * Requirements:
 * - Firebase Client SDK and Firebase Admin SDK
 * - A test-only recipes collection (`recipes_test`)
 * - The backend route `/users/:uid/like` must exist and validate tokens
 * ================================================================================
 */

require('dotenv/config');
const request = require('supertest');
const admin = require('@/config/firebaseAdmin');
const app = require('@/app');

const { initializeApp } = require('firebase/app');
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
} = require('firebase/auth');

//  Firebase Client SDK config (direct values for test)
const firebaseClientConfig = {
  apiKey: 'AIzaSyCvMohRcj_qH4EwNtIj3uTt8OJt5EOrfFk',
  authDomain: 'munchly-48936.firebaseapp.com',
  projectId: 'munchly-48936',
  storageBucket: 'munchly-48936.appspot.com',
  messagingSenderId: '1003950167016',
  appId: '1:1003950167016:android:6b2818b59c041fa9c30a5d',
};

const firebaseClientApp = initializeApp(firebaseClientConfig);
const clientAuth = getAuth(firebaseClientApp);
const db = admin.firestore();

const USERS_COLLECTION = 'users';
const RECIPES_COLLECTION = 'recipes_test'; // test-only collection for isolation

describe('/users/:uid/like – save recipe (with test collection)', () => {
  const testEmail = 'save-like-test@example.com';
  const testPassword = '123456';
  let testUid;
  let idToken;
  let testRecipeId;

  beforeAll(async () => {
    console.log('🔐 Initializing Firebase Client App...');
    try {
      let cred;
      try {
        console.log('📲 Signing in test user...');
        cred = await signInWithEmailAndPassword(clientAuth, testEmail, testPassword);
      } catch {
        console.warn('👤 User not found, creating...');
        cred = await createUserWithEmailAndPassword(clientAuth, testEmail, testPassword);
      }

      idToken = await cred.user.getIdToken();
      testUid = cred.user.uid;
      console.log(' UID:', testUid);

      // Create a minimal user doc for testing
      await db.collection(USERS_COLLECTION).doc(testUid).set({ likedRecipes: [] });

      // Insert a dummy recipe
      const recipeRef = await db.collection(RECIPES_COLLECTION).add({
        title: 'Test Recipe',
        ingredients: ['ingredient1'],
        instructions: ['Do something'],
        imageUrl: 'https://fakeimage.com/img.png',
        createdBy: testUid,
        source: 'ai',
        createdAt: new Date(),
        likes: 0,
      });
      testRecipeId = recipeRef.id;
      console.log(' Created test recipe ID:', testRecipeId);
    } catch (err) {
      console.error(' Setup failed:', err);
      throw err;
    }
  });

  afterAll(async () => {
    try {
      // Delete user from client + admin
      if (testUid) {
        await clientAuth.currentUser?.delete?.();
        await admin.auth().deleteUser(testUid);
        await db.collection(USERS_COLLECTION).doc(testUid).delete();
      }

      // Delete the dummy recipe
      if (testRecipeId) {
        await db.collection(RECIPES_COLLECTION).doc(testRecipeId).delete();
      }

      console.log(' Cleaned up test user and test recipe.');
    } catch (err) {
      console.warn(' Cleanup warning:', err.message);
    }
  });

  test('Should save recipeId to likedRecipes under user', async () => {
    const res = await request(app)
      .post(`/users/${testUid}/like`)
      .set('Authorization', `Bearer ${idToken}`)
      .send({ recipeId: testRecipeId });

    console.log(' Server response:', res.body);
    expect(res.statusCode).toBe(200);

    const doc = await db.collection(USERS_COLLECTION).doc(testUid).get();
    expect(doc.exists).toBe(true);
    const data = doc.data();
    expect(data?.likedRecipes).toContain(testRecipeId);
  });
});
