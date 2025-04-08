const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const admin = require('../config/firebaseAdmin');
const { addFridgeSnapshot } = require('../models/UserModel');
const { v4: uuidv4 } = require('uuid');

const bucket = admin.storage().bucket(); // ← ברירת מחדל: bucket של Firebase

const scanFridgeHandler = async (req, res) => {
  try {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ message: 'User not authenticated' });

      // 🔽 שלב 1: העלאת התמונה ל־Storage
      const filename = `fridge-scans/${uid}_${Date.now()}.jpg`;
      const file = bucket.file(filename);
      const uuid = uuidv4(); // ליצירת קישור ציבורי חתום

      await file.save(buffer, {
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            firebaseStorageDownloadTokens: uuid,
          },
        },
        resumable: false,
      });

      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media&token=${uuid}`;

      // 🔽 שלב 2: שליחת התמונה ל-Google Vision
      const [result] = await client.labelDetection({ image: { content: buffer } });
      const labels = result.labelAnnotations.map(label => label.description);

      console.log('📷 Vision labels:', labels);

      // 🔽 שלב 3: שמירה במסמך המשתמש
      await addFridgeSnapshot(uid, labels, imageUrl);

      res.status(200).json({ items: labels, imageUrl });
    });
  } catch (error) {
    console.error('❌ Error during vision scan:', error);
    res.status(500).json({ message: 'Vision scan failed' });
  }
};

// ✅ זה היה חסר!
module.exports = { scanFridgeHandler };
