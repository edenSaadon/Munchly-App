const admin = require("firebase-admin");
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
//const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "munchly-48936.appspot.com", // Firebase Storage Bucket
});

console.log("✅ Firebase Admin initialized from config!");

module.exports = admin;

