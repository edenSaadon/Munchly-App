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

// // 22src/controllers/fridgeController.js
// const { addFridgeSnapshot } = require('../models/UserModel');
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
//         contentType: 'image/jpg',
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

// // הגדרת הפונקציה לעדכון סטטוס סריקה
// async function updateLastScanStatus(uid, status) {
//   try {
//     const userRef = admin.firestore().collection('users').doc(uid);

//     // עדכון סטטוס הסריקה במסד הנתונים
//     await userRef.update({
//       lastScanStatus: status, // הסטטוס יכול להיות "scanned" או "deleted"
//     });

//     console.log(`✅ Last scan status updated for UID: ${uid} to ${status}`);
//   } catch (error) {
//     console.error('❌ Error updating scan status:', error);
//     throw new Error('Failed to update scan status');
//   }
// }

// // פונקציית סריקת המקרר
// const scanFridgeHandler = async (req, res) => {
//   try {
//     const chunks = [];
//     req.on('data', chunk => chunks.push(chunk));
//     req.on('end', async () => {
//       const buffer = Buffer.concat(chunks);
//       const uid = req.user?.uid;
//       if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//       // שלב 1: עדכון סטטוס סריקה
//       const lastScanStatus = req.query.clearLastScan === 'true' ? 'deleted' : 'scanned';
//       await updateLastScanStatus(uid, lastScanStatus); // קריאה לפונקציה כדי לעדכן את הסטטוס של הסריקה

//       // אם יש בקשה למחוק את הסריקה האחרונה
//       if (req.query.clearLastScan === 'true') {
//         await deleteLastFridgeScan(uid); // נמחק את הסריקה האחרונה אם יש צורך
//       }

//       // שלב 2: העלאת התמונה לפיירבייס
//       const fileName = `fridge-scans/${uid}_${Date.now()}`;
//       const imageUrl = await uploadImage(buffer, fileName);

//       // שלב 3: שליחת התמונה ל-Google Vision
//       const labels = await sendToGoogleVision(buffer);

//       // שלב 4: שמירה במסמך המשתמש ב-Firebase Firestore
//       await addFridgeSnapshot(uid, labels, imageUrl);

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


// const { addFridgeSnapshot } = require('../models/UserModel');
// const vision = require('@google-cloud/vision');
// const admin = require('../config/firebaseAdmin');
// const { v4: uuidv4 } = require('uuid');

// // אתחול Google Vision API
// const visionClient = new vision.ImageAnnotatorClient();

// // יצירת אובייקט bucket של Firebase Storage
// const bucket = admin.storage().bucket();

// // פונקציה להעלות את התמונה לפיירבייס
// async function uploadImage(buffer, fileName) {
//   try {
//     const file = bucket.file(`fridge-scans/${fileName}.jpg`);

//     await file.save(buffer, {
//       metadata: {
//         contentType: 'image/jpeg',
//         metadata: {
//           firebaseStorageDownloadTokens: uuidv4(), // כולל טוקן
//         },
//       },
//     });

//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/fridge-scans/${fileName}.jpg`;
//     console.log('File uploaded successfully:', publicUrl);
//     return publicUrl;
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

// // פונקציית עדכון סטטוס סריקה
// async function updateLastScanStatus(uid, status) {
//   try {
//     const userRef = admin.firestore().collection('users').doc(uid);
//     await userRef.update({ lastScanStatus: status });
//     console.log(`✅ Last scan status updated for UID: ${uid} to ${status}`);
//   } catch (error) {
//     console.error('❌ Error updating scan status:', error);
//     throw new Error('Failed to update scan status');
//   }
// }

// // פונקציית סריקת מקרר
// const scanFridgeHandler = async (req, res) => {
//   try {
//     const buffer = req.file?.buffer;
//     if (!buffer || buffer.length === 0) {
//       return res.status(400).json({ message: 'No image buffer received' });
//     }

//     const uid = req.user?.uid;
//     if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//     const lastScanStatus = req.query.clearLastScan === 'true' ? 'deleted' : 'scanned';
//     await updateLastScanStatus(uid, lastScanStatus);

//     if (req.query.clearLastScan === 'true') {
//       await deleteLastFridgeScan(uid); // אם קיימת הפונקציה הזו אצלך
//     }

//     const fileName = `${uid}_${Date.now()}`;
//     const imageUrl = await uploadImage(buffer, fileName);

//     const labels = await sendToGoogleVision(buffer);

//     await addFridgeSnapshot(uid, labels, imageUrl);

//     res.status(200).json({ items: labels, imageUrl });
//   } catch (error) {
//     console.error('Error during fridge scan:', error);
//     res.status(500).json({ message: 'Scan failed' });
//   }
// };

// module.exports = { scanFridgeHandler };


// const { addFridgeSnapshot } = require('../models/userModel');
// const vision = require('@google-cloud/vision');
// const admin = require('../config/firebaseAdmin');
// const { v4: uuidv4 } = require('uuid');

// // אתחול Google Vision API
// const visionClient = new vision.ImageAnnotatorClient();

// // יצירת אובייקט bucket של Firebase Storage
// const bucket = admin.storage().bucket();

