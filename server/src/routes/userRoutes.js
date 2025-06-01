// =======================================================
// User Routes – Express Router for User-Related Endpoints
// =======================================================
//
// Purpose:
// This module defines all REST API routes related to user management,
// preferences, fridge items, and AI-generated content. All routes are
// mounted on the Express app and use middleware to verify Firebase ID tokens.
//
// Structure:
// - Most routes are protected using userAuthMidd (token verification middleware)
// - Routes interact with userController methods to handle Firestore operations
//
// Usage:
// These routes are used by the client application to manage users,
// preferences, fridge contents, and liked/generated recipes.

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userAuthMidd = require('../middleware/userAuthMidd');

// Returns the current user's profile (requires a valid token)
router.get('/profile', userAuthMidd, userController.getUserProfileHandler);

// Verifies the token and returns the user's UID
router.get('/verify', userAuthMidd, (req, res) => {
  res.status(200).json({ uid: req.user.uid });
});

// Temporarily disabled route to get a user's profile by UID
// router.get('/:uid/profile', userAuthMidd, userController.getUserProfileHandler);

// Creates a new user during registration
router.post('/', userController.createUser);

// Retrieves user details by UID
router.get('/:uid', userAuthMidd, userController.getUser);

// Updates user dietary or app preferences
router.post('/:uid/preferences', userAuthMidd, userController.updatePreferences);

// Adds a liked recipe to the user's profile
router.post('/:uid/like', userAuthMidd, userController.addLikedRecipe);

// Saves a Google Vision fridge scan and image URL
router.post('/:uid/fridge', userAuthMidd, userController.addFridgeSnapshot);

// Stores an AI-generated recipe under the user's account
router.post('/:uid/generated', userAuthMidd, userController.addGeneratedRecipe);

// Adds an item to the user's aiFridgeItems list (manual addition)
router.post('/:uid/add-item', userAuthMidd, userController.addItemToFridgeHandler);

// Removes an item from the user's aiFridgeItems list (manual removal)
router.post('/:uid/remove-item', userAuthMidd, userController.deleteFridgeItemHandler);

// Saves the aiFridgeItems list when moving to the menu screen
router.post('/:uid/fridge/save-items', userAuthMidd, userController.saveFridgeItemsHandler);

// Saves the final fridge snapshot (image + items)
router.post('/:uid/fridge/final-snapshot', userAuthMidd, userController.saveFinalFridgeSnapshotHandler);

module.exports = router;
