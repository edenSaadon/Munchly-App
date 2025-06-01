// ================================================
// Fridge Scan Controller – Google Vision + YOLOv8
// ================================================
//
// Purpose:
// This controller handles image-based fridge scans in the backend. It performs the following:
// 1. Accepts a user's uploaded image of their fridge.
// 2. Stores the image in Firebase Storage.
// 3. Sends the image to two object detection models:
//    - Google Vision API (cloud-based object localization)
//    - YOLOv8 (run locally via a Python script)
// 4. Merges the detected labels from both models and saves them to Firestore under the user.
//
// Technologies Used:
// - Firebase Admin SDK (Storage)
// - Google Cloud Vision API (@google-cloud/vision)
// - YOLOv8 via local Python script
// - Firestore interaction through userModel
//
// Output:
// Returns the combined item labels, source-specific labels (vision/yolo), and the image URL.

const { addFridgeSnapshot } = require('../models/userModel'); // Firestore operation to save scan results
const vision = require('@google-cloud/vision'); // Google Vision client library
const admin = require('../config/firebaseAdmin'); // Initialized Firebase Admin instance
const { v4: uuidv4 } = require('uuid'); // For generating unique image tokens
const { spawn } = require('child_process'); // To run local Python script (YOLOv8)
const fs = require('fs'); // File system access to save image locally
const path = require('path'); // Path utility for temp image storage

const visionClient = new vision.ImageAnnotatorClient(); // Google Vision API client
const bucket = admin.storage().bucket(); // Firebase Storage bucket reference

/**
 * Uploads an image buffer to Firebase Storage under 'fridge-scans/' directory.
 * @param {Buffer} buffer - Image buffer to upload
 * @param {string} fileName - Unique name for the image file
 * @returns {string} Public URL of the uploaded image
 */
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

/**
 * Sends an image buffer to Google Vision for object localization.
 * Extracts and returns an array of unique, lowercased object labels.
 * @param {Buffer} imageBuffer - The uploaded image buffer
 * @returns {string[]} List of detected object names
 */
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

/**
 * Runs a local Python script using YOLOv8 to detect objects in the given image path.
 * The Python script returns a JSON-encoded array of detected labels.
 * @param {string} imagePath - Path to the locally saved image file
 * @returns {Promise<string[]>} List of detected object labels
 */
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

/**
 * Express handler for POST /scan-fridge
 * 1. Validates the request and user
 * 2. Saves the uploaded image locally and in Firebase Storage
 * 3. Sends the image to Google Vision and YOLO
 * 4. Merges the results and stores them under the user's Firestore document
 * 5. Returns all relevant data to the client
 */
const scanFridgeHandler = async (req, res) => {
  try {
    const buffer = req.file?.buffer;
    const uid = req.user?.uid;
    if (!uid || !buffer) return res.status(400).json({ message: 'Invalid request' });

    const fileName = `${uid}_${Date.now()}`;
    const imagePath = path.join(__dirname, `../../tmp/${fileName}.jpg`);
    fs.writeFileSync(imagePath, buffer); // Save image temporarily for YOLO
    const imageUrl = await uploadImage(buffer, fileName); // Upload to Firebase Storage

    const [visionLabels, yoloLabels] = await Promise.all([
      sendToGoogleVision(buffer),
      sendToLocalYolo(imagePath),
    ]);

    const merged = yoloLabels.filter(item => !visionLabels.includes(item));
    const allLabels = [...new Set([...visionLabels, ...merged])];

    await addFridgeSnapshot(uid, allLabels, imageUrl); // Save to Firestore
    res.status(200).json({ vision: visionLabels, yolo: yoloLabels, items: allLabels, imageUrl });
  } catch (error) {
    console.error('❌ Scan failed:', error);
    res.status(500).json({ message: 'Scan failed' });
  }
};

module.exports = { scanFridgeHandler };
