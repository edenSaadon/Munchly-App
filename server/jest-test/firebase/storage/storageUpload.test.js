// // ### Script Summary: Firebase Storage Upload Test ###
// // ### Purpose: ###
// // This script is a manual integration test used to verify that your Node.js server can successfully connect to Firebase Storage using the Firebase Admin SDK. It checks whether a simple text file can be created and uploaded into the specified bucket.

// // What it tests:
// // 1. The correctness of the Firebase service account credentials (serviceAccountKey.json)
// // 2. Whether the Firebase Storage bucket name is correctly configured
// // 3. Whether your server has permission to write to the storage bucket
// // 4.That the Firebase Admin SDK was initialized properly

// // Use Case:
// // Useful during initial setup of Firebase Admin SDK or when debugging storage-related issues in a backend server.

// // Test Type:
// // Manual integration test (run once via Node.js)



// const admin = require("firebase-admin");
// require("dotenv").config();

// // Load the Firebase Admin service account credentials from JSON file
// const serviceAccount = require("../../../src/secrets/serviceAccountKey.json");

// // Initialize the Firebase Admin SDK with the service account and bucket name
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "munchly-48936.firebasestorage.app", // Make sure this matches your Firebase bucket
// });

// // Create a reference to the storage bucket
// const bucket = admin.storage().bucket();

// // Define an async function to upload a simple text file to the bucket
// const testStorageUpload = async () => {
//   try {
//     // Create a new file in the bucket called "fake-test.txt"
//     const file = bucket.file("fake-test.txt");

//     // Write plain text content into the file in Firebase Storage
//     await file.save("Just testing Firebase Storage connection");

//     // Log success message if the upload worked
//     console.log("✅ File uploaded successfully to Firebase Storage.");
//   } catch (error) {
//     // Log error message if the upload failed
//     console.error("❌ Failed to upload to Firebase Storage:", error.message);
//   }
// };

// // Run the test function
// testStorageUpload();

// storageUpload.test.js

// ### Purpose ###
// This Jest test verifies that the Firebase Admin SDK can upload files to Firebase Storage.
// It checks if a test file can be successfully created and saved in the specified storage bucket,
// and removes the file afterward to keep the bucket clean.

const admin = require('../../../src/config/firebaseAdmin'); // Adjust the path to your firebaseAdmin setup
const bucket = admin.storage().bucket();

describe('Firebase Storage Upload Test', () => {
  const testFileName = 'fake-test.txt';
  const fileRef = bucket.file(testFileName);

  // Optional: Delete the file before and after the test to keep the bucket clean
  beforeAll(async () => {
    await fileRef.delete().catch(() => {});
  });

  afterAll(async () => {
    await fileRef.delete().catch(() => {});
  });

  test('Should upload a simple text file to Firebase Storage', async () => {
    const fileContent = 'Just testing Firebase Storage connection';

    // Upload the test file
    await fileRef.save(fileContent, {
      metadata: { contentType: 'text/plain' },
    });

    // Verify that the file now exists in the bucket
    const [exists] = await fileRef.exists();
    expect(exists).toBe(true);

    // Optionally: Download and verify file content
    const [downloadedBuffer] = await fileRef.download();
    const downloadedText = downloadedBuffer.toString();
    expect(downloadedText).toBe(fileContent);
  });
});
