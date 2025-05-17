const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

// יצירת מתכון חדש
router.post('/', recipeController.createRecipeHandler);

// שליפת מתכון לפי ID
router.get('/:id', recipeController.getRecipeHandler);

// לייק למתכון
router.post('/:id/like', recipeController.likeRecipeHandler);

// שליפת כל המתכונים
router.get('/', recipeController.getAllRecipesHandler);

router.post('/generate/ai', recipeController.generateRecipeAIHandler);


module.exports = router;