// // פונקציה להעלות את התמונה לפיירבייס
// async function uploadImage(buffer, fileName) {
//   try {
//     const file = bucket.file(`fridge-scans/${fileName}.jpg`);

//     await file.save(buffer, {
//       metadata: {
//         contentType: 'image/jpeg',
//         metadata: {
//           firebaseStorageDownloadTokens: uuidv4(), // כולל טוקן
//         },
//       },
//     });

//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/fridge-scans/${fileName}.jpg`;
//     console.log('File uploaded successfully:', publicUrl);
//     return publicUrl;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// }

// // פונקציה לשלוח את התמונה ל-Google Vision (Object Detection במקום Label Detection)
// async function sendToGoogleVision(imageBuffer) {
//   try {
//     const [result] = await visionClient.objectLocalization({ image: { content: imageBuffer } });
//     const labels = result.localizedObjectAnnotations.map(obj => obj.name);
//     console.log('📷 Google Vision detected objects:', labels);
//     return labels;
//   } catch (error) {
//     console.error('Error with Google Vision API:', error);
//     throw new Error('Google Vision API failed');
//   }
// }

// // פונקציית עדכון סטטוס סריקה
// async function updateLastScanStatus(uid, status) {
//   try {
//     const userRef = admin.firestore().collection('users').doc(uid);
//     await userRef.update({ lastScanStatus: status });
//     console.log(`✅ Last scan status updated for UID: ${uid} to ${status}`);
//   } catch (error) {
//     console.error('❌ Error updating scan status:', error);
//     throw new Error('Failed to update scan status');
//   }
// }

// // פונקציית סריקת מקרר
// const scanFridgeHandler = async (req, res) => {
//   try {
//     const buffer = req.file?.buffer;
//     if (!buffer || buffer.length === 0) {
//       return res.status(400).json({ message: 'No image buffer received' });
//     }

//     const uid = req.user?.uid;
//     if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//     const lastScanStatus = req.query.clearLastScan === 'true' ? 'deleted' : 'scanned';
//     await updateLastScanStatus(uid, lastScanStatus);

//     if (req.query.clearLastScan === 'true') {
//       await deleteLastFridgeScan(uid); // אם קיימת הפונקציה הזו אצלך
//     }

//     const fileName = `${uid}_${Date.now()}`;
//     const imageUrl = await uploadImage(buffer, fileName);

//     const labels = await sendToGoogleVision(buffer);

//     await addFridgeSnapshot(uid, labels, imageUrl);

//     res.status(200).json({ items: labels, imageUrl });
//   } catch (error) {
//     console.error('Error during fridge scan:', error);
//     res.status(500).json({ message: 'Scan failed' });
//   }
// };

// // module.exports = { scanFridgeHandler };


// const { addFridgeSnapshot } = require('../models/userModel');
// const vision = require('@google-cloud/vision');
// const admin = require('../config/firebaseAdmin');
// const axios = require('axios');
// const { v4: uuidv4 } = require('uuid');

// // אתחול Google Vision API
// const visionClient = new vision.ImageAnnotatorClient();
// const bucket = admin.storage().bucket();

// const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// // העלאת תמונה ל-Firebase
// async function uploadImage(buffer, fileName) {
//   try {
//     const file = bucket.file(`fridge-scans/${fileName}.jpg`);
//     await file.save(buffer, {
//       metadata: {
//         contentType: 'image/jpeg',
//         metadata: {
//           firebaseStorageDownloadTokens: uuidv4(),
//         },
//       },
//     });
//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/fridge-scans/${fileName}.jpg`;
//     console.log('✅ File uploaded:', publicUrl);
//     return publicUrl;
//   } catch (error) {
//     console.error('❌ Upload error:', error);
//     throw new Error('Failed to upload image');
//   }
// }

// // שליחה ל-Google Vision
// async function sendToGoogleVision(imageBuffer) {
//   try {
//     const [result] = await visionClient.objectLocalization({ image: { content: imageBuffer } });
//     const labels = result.localizedObjectAnnotations.map(obj => obj.name);
//     console.log('📷 Google Vision labels:', labels);
//     return labels;
//   } catch (error) {
//     console.error('❌ Google Vision error:', error);
//     return [];
//   }
// }

// // שליחה ל-YOLOv8 (Replicate)
// async function sendToReplicateYOLO(imageUrl) {
//   try {
//     const start = await axios.post('https://api.replicate.com/v1/predictions', {
//       version: 'ef0caa7cddaa2982bfc4aeed1f44b34ad02c8b7c3a3d214bc21f149a0bf65c39',
//       input: { image: imageUrl },
//     }, {
//       headers: {
//         Authorization: `Token ${REPLICATE_API_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const statusUrl = start.data.urls.get;
//     let output;

//     while (true) {
//       const res = await axios.get(statusUrl, {
//         headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` },
//       });
//       if (res.data.status === 'succeeded') {
//         output = res.data.output;
//         break;
//       } else if (res.data.status === 'failed') {
//         throw new Error('YOLOv8 API failed');
//       }
//       await new Promise(r => setTimeout(r, 1500));
//     }

