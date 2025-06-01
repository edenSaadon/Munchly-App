// // ### Script Summary: Firebase Storage Upload Test ###
// storageUpload.test.js

// ### Purpose ###
// This Jest test verifies that the Firebase Admin SDK can upload files to Firebase Storage.
// It checks if a test file can be successfully created and saved in the specified storage bucket,
// and removes the file afterward to keep the bucket clean.

// // What it tests:
// // 1. The correctness of the Firebase service account credentials (serviceAccountKey.json)
// // 2. Whether the Firebase Storage bucket name is correctly configured
// // 3. Whether your server has permission to write to the storage bucket
// // 4.That the Firebase Admin SDK was initialized properly

// // Use Case:
// // Useful during initial setup of Firebase Admin SDK or when debugging storage-related issues in a backend server.



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
