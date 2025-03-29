require("dotenv").config(); // מוסיף את משתני הסביבה מה־.env
const admin = require("../src/config/firebaseAdmin");

const createTestUser = async () => {
  try {
    const userRecord = await admin.auth().createUser({
      email: "testuser@example.com",
      password: "123456",
      displayName: "Test User",
    });

    console.log("✅ Test user created:", userRecord.uid);
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
  }
};

createTestUser();
