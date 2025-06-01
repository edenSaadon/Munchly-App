// // ### Firebase Admin – Test User Creation ###

// ### Purpose ###
// This Jest test validates both the creation of a Firebase Authentication user
// and the creation of a corresponding Firestore document in the 'users/{uid}' path.

// What it tests:
// 1. Firebase Admin SDK is initialized correctly
// 2. The server can create users in Firebase Authentication
// 3. The server can write a document to Firestore under 'users/{uid}'
// 4. Cleanup removes both the user and the Firestore document

require('dotenv/config');
//const admin = require('../../../src/config/firebaseAdmin'); // Adjust to your actual path
const admin = require('config/firebaseAdmin');
const auth = admin.auth();
const db = admin.firestore();

describe('Firebase Admin - User Creation and Firestore Write Test', () => {
  const testEmail = 'testuser@example.com';
  const testUserData = {
    preferences: {
      vegetarian: true,
      lactoseFree: false,
    },
    createdAt: Date.now(),
  };

  let testUid = null; // Will hold the created user's UID

  // Cleanup before test: delete user and document if they already exist
  beforeAll(async () => {
    try {
      const user = await auth.getUserByEmail(testEmail);
      testUid = user.uid;
      await Promise.all([
        auth.deleteUser(testUid),
        db.collection('users').doc(testUid).delete(),
      ]);
    } catch (_) {
      // User or document may not exist – that's fine
    }
  });

  // Cleanup after test
  afterAll(async () => {
    if (testUid) {
      await Promise.all([
        auth.deleteUser(testUid),
        db.collection('users').doc(testUid).delete(),
      ]);
    }
  });

  test('Should create a user in Firebase Authentication', async () => {
    const userRecord = await auth.createUser({
      email: testEmail,
      password: '123456',
      displayName: 'Test User',
    });

    // Save UID for later cleanup
    testUid = userRecord.uid;

    // Validate user creation
    expect(userRecord).toHaveProperty('uid');
    expect(userRecord.email).toBe(testEmail);
    expect(userRecord.displayName).toBe('Test User');
  });

  test('Should write user data to Firestore at users/{uid}', async () => {
    // Ensure we have a UID from the previous test
    expect(testUid).not.toBeNull();

    // Write document to Firestore
    const userDocRef = db.collection('users').doc(testUid);
    await userDocRef.set(testUserData);

    // Read and verify
    const snapshot = await userDocRef.get();
    const data = snapshot.data();

    expect(snapshot.exists).toBe(true);
    expect(data).toMatchObject(testUserData);
  });
});
