// #### Test Script Summary ####

// #### Purpose ####
// This script verifies the correct functioning of the image scanning flow in the Munchly backend, including:
// 1. Uploading a fridge image to Firebase Storage
// 2. Sending the uploaded image to Google Vision API for label detection

// #### Scope ####:
// It tests the backend service logic for image handling and object recognition, ensuring cloud services (Firebase + Google Vision) are integrated correctly.

// #### Test Type ####:
// Semi-automated integration test – not part of the end-user flow, but used to manually validate core logic via Node.js script and console logs.

// Features to be Tested:
// - Upload of fridge image to Firebase Storage
// - Google Vision API image labeling integration
// - Handling and transformation of image data as Buffer
// - Public URL generation and log verification
// - Extraction and return of detected labels

// Testing Strategy
// - Integration Testing:
// - This script serves as a backend integration test. It bypasses the client and tests the system’s ability to:
// - Accept and process a local image file
// - Upload the image to Firebase Storage
// - Interact with Google Vision API and parse results
// - Output is logged directly to the terminal to validate expected behavior (image URL + labels).

// Test Environment
// - Language: Node.js
// - Services:
// Firebase Admin SDK (firebase-admin) for Storage interaction
// Google Vision API (@google-cloud/vision) for object detection
// Authentication: Service account credentials (.json file loaded via .env path)

// File Handling: fs and path for loading local test image
// Environment Requirements:
// - Node.js runtime
// - GOOGLE_APPLICATION_CREDENTIALS path in .env file
// - IMG_2737.jpg test image in the same directory

const vision = require('@google-cloud/vision');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // Ensure fetch is installed (npm install node-fetch)
const { v4: uuidv4 } = require('uuid');  // For generating unique filenames

require('dotenv').config();  // Loads env variables from .env file

// Load service account JSON from environment path
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;  // Validate path from .env

if (!serviceAccountPath) {
  console.error('❌ GOOGLE_APPLICATION_CREDENTIALS is not defined');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK with credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Firebase Admin init
  storageBucket: 'munchly-48936', // Your Firebase Storage bucket
});

const bucket = admin.storage().bucket(); // Firebase Storage bucket object

// Initialize Google Vision API client
const visionClient = new vision.ImageAnnotatorClient();

// Uploads image to Firebase Storage and returns its public URL
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
    return publicUrl; // Returns public image URL
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// Sends image buffer to Google Vision API and logs labels
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

// Main handler that runs the upload + analysis test
async function scanFridgeHandler() {
  try {
    const filePath = path.join(__dirname, 'IMG_2737.jpg'); // Example test image in same folder
    const buffer = fs.readFileSync(filePath);

    // Step 1: Upload to Firebase Storage
    const fileName = `fridge-scans/test_image_${Date.now()}`;
    const imageUrl = await uploadImage(buffer, fileName);

    // Step 2: Analyze with Google Vision
    const labels = await sendToGoogleVision(buffer);

    console.log("Image successfully uploaded and analyzed with labels:", labels);
  } catch (error) {
    console.error('Error during scan:', error);
  }
}

// Run the test function
scanFridgeHandler(); 
