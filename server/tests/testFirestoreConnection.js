// testFirestoreConnection.js
const admin = require('./firebaseAdmin'); // הנתיב לקובץ שבו את מאתחלת את firebase-admin

const db = admin.firestore();

async function testFirestoreConnection() {
  try {
    const docRef = db.collection('testCollection').doc('testDoc');
    await docRef.set({ connected: true, timestamp: Date.now() });

    const snapshot = await docRef.get();
    console.log('Document data:', snapshot.data());
  } catch (error) {
    console.error('Firestore test failed:', error);
  }
}

testFirestoreConnection();
