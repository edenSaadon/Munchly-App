// // ### Script Purpose: Firebase Admin – Test User Creation ###
// // Goal:
// // This script performs a basic test using the Firebase Admin SDK to create a user account in Firebase Authentication. It verifies that the server has permission to create users and that the Admin SDK is configured correctly.

// // What it tests:
// // 1. Firebase Admin SDK initialization
// // 2. Firebase Authentication write access (creating a new user)
// // 3. Proper handling of environment configuration (via .env)
// // 4. Logging success or failure of the operation

// // Use Case:
// // Helpful during backend setup or CI environments to ensure user management operations are functioning as expected.


// require("dotenv").config(); // Load environment variables from the .env file
// const admin = require("../../../src/config/firebaseAdmin"); // Import initialized Firebase Admin SDK

// // Define a function to create a test user in Firebase Authentication
// const createTestUser = async () => {
//   try {
//     // Use Firebase Admin to create a new user with email, password, and display name
//     const userRecord = await admin.auth().createUser({
//       email: "testuser@example.com",
//       password: "123456",
//       displayName: "Test User",
//     });

//     // Log the UID of the created user on success
//     console.log("✅ Test user created:", userRecord.uid);
//   } catch (error) {
//     // Log an error if user creation fails
//     console.error("❌ Error creating user:", error.message);
//   }
// };

// // Run the test function
// createTestUser();

// createUser.test.js

// ### Purpose ###
// This Jest test validates both the creation of a Firebase Authentication user
// and the creation of a corresponding Firestore document in the 'users/{uid}' path.

// What it tests:
// 1. Firebase Admin SDK is initialized correctly
// 2. The server can create users in Firebase Authentication
// 3. The server can write a document to Firestore under 'users/{uid}'
// 4. Cleanup removes both the user and the Firestore document

require('dotenv/config');
const admin = require('../../src/config/firebaseAdmin'); // Adjust to your actual path

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
