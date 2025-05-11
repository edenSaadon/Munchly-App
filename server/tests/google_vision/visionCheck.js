// ### Script Summary: Google Vision API Test using Base64 ###
// ### Purpose: ###
// This script tests the direct usage of the Google Cloud Vision API using an HTTP POST request with an image provided as a Base64-encoded string.

// ### Use case ###:
// 1. I wanted to verify that the Google Vision API accepts and processes Base64 image correctly 
// 2. I experienced issues with Vision SDK and want to isolate the request manually
// 3. I wanted to validate the raw structure and authentication outside of the main server code

// ### What it tests ###:
// 1. Base64 encoding format and integrity of the image
// 2. Whether a LABEL_DETECTION request returns valid annotations
// 3. Token authentication and request headers
// 4. The response structure returned by the Google Vision API

// Type of test:
// Manual integration test using axios.

// Features to be Tested:
// - Base64-encoded image submission to Google Vision
// - Parsing of label annotations in the response

// Testing Strategy : 
// Manual test of a third-party service using raw HTTP (not the SDK)

// Test Environment:
// - Node.js
// - Local file image_base64.txt with a Base64 image
// - Axios for HTTP POST
// - Temporary OAuth 2.0 token for Google Cloud Vision


const axios = require('axios');
const fs = require('fs'); 

// Load the Base64-encoded image content from a local text file.
// This simulates receiving an image from a mobile client or other source.
const base64Image = fs.readFileSync('image_base64.txt', 'utf8'); 

// Sanity check – make sure the image content is not empty or corrupted
if (!base64Image) {
  console.error("❌ Base64 image is empty or invalid");
  process.exit(1);  // ❌ Exit if no image was loaded
}

// Google OAuth 2.0 Access Token with permission to access Cloud Vision API
// This token must be valid and not expired.
// This is a temporary user access token (not a service account token or API key).
const apiToken = 'ya29.c.c0ASRK0GYS5b3AbYyusJ6-amXUUxPWqPsEpqZ2uSd7XBySppNAsGMDyN15VEpeEssH3Ofc-VWIwo6loasz_nHgYgHSCcGLLNAY2LonD9zSmeMT1aAfzuO-1r2vtBqaIFTBzZSDUwHOxkVKW7_PQzjV5rCCl4XcsVnVrDJMzJW9h1VJqtoBQzI9f5xTLaPpJibZyalKAETgA49b2TUxQCROc9m4W8dPO88RjclG-cMhObjIgd8-vONL0AlLR9EgDKjS2UCxKKmAwbem17vqoa2lKouFws9QrXSvXQxhtB773FNEyQp5smZgnA_nfMEjQ6J1SHEeAcJ2eLfNaXfwyUmNCrp4U4Pfuarkc5j4Ssa4PRgjqpDjCph7LtUL384AO8b9syJnyiYRpQhnYaFIyjxymlzzp64iOOwmykzqgSfW5Ujk1U_5UyzaQ96I2Vr4Wmq6boXtvW850Z2R_0mU3rbeYeIr6ebFR7cyZRJYOwykBx1-0qoi4plilWtXS9enodfkbpsa2fXZ8S28Ie0cw2UtXZFz0eySW3WiYJ8UIc-jroymmrq3td9SZ_I-tvtsljbYef9RXddSrOqVguu9tfa9_dbxJe-nfV-vF9Ya4pkRo45YQcd1S-oY2aovgmeWc4-3zuIm_JoFfhs8V3SpWQrB84wtdi4_V3qmOktYIO8V8Vv-ttcWdp2SSfJ_caQh8atytdXZzY5Zt-p_69IQZjylM6h4ex2r2gkumRB7YBpXhjoMB3dxkvV0oOSY5si6yQqzy0uJmyddagpOljo4OgrZ5e-RpYQxZUZM1R9dQr1wfe2wxqBSqBW64ijbIf64By6krm886VivVc8pBhShjbqOvqxU1vy9puzhdkB4hdqe7pge8rdtxx45dIaqIVmVMi5Yz6ZuJ3bFo3I0-l0emQlF-equ9jz8_xu5MWvYlv3Y2_8pf_ir10zVQWlabr4ckYZy2ehBvUq-MVf2BRMxQ3Xo970436apW8XocvdV_sFR2W97B9s5JZmw54Q'; // Place your Access Token here

// Google Cloud Vision API endpoint for image analysis
const visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate';

// Construct the request body with Base64 image + requested analysis type (labels)
const requestBody = {
  requests: [
    {
      image: {
        content: base64Image // The image data is embedded here in Base64 format
      },
      features: [
        {
          type: 'LABEL_DETECTION', // Ask the API to detect general objects (labels)
          maxResults: 10           // Limit the number of results returned
        }
      ]
    }
  ]
};

// Send the POST request with the appropriate headers
axios.post(visionApiUrl, requestBody, {
  headers: {
    Authorization: `Bearer ${apiToken}`,      // Required for authentication
    'Content-Type': 'application/json'        // JSON format request
  }
})
  .then(response => {
    // Successfully received a response from the Vision API
    if (response.data.responses[0] && response.data.responses[0].labelAnnotations) {
      console.log('Google Vision Response:', response.data.responses[0].labelAnnotations);
    } else {
      // API returned but didn't provide expected label data
      console.error('❌ No labels detected or response is empty');
    }
  })
  .catch(error => {
    // Handle failed request (e.g., bad token, malformed image, permission issues)
    console.error('Error with Google Vision API:', error.response ? error.response.data : error.message);
  });
