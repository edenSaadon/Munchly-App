// =======================================================
// Recipe Routes – Express Router for Recipe Operations
// =======================================================
//
// Purpose:
// This module defines all REST API routes related to recipe management.
// It includes endpoints for creating, retrieving, liking, and generating recipes.
// These routes are handled by the recipeController.
//
// Structure:
// - POST /                → Create a new recipe
// - GET /:id              → Retrieve a recipe by its ID
// - POST /:id/like        → Like a specific recipe
// - GET /                 → Retrieve all recipes
// - POST /generate/ai     → Generate a recipe using AI

const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController.js');

// Create a new recipe
router.post('/', recipeController.createRecipeHandler);

// Retrieve a specific recipe by its ID
router.get('/:id', recipeController.getRecipeHandler);

// Like a specific recipe
router.post('/:id/like', recipeController.likeRecipeHandler);

// Retrieve all recipes
router.get('/', recipeController.getAllRecipesHandler);

// Generate a recipe using AI
router.post('/generate/ai', recipeController.generateRecipeAIHandler);

module.exports = router;
