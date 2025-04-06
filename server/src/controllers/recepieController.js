const {
  createRecipe,
  getRecipeById,
  likeRecipe,
  getAllRecipes,
} = require('../models/RecipeModel');

const {
  addGeneratedRecipe,
  addLikedRecipe,
} = require('../models/UserModel');

// 🧠 AI
const { generateRecipeWithGemini } = require('../../flows/aiService');

// ▶ יצירת מתכון חדש רגיל (ידני מהלקוח)
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

    // נשמור גם תחת המשתמש
    await addGeneratedRecipe(createdBy, recipe.id);

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ▶ שליפת מתכון לפי מזהה
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

// ▶ סימון מתכון כלייק
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

// ▶ שליפת כל המתכונים
const getAllRecipesHandler = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ▶ יצירת מתכון מבוסס AI (Gemini)
const generateRecipeAIHandler = async (req, res) => {
  const { detectedItems } = req.body;

  if (!detectedItems || !Array.isArray(detectedItems)) {
    return res.status(400).json({ message: 'Invalid or missing detectedItems' });
  }

  try {
    const aiText = await generateRecipeWithGemini(detectedItems);
    res.status(200).json({ recipeText: aiText });
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