//     const yoloLabels = output.map(obj => obj.class);
//     console.log('🧠 YOLOv8 labels:', yoloLabels);
//     return [...new Set(yoloLabels)];
//   } catch (err) {
//     console.error('❌ Replicate YOLO error:', err.message);
//     return [];
//   }
// }

// // עדכון סטטוס
// async function updateLastScanStatus(uid, status) {
//   try {
//     const userRef = admin.firestore().collection('users').doc(uid);
//     await userRef.update({ lastScanStatus: status });
//   } catch (error) {
//     console.error('❌ Failed to update scan status:', error);
//   }
// }

// // סריקה
// const scanFridgeHandler = async (req, res) => {
//   try {
//     const buffer = req.file?.buffer;
//     const uid = req.user?.uid;
//     if (!uid || !buffer) return res.status(400).json({ message: 'Invalid request' });

//     if (req.query.clearLastScan === 'true') {
//       await updateLastScanStatus(uid, 'deleted');
//       if (typeof deleteLastFridgeScan === 'function') {
//         await deleteLastFridgeScan(uid);
//       }
//     } else {
//       await updateLastScanStatus(uid, 'scanned');
//     }

//     const fileName = `${uid}_${Date.now()}`;
//     const imageUrl = await uploadImage(buffer, fileName);

//     const [visionLabels, yoloLabels] = await Promise.all([
//       sendToGoogleVision(buffer),
//       sendToReplicateYOLO(imageUrl),
//     ]);

//     const mergedLabels = [...new Set([...visionLabels, ...yoloLabels])];

//     await addFridgeSnapshot(uid, mergedLabels, imageUrl);

//     res.status(200).json({
//       vision: visionLabels,
//       yolo: yoloLabels,
//       items: mergedLabels,
//       imageUrl,
//     });
//   } catch (error) {
//     console.error('❌ Scan failed:', error);
//     res.status(500).json({ message: 'Scan failed' });
//   }
// };

// module.exports = { scanFridgeHandler };


// ✅ צריך להוריד YOLOv8x ולעבוד מולו מקומית
// לא משתמשים יותר ב-Replicate API
// במקום זה, YOLO ירוץ מקומית בפייתון ו-Node.js יתחבר אליו באמצעות child_process

// 📁 server/src/controllers/fridgeController.js

const { addFridgeSnapshot } = require('../models/userModel');
const vision = require('@google-cloud/vision');
const admin = require('../config/firebaseAdmin');
const { v4: uuidv4 } = require('uuid');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const visionClient = new vision.ImageAnnotatorClient();
const bucket = admin.storage().bucket();

async function uploadImage(buffer, fileName) {
  const file = bucket.file(`fridge-scans/${fileName}.jpg`);
  await file.save(buffer, {
    metadata: {
      contentType: 'image/jpeg',
      metadata: { firebaseStorageDownloadTokens: uuidv4() },
    },
  });
  return `https://storage.googleapis.com/${bucket.name}/fridge-scans/${fileName}.jpg`;
}

async function sendToGoogleVision(imageBuffer) {
  try {
    const [result] = await visionClient.objectLocalization({ image: { content: imageBuffer } });
    const labels = result.localizedObjectAnnotations.map(obj => obj.name.toLowerCase());
    return [...new Set(labels)];
  } catch (error) {
    console.error('❌ Google Vision error:', error);
    return [];
  }
}

// ➕ חדש: שימוש ב-YOLOv8 מקומי בפייתון
async function sendToLocalYolo(imagePath) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['src/services/yolo_detect.py', imagePath]);

    let data = '';
    python.stdout.on('data', chunk => { data += chunk.toString(); });
    python.stderr.on('data', err => console.error('[YOLO ERROR]', err.toString()));
    python.on('close', code => {
      if (code !== 0) return reject('YOLO failed');
      try {
        const labels = JSON.parse(data);
        resolve([...new Set(labels)]);
      } catch (e) {
        reject('YOLO returned invalid JSON');
      }
    });
  });
}

const scanFridgeHandler = async (req, res) => {
  try {
    const buffer = req.file?.buffer;
    const uid = req.user?.uid;
    if (!uid || !buffer) return res.status(400).json({ message: 'Invalid request' });

    const fileName = `${uid}_${Date.now()}`;
    const imagePath = path.join(__dirname, `../../tmp/${fileName}.jpg`);
    fs.writeFileSync(imagePath, buffer);
    const imageUrl = await uploadImage(buffer, fileName);

    const [visionLabels, yoloLabels] = await Promise.all([
      sendToGoogleVision(buffer),
      sendToLocalYolo(imagePath),
    ]);

    const merged = yoloLabels.filter(item => !visionLabels.includes(item));
    const allLabels = [...new Set([...visionLabels, ...merged])];

    await addFridgeSnapshot(uid, allLabels, imageUrl);
    res.status(200).json({ vision: visionLabels, yolo: yoloLabels, items: allLabels, imageUrl });
  } catch (error) {
    console.error('❌ Scan failed:', error);
    res.status(500).json({ message: 'Scan failed' });
  }
};

module.exports = { scanFridgeHandler };
