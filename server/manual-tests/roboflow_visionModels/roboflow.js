/**
 * ======================================================================
 * File: roboflow-client.js
 * Purpose:
 * This script sends a fridge image to the Roboflow object detection model
 * to identify food items within the image. The model used is 'group_work' (version 2).
 * The image is sent as a base64-encoded string and the result includes a list
 * of detected items with their confidence scores.
 *
 * Usage:
 * 1. Place a fridge image as 'fridge.jpg' in the same directory.
 * 2. Run the script using: node roboflow-client.js
 * 3. Ensure you have replaced the API key with your valid Roboflow key.
 *
 * Dependencies:
 * - axios: for making HTTP POST requests
 * - fs: for reading the image file
 * ======================================================================
 */

const axios = require("axios");
const fs = require("fs");

// Read and encode the image file in base64 format
const image = fs.readFileSync("fridge.jpg", { encoding: "base64" });

// Send the image to the Roboflow model
axios({
  method: "POST",
  url: "https://serverless.roboflow.com/group_work/2", // Replace with your model's endpoint if different
  params: {
    api_key: "RldnQMeIpmAdqb2XMlE3", // Replace with your actual API key from Roboflow
  },
  data: image, // Send the base64 image as the request body
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", // Required header for Roboflow API
  },
})
  .then((res) => {
    // Log the result if detection is successful
    console.log("Detected items:");
    console.log(JSON.stringify(res.data, null, 2));
  })
  .catch((err) => {
    // Handle and log errors
    console.log("Error occurred:");
    console.log(err.response?.data || err.message);
  });
