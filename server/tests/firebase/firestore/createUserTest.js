// ### Script Purpose: Firebase Admin – Test User Creation ###
// Goal:
// This script performs a basic test using the Firebase Admin SDK to create a user account in Firebase Authentication. It verifies that the server has permission to create users and that the Admin SDK is configured correctly.

// What it tests:
// 1. Firebase Admin SDK initialization
// 2. Firebase Authentication write access (creating a new user)
// 3. Proper handling of environment configuration (via .env)
// 4. Logging success or failure of the operation

// Use Case:
// Helpful during backend setup or CI environments to ensure user management operations are functioning as expected.


require("dotenv").config(); // Load environment variables from the .env file
const admin = require("../../../src/config/firebaseAdmin"); // Import initialized Firebase Admin SDK

// Define a function to create a test user in Firebase Authentication
const createTestUser = async () => {
  try {
    // Use Firebase Admin to create a new user with email, password, and display name
    const userRecord = await admin.auth().createUser({
      email: "testuser@example.com",
      password: "123456",
      displayName: "Test User",
    });

    // Log the UID of the created user on success
    console.log("✅ Test user created:", userRecord.uid);
  } catch (error) {
    // Log an error if user creation fails
    console.error("❌ Error creating user:", error.message);
  }
};

// Run the test function
createTestUser();
