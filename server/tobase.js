// const fs = require('fs');
// const path = require('path');

// // נתיב התמונה המקומי
// const imagePath = path.join(__dirname, 'IMG_2737.jpg');


// // קריאת התמונה והמרת אותה ל-Base64
// const imageBuffer = fs.readFileSync(imagePath);
// const base64Image = imageBuffer.toString('base64');

// // שמירת ה-Base64 לקובץ
// const outputFilePath = path.join(__dirname, 'image_base64.txt');
// fs.writeFileSync(outputFilePath, base64Image);

// console.log(`Base64 Image saved to: ${outputFilePath}`);


const fs = require('fs');
const path = require('path');

// קריאה לקובץ ה-JSON
const serviceAccountPath = path.join(__dirname, 'munchly.json');
const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');

// המרת ה-JSON ל-Base64
const base64Encoded = Buffer.from(serviceAccountJson).toString('base64');

// שמירת ה-Base64 בקובץ חדש
const base64FilePath = path.join(__dirname, 'serviceAccountBase64.txt');
fs.writeFileSync(base64FilePath, base64Encoded);

console.log(`Base64 saved to: ${base64FilePath}`);
