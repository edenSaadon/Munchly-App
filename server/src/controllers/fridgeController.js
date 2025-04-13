// const vision = require('@google-cloud/vision');
// const client = new vision.ImageAnnotatorClient();
// const admin = require('../config/firebaseAdmin');
// const { addFridgeSnapshot } = require('../models/UserModel');
// const { v4: uuidv4 } = require('uuid');

// const bucket = admin.storage().bucket(); // ← ברירת מחדל: bucket של Firebase

// const scanFridgeHandler = async (req, res) => {
//   try {
//     const chunks = [];
//     req.on('data', chunk => chunks.push(chunk));
//     req.on('end', async () => {
//       const buffer = Buffer.concat(chunks);
//       const uid = req.user?.uid;
//       if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//       // 🔽 שלב 1: העלאת התמונה ל־Storage
//       const filename = `fridge-scans/${uid}_${Date.now()}.jpg`;
//       const file = bucket.file(filename);
//       const uuid = uuidv4(); // ליצירת קישור ציבורי חתום

//       await file.save(buffer, {
//         metadata: {
//           contentType: 'image/jpeg',
//           metadata: {
//             firebaseStorageDownloadTokens: uuid,
//           },
//         },
//         resumable: false,
//       });

//       const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media&token=${uuid}`;

//       // 🔽 שלב 2: שליחת התמונה ל-Google Vision
//       const [result] = await client.labelDetection({ image: { content: buffer } });
//       const labels = result.labelAnnotations.map(label => label.description);

//       console.log('📷 Vision labels:', labels);

//       // 🔽 שלב 3: שמירה במסמך המשתמש
//       await addFridgeSnapshot(uid, labels, imageUrl);

//       res.status(200).json({ items: labels, imageUrl });
//     });
//   } catch (error) {
//     console.error('❌ Error during vision scan:', error);
//     res.status(500).json({ message: 'Vision scan failed' });
//   }
// };

// // ✅ זה היה חסר!
// module.exports = { scanFridgeHandler };

// const vision = require('@google-cloud/vision');
// const admin = require('firebase-admin');
// const fs = require('fs');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// // אתחול Firebase Admin SDK
// const serviceAccount = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'munchly-48936', // שם ה-bucket שלך
// });

// const bucket = admin.storage().bucket(); // יצירת אובייקט bucket של Firebase Storage

// // אתחול Google Vision API
// const visionClient = new vision.ImageAnnotatorClient();

// // פונקציה להעלות את התמונה לפיירבייס
// async function uploadImage(buffer, fileName) {
//   try {
//     const file = bucket.file(`fridge-scans/${fileName}.jpg`);
    
//     await file.save(buffer, {
//       metadata: {
//         contentType: 'image/jpeg',
//       },
//     });

//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/fridge-scans/${fileName}.jpg`;
//     console.log('File uploaded successfully:', publicUrl);
//     return publicUrl; // מחזיר את ה-URL של התמונה
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// }

// // פונקציה לשלוח את התמונה ל-Google Vision
// async function sendToGoogleVision(imageBuffer) {
//   try {
//     const [result] = await visionClient.labelDetection({ image: { content: imageBuffer } });
//     const labels = result.labelAnnotations.map(label => label.description);
//     console.log('📷 Google Vision labels:', labels);
//     return labels;
//   } catch (error) {
//     console.error('Error with Google Vision API:', error);
//     throw new Error('Google Vision API failed');
//   }
// }

// // פונקציה שמבצעת את כל התהליך
// const scanFridgeHandler = async (req, res) => {
//   try {
//     const chunks = [];
//     req.on('data', chunk => chunks.push(chunk));
//     req.on('end', async () => {
//       const buffer = Buffer.concat(chunks);
//       const uid = req.user?.uid;
//       if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//       // שלב 1: העלאת התמונה לפיירבייס
//       const fileName = `fridge-scans/${uid}_${Date.now()}`;
//       const imageUrl = await uploadImage(buffer, fileName);

//       // שלב 2: שליחת התמונה ל-Google Vision
//       const labels = await sendToGoogleVision(buffer);

//       console.log("📷 Vision labels:", labels);

//       // שלב 3: החזרת התוצאה ללקוח
//       res.status(200).json({
//         items: labels,
//         imageUrl,
//       });
//     });
//   } catch (error) {
//     console.error('Error during fridge scan:', error);
//     res.status(500).json({ message: 'Scan failed' });
//   }
// };

// module.exports = { scanFridgeHandler };

// הקובץ הטוב
// const vision = require('@google-cloud/vision');
// const admin = require('../config/firebaseAdmin'); // כולל את הקונפיג של Firebase Admin
// const { v4: uuidv4 } = require('uuid');

// // אתחול Google Vision API
// const visionClient = new vision.ImageAnnotatorClient();

// // יצירת אובייקט bucket של Firebase Storage
// const bucket = admin.storage().bucket(); // משתמש ב-bucket שהגדרת בקובץ config

// // פונקציה להעלות את התמונה לפיירבייס
// async function uploadImage(buffer, fileName) {
//   try {
//     const file = bucket.file(`fridge-scans/${fileName}.jpg`);

