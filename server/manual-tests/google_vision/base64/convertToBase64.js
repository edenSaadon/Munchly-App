// Script Summary: Convert File to Base64 and Save to Text File
// Purpose:
// This script demonstrates how to convert two types of files into Base64 format and save the result into a .txt file for further use. There are two separate parts (the first one commented out, the second active):

// Part 1 (Commented Out): Image to Base64
// 1. Converts a local image (IMG_2737.jpg) into a Base64-encoded string.
// 2. Saves the result to a file called image_base64.txt.

// This is useful when preparing an image to be sent in a JSON request body (e.g., to Google Vision API).

// Part 2 (Active): Firebase Service Account JSON to Base64
// 1. Loads the Firebase service account JSON file (credentials).
// 2. Encodes the entire JSON into a Base64 string.
// 3. Writes the Base64 string to a file called serviceAccountBase64.txt.

// This is useful when you want to store the credentials securely (e.g., in a CI/CD environment) and decode them later at runtime.

// Test Type: Utility script – preparation for integration testing or production setup.
// Use Case: Ensuring files (images, credentials) are correctly Base64 encoded and saved for use in APIs, environment variables, or secure transfers.

// 1. 
// const fs = require('fs');
// const path = require('path');

// // Local path to the image file
// const imagePath = path.join(__dirname, 'IMG_2737.jpg');

// // Read the image and convert it to Base64 string
// const imageBuffer = fs.readFileSync(imagePath);
// const base64Image = imageBuffer.toString('base64');

// // Save the Base64 string to a .txt file
// const outputFilePath = path.join(__dirname, 'image_base64.txt');
// fs.writeFileSync(outputFilePath, base64Image);

// console.log(`Base64 Image saved to: ${outputFilePath}`);


//2. 
// const fs = require('fs');
// const path = require('path');

// // Define the path to the Firebase service account JSON file
// const serviceAccountPath = path.join(__dirname, 'munchly.json');

// // Read the content of the service account file as a string
// const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');

// // Convert the JSON content into a Base64-encoded string
// const base64Encoded = Buffer.from(serviceAccountJson).toString('base64');

// // Save the Base64-encoded string to a new file
// const base64FilePath = path.join(__dirname, 'serviceAccountBase64.txt');
// fs.writeFileSync(base64FilePath, base64Encoded);

// // Log the output location of the Base64 file
// console.log(`Base64 saved to: ${base64FilePath}`);
