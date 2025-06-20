// ============================================
// File: controllers/recipeController.js

// Purpose:
// Defines all handlers for recipe-related API routes, including:
// - Creating a recipe (manual or AI-generated)
// - Fetching recipes
// - Liking recipes
// - AI integration via Gemini for smart recipe generation

// Requires model functions and AI service.
// ============================================

const {
  createRecipe,
  getRecipeById,
  likeRecipe,
  getAllRecipes,
} = require('../models/RecipeModel');

const {
  addGeneratedRecipe,
  addLikedRecipe,
  getUserById,
} = require('../models/userModel');

const { generateRecipeWithGemini } = require('../../flows/aiService');

// ▶ Create a manual recipe
const createRecipeHandler = async (req, res) => {
  const { title, ingredients, instructions, imageUrl, createdBy } = req.body;

  if (!title || !ingredients || !instructions || !createdBy) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const recipe = await createRecipe({
      title,
      ingredients,
      instructions,
      imageUrl,
      createdBy,
    });

// Save recipe to user's generated recipes
    await addGeneratedRecipe(createdBy, {
      id: recipe.id,
      title,
      ingredients,
      instructions,
      imageUrl,
      savedAt: new Date().toISOString(),
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ▶ Get a recipe by ID
const getRecipeHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ▶ Like a recipe
const likeRecipeHandler = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.body;

  if (!uid) return res.status(400).json({ message: 'Missing user ID (uid)' });

  try {
    await likeRecipe(id);
    await addLikedRecipe(uid, id);
    res.status(200).json({ message: 'Recipe liked successfully' });
  } catch (error) {
    console.error('Error liking recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ▶ Get all recipes
const getAllRecipesHandler = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// // ▶ Generate a recipe with Gemini AI based on detected fridge items
const generateRecipeAIHandler = async (req, res) => {
  const { detectedItems, createdBy, preferences, extraAnswers = {} } = req.body;

  if (!detectedItems || !Array.isArray(detectedItems)) {
    return res.status(400).json({ message: 'Invalid or missing detectedItems' });
  }
  if (!createdBy) {
    return res.status(400).json({ message: 'Missing createdBy (user ID)' });
  }

  try {
    const userData = await getUserById(createdBy);
    if (!userData) {
      console.warn(' No user data found for ID:', createdBy);
      return res.status(400).json({ message: 'User not found' });
    }

    const lastScan = userData.lastFridgeScan || new Date().toISOString();
    const fridgeItems = userData.aiFridgeItems || [];

    const existingRecipe = userData.generatedRecipes?.find(
      (r) => r.scanTimestamp === lastScan
    );

    if (existingRecipe) {
      return res.status(200).json({
        id: existingRecipe.id,
        reused: true, 
        message: 'Recipe already exists for this scan',
      });
    }

    // // Generate recipe using Gemini AI sending extraAnswers,detectedItems,preferences
    const aiJson = await generateRecipeWithGemini(detectedItems, preferences, extraAnswers);
    const { title, ingredients, instructions } = aiJson;

    if (!title || ingredients.length === 0 || instructions.length === 0) {
      console.warn('AI returned an empty or invalid recipe');
      return res.status(400).json({ message: 'AI could not generate a recipe with the given items' });
    }

    const recipe = await createRecipe({
      title,
      ingredients,
      instructions,
      imageUrl: '',
      createdBy,
    });

    await addGeneratedRecipe(createdBy, {
      id: recipe.id,
      title,
      ingredients,
      instructions,
      imageUrl: '',
      savedAt: new Date().toISOString(),
      scanTimestamp: lastScan,
      fridgeItems,
    });

    await addLikedRecipe(createdBy, recipe.id);

    res.status(200).json({ id: recipe.id });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ message: 'Failed to generate recipe' });
  }
};


module.exports = {
  createRecipeHandler,
  getRecipeHandler,
  likeRecipeHandler,
  getAllRecipesHandler,
  generateRecipeAIHandler,
};



