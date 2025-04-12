// const admin = require('firebase-admin');
// const fs = require('fs');
// const path = require('path');
// const fetch = require('node-fetch'); // מוודא ש-fetch מותקן, אם לא התקן עם npm install node-fetch

// require('dotenv').config();  // טוען את משתני הסביבה מקובץ .env

// // טוען את קובץ ה-JSON מתוך ENV
// const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;  // מוודא שמסלול ה-JSON הוגדר כראוי ב-ENV

// if (!serviceAccountPath) {
//   console.error('❌ GOOGLE_APPLICATION_CREDENTIALS is not defined');
//   process.exit(1);
// }

// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// // אתחול Firebase Admin SDK עם ההרשאות
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount), // אתחול עם JSON
//   storageBucket: 'munchly-48936', // שים את שם ה-bucket שלך
// });

// // יצירת אובייקט bucket של Firebase Storage
// const bucket = admin.storage().bucket();

// // פונקציה להעלות את התמונה
// async function uploadImage(filePath, fileName) {
//   try {
//     const file = bucket.file(`fridge-scans/${fileName}.jpg`);

//     // פותחים את התמונה מהמחשב המקומי
//     const buffer = fs.readFileSync(filePath); // קריאת התמונה מתוך הנתיב המקומי

//     await file.save(buffer, {
//       metadata: {
//         contentType: 'image/jpeg',
//       },
//     });

//     // יצירת Signed URL שיאפשר גישה ציבורית לתמונה
//     const expires = Date.now() + 3600 * 1000;  // תקופת גישה של שעה
//     const [url] = await file.getSignedUrl({
//       action: 'read', // הגישה היא לקריאה בלבד
//       expires: expires,  // הזמן שבו יפוג ה-URL
//     });

//     console.log('File uploaded successfully:', url);  // הדפסת ה-URL של התמונה
//     return url; // מחזיר את ה-URL של התמונה
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// }

// // נתיב התמונה המקומית שלך
// const filePath = path.join(__dirname, 'IMG_2737.jpg');  // מכניס את הנתיב שלך לתמונה
// const fileName = 'test_image_' + Date.now(); // שם ייחודי לקובץ

// uploadImage(filePath, fileName);

const vision = require('@google-cloud/vision');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // ודא ש-fetch מותקן (npm install node-fetch)
const { v4: uuidv4 } = require('uuid');  // עבור יצירת שם קובץ ייחודי

require('dotenv').config();  // טוען את משתני הסביבה מקובץ .env

// טוען את קובץ ה-JSON מתוך ENV
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;  // מוודא שמסלול ה-JSON הוגדר כראוי ב-ENV

if (!serviceAccountPath) {
  console.error('❌ GOOGLE_APPLICATION_CREDENTIALS is not defined');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// אתחול Firebase Admin SDK עם ההרשאות
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // אתחול עם JSON
  storageBucket: 'munchly-48936', // שם ה-bucket שלך
});

const bucket = admin.storage().bucket(); // יצירת אובייקט bucket של Firebase Storage

// אתחול Google Vision API
const visionClient = new vision.ImageAnnotatorClient();

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

// פונקציה עיקרית שמבצעת את כל התהליך
async function scanFridgeHandler() {
  try {
    const filePath = path.join(__dirname, 'IMG_2737.jpg'); // תמונה לדוגמה שנמצאת באותו תיקייה
    const buffer = fs.readFileSync(filePath);

    // שלב 1: העלאת התמונה לפיירבייס
    const fileName = `fridge-scans/test_image_${Date.now()}`;
    const imageUrl = await uploadImage(buffer, fileName);

    // שלב 2: שליחת התמונה ל-Google Vision
    const labels = await sendToGoogleVision(buffer);

    console.log("Image successfully uploaded and analyzed with labels:", labels);
  } catch (error) {
    console.error('Error during scan:', error);
  }
}

// הרצת הפונקציה לבדיקה
scanFridgeHandler(); 
