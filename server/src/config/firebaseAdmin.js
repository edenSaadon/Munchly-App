// ==============================================
// Firebase Admin Initialization Configuration
// ==============================================
//
// Purpose:
// This module initializes the Firebase Admin SDK using service account credentials.
// It sets up access to Firebase services such as Firestore and Storage from the backend.
//
// Behavior:
// - Loads environment variables from the .env file.
// - Reads the Google service account JSON file defined in GOOGLE_APPLICATION_CREDENTIALS.
// - Initializes Firebase Admin with the loaded credentials and the configured storage bucket.
//
// Usage:
// This file should be imported anywhere Firebase Admin access is needed (e.g., Firestore reads/writes, image uploads).
// Example: `const admin = require('./config/firebaseAdmin');`

const admin = require("firebase-admin");
const fs = require("fs");
require("dotenv").config(); // Loads environment variables from the .env file

// Load the Google service account JSON credentials from the path defined in the environment variable
const serviceAccount = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));

// Validate that the service account was successfully loaded
if (!serviceAccount) {
  console.error("Google service account JSON not found!");
  process.exit(1);
}

// Initialize Firebase Admin SDK with credentials and storage bucket
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "munchly-48936", // Your Firebase Storage bucket name
});

// Confirmation log indicating that Firebase Admin has been successfully initialized
console.log(" Firebase Admin initialized from config!");

// Export the initialized Firebase Admin instance for use across the project
module.exports = admin;
