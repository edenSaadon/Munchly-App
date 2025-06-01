// ===========================================================
// Fridge Routes – Handles Image Scanning and Manual Additions
// ===========================================================
//
// Purpose:
// This module defines routes related to fridge item management.
// It includes an endpoint for uploading an image of the fridge,
// which is processed by Google Vision and YOLO to detect items.
//
// Technologies:
// - Uses multer for handling image upload (in-memory buffer)
// - Uses Firebase-authenticated middleware (userAuthMidd)
// - Relies on fridgeController for scan logic
//
// Route Summary:
// - POST /scan → Uploads a fridge image, processes it, and returns detected items

const express = require('express');
const router = express.Router();

const userAuthMidd = require('../middleware/userAuthMidd'); // Middleware to verify user token
const multer = require('multer');
const upload = multer(); // Multer configured to store file in memory as a buffer

const { scanFridgeHandler } = require('../controllers/fridgeController'); 
const { addItemToFridgeHandler } = require('../controllers/userController');

// Deprecated alternative scan route (commented out)
// router.post('/scan', userAuthMidd, scanFridgeHandler);

// Uploads a fridge image and processes it for item detection
router.post('/scan', userAuthMidd, upload.single('image'), scanFridgeHandler);

module.exports = router;
