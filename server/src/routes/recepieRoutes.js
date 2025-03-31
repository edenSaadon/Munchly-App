const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recepieController');

// יצירת מתכון חדש
router.post('/', recipeController.createRecipeHandler);

// שליפת מתכון לפי ID
router.get('/:id', recipeController.getRecipeHandler);

// לייק למתכון
router.post('/:id/like', recipeController.likeRecipeHandler);

// שליפת כל המתכונים
router.get('/', recipeController.getAllRecipesHandler);

module.exports = router;
