// const admin = require("firebase-admin");

// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// //const serviceAccount = require("../secrets/serviceAccountKey.json"); // בשימוש עם ENV
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "munchly-48936", // Firebase Storage Bucket
// });

// console.log("✅ Firebase Admin initialized from config!");

// module.exports = admin;


const admin = require("firebase-admin");
const fs = require("fs");
require("dotenv").config(); // טוען את משתני הסביבה מקובץ .env

// טוען את קובץ ה-JSON מתוך ENV (כפי שאתה מגדיר ב-ENV)
const serviceAccount = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));

if (!serviceAccount) {
  console.error("❌ Google service account JSON not found!");
  process.exit(1);
}

// אתחול Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "munchly-48936", // שם ה-bucket שלך
});

console.log("✅ Firebase Admin initialized from config!");

module.exports = admin;
