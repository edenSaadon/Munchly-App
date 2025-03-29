const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require("../src/secrets/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "munchly-48936.firebasestorage.app", // שימי לב שצריך לשים את הבאקאט שלך
});

const bucket = admin.storage().bucket();

const testStorageUpload = async () => {
  try {
    const file = bucket.file("fake-test.txt");
    await file.save("Just testing Firebase Storage connection");

    console.log("✅ File uploaded successfully to Firebase Storage.");
  } catch (error) {
    console.error("❌ Failed to upload to Firebase Storage:", error.message);
  }
};

testStorageUpload();
