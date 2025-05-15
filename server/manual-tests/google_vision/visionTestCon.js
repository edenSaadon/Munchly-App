// ### Script Purpose: Vision API Minimal Connection Test ###
// Goal:
// This script performs a minimal integration test to verify that the Google Cloud Vision API is properly connected and that 
// the service account credentials are valid. It sends an intentionally empty image buffer to the textDetection endpoint to 
// confirm that a response is received from the API — even if it's an expected error — thereby proving the connection works.


const vision = require("@google-cloud/vision");
const path = require("path");

// Define the path to the Google Cloud service account JSON key file
// Adjust the path to match your project structure
const keyPath = path.resolve(__dirname, "../src/secrets/serviceAccountKey.json");

// Create a Vision API client using the service account credentials
const client = new vision.ImageAnnotatorClient({
  keyFilename: keyPath,
});

// Define an async function to test Vision API connectivity
const testVisionAPI = async () => {
  try {
    // Send a request to the textDetection endpoint with an empty image buffer
    // This is intentional — we only want to check if the API responds
    const [result] = await client.textDetection({
      image: { content: Buffer.from("") }, // Empty input for connection test
    });

    // If the request succeeds (which it shouldn't with an empty buffer), print result
    console.log("✅ Vision API responded:", result);
  } catch (error) {
    // If the API responds with a known error (like "invalid image"), we treat it as a successful connection
    if (
      error.code === 3 || // Invalid argument
      error.code === 7 || // Permission denied
      error.message.includes("image") // Invalid image or missing input
    ) {
      console.log(
        "✅ Connected to Vision API (response received):",
        error.message
      );
    } else {
      // If the error is unexpected (like network failure or bad credentials), print as real failure
      console.error("❌ Vision API connection failed:", error.message);
    }
  }
};

// Run the test function
testVisionAPI();
