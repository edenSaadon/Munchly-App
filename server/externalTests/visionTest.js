const vision = require("@google-cloud/vision");
const path = require("path");

// נתיב חדש – serviceAccountKey.json נמצא בתוך src/secrets
const keyPath = path.resolve(__dirname, "../src/secrets/serviceAccountKey.json");

const client = new vision.ImageAnnotatorClient({
  keyFilename: keyPath,
});

const testVisionAPI = async () => {
  try {
    const [result] = await client.textDetection({
      image: { content: Buffer.from("") }, // שליחה ריקה לבדיקה
    });

    console.log("✅ Vision API responded:", result);
  } catch (error) {
    if (
      error.code === 3 ||
      error.code === 7 ||
      error.message.includes("image")
    ) {
      console.log(
        "✅ Connected to Vision API (response received):",
        error.message
      );
    } else {
      console.error("❌ Vision API connection failed:", error.message);
    }
  }
};

testVisionAPI();