//     await file.save(buffer, {
//       metadata: {
//         contentType: 'image/jpeg',
//       },
//     });

//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/fridge-scans/${fileName}.jpg`;

//     console.log('File uploaded successfully:', publicUrl);
//     return publicUrl; // מחזיר את ה-URL של התמונה
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// }

// // פונקציה לשלוח את התמונה ל-Google Vision
// async function sendToGoogleVision(imageBuffer) {
//   try {
//     const [result] = await visionClient.labelDetection({ image: { content: imageBuffer } });
//     const labels = result.labelAnnotations.map(label => label.description);
//     console.log('📷 Google Vision labels:', labels);
//     return labels;
//   } catch (error) {
//     console.error('Error with Google Vision API:', error);
//     throw new Error('Google Vision API failed');
//   }
// }

// // פונקציה שמבצעת את כל התהליך
// const scanFridgeHandler = async (req, res) => {
//   try {
//     const chunks = [];
//     req.on('data', chunk => chunks.push(chunk));
//     req.on('end', async () => {
//       const buffer = Buffer.concat(chunks);
//       const uid = req.user?.uid;
//       if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//       // שלב 1: העלאת התמונה לפיירבייס
//       const fileName = `fridge-scans/${uid}_${Date.now()}`;
//       const imageUrl = await uploadImage(buffer, fileName);

//       // שלב 2: שליחת התמונה ל-Google Vision
//       const labels = await sendToGoogleVision(buffer);

//       console.log("📷 Vision labels:", labels);

//       // שלב 3: החזרת התוצאה ללקוח
//       res.status(200).json({
//         items: labels,
//         imageUrl,
//       });
//     });
//   } catch (error) {
//     console.error('Error during fridge scan:', error);
//     res.status(500).json({ message: 'Scan failed' });
//   }
// };

// module.exports = { scanFridgeHandler };

// src/controllers/fridgeController.js
const { addFridgeSnapshot } = require('../models/UserModel');
const vision = require('@google-cloud/vision');
const admin = require('../config/firebaseAdmin'); // כולל את הקונפיג של Firebase Admin
const { v4: uuidv4 } = require('uuid');

// אתחול Google Vision API
const visionClient = new vision.ImageAnnotatorClient();

// יצירת אובייקט bucket של Firebase Storage
const bucket = admin.storage().bucket(); // משתמש ב-bucket שהגדרת בקובץ config

// פונקציה להעלות את התמונה לפיירבייס
async function uploadImage(buffer, fileName) {
  try {
    const file = bucket.file(`fridge-scans/${fileName}.jpg`);

    await file.save(buffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/fridge-scans/${fileName}.jpg`;

    console.log('File uploaded successfully:', publicUrl);
    return publicUrl; // מחזיר את ה-URL של התמונה
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// פונקציה לשלוח את התמונה ל-Google Vision
async function sendToGoogleVision(imageBuffer) {
  try {
    const [result] = await visionClient.labelDetection({ image: { content: imageBuffer } });
    const labels = result.labelAnnotations.map(label => label.description);
    console.log('📷 Google Vision labels:', labels);
    return labels;
  } catch (error) {
    console.error('Error with Google Vision API:', error);
    throw new Error('Google Vision API failed');
  }
}

// הגדרת הפונקציה לעדכון סטטוס סריקה
async function updateLastScanStatus(uid, status) {
  try {
    const userRef = admin.firestore().collection('users').doc(uid);

    // עדכון סטטוס הסריקה במסד הנתונים
    await userRef.update({
      lastScanStatus: status, // הסטטוס יכול להיות "scanned" או "deleted"
    });

    console.log(`✅ Last scan status updated for UID: ${uid} to ${status}`);
  } catch (error) {
    console.error('❌ Error updating scan status:', error);
    throw new Error('Failed to update scan status');
  }
}

// פונקציית סריקת המקרר
const scanFridgeHandler = async (req, res) => {
  try {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ message: 'User not authenticated' });

      // שלב 1: עדכון סטטוס סריקה
      const lastScanStatus = req.query.clearLastScan === 'true' ? 'deleted' : 'scanned';
      await updateLastScanStatus(uid, lastScanStatus); // קריאה לפונקציה כדי לעדכן את הסטטוס של הסריקה

      // אם יש בקשה למחוק את הסריקה האחרונה
      if (req.query.clearLastScan === 'true') {
        await deleteLastFridgeScan(uid); // נמחק את הסריקה האחרונה אם יש צורך
      }

      // שלב 2: העלאת התמונה לפיירבייס
      const fileName = `fridge-scans/${uid}_${Date.now()}`;
      const imageUrl = await uploadImage(buffer, fileName);

      // שלב 3: שליחת התמונה ל-Google Vision
      const labels = await sendToGoogleVision(buffer);

      // שלב 4: שמירה במסמך המשתמש ב-Firebase Firestore
      await addFridgeSnapshot(uid, labels, imageUrl);

      res.status(200).json({
        items: labels,
        imageUrl,
      });
    });
  } catch (error) {
    console.error('Error during fridge scan:', error);
    res.status(500).json({ message: 'Scan failed' });
  }
};



module.exports = { scanFridgeHandler };
