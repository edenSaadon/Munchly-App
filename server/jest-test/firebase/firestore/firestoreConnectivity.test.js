
// ### Script Purpose: Firestore Connectivity Test ###
// Goal:
// This script performs a basic integration test to verify that the backend can successfully connect to Firebase Firestore via the Firebase Admin SDK. It writes a test document to a Firestore collection and reads it back to confirm the connection and data integrity.

// What it tests:
// 1. Whether Firebase Admin SDK is properly initialized
// 2. Whether the Firestore database is accessible
// 3. If read and write operations are working as expected

// Use Case:
// Useful during the setup phase or when troubleshooting Firestore connection issues in a backend server.



// const admin = require('./firebaseAdmin'); // Path to the file where Firebase Admin SDK is initialized

// // Get a reference to the Firestore database
// const db = admin.firestore();

// // Define a function to test Firestore read/write operations
// async function testFirestoreConnection() {
//   try {
//     // Reference a document inside a test collection
//     const docRef = db.collection('testCollection').doc('testDoc');

//     // Write a test object to the document
//     await docRef.set({ connected: true, timestamp: Date.now() });

//     // Read the document back from Firestore
//     const snapshot = await docRef.get();

//     // Log the document content to confirm the data was written and retrieved
//     console.log('Document data:', snapshot.data());
//   } catch (error) {
//     // Log an error message if any Firestore operation fails
//     console.error('Firestore test failed:', error);
//   }
// }

// // Run the test function
// testFirestoreConnection();


// firestoreConnectivity.test.js

// ### Purpose ###
// This Jest test checks that Firebase Firestore is properly connected via the Firebase Admin SDK.
// It writes a test document and reads it back, then deletes it to keep the database clean.

const admin = require('../src/config/firebaseAdmin'); // Adjust the path to match your project structure
const db = admin.firestore();

describe('Firestore Connectivity Test', () => {
  const testCollection = 'testCollection';
  const testDocId = 'testDoc';
  const testRef = db.collection(testCollection).doc(testDocId);

  // Clean up before and after the test in case the doc already exists
  beforeAll(async () => {
    await testRef.delete().catch(() => {});
  });

  afterAll(async () => {
    await testRef.delete().catch(() => {});
  });

  test('Should write and read a document successfully', async () => {
    // Sample data to write
    const testData = {
      connected: true,
      timestamp: Date.now(),
    };

    // Write to Firestore
    await testRef.set(testData);

    // Read it back
    const snapshot = await testRef.get();
    const data = snapshot.data();

    // Assertions
    expect(snapshot.exists).toBe(true);
    expect(data).toMatchObject({ connected: true });
    expect(typeof data.timestamp).toBe('number');
  });
});
