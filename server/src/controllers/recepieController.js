const {
    createRecipe,
    getRecipeById,
    likeRecipe,
    getAllRecipes,
  } = require('../models/recepieModel');
  
  const {
    addGeneratedRecipe,
    addLikedRecipe,
  } = require('../models/userModel');
  
  // יצירת מתכון חדש
  const createRecipeHandler = async (req, res) => {
    const { title, ingredients, instructions, imageUrl, createdBy } = req.body;
  
    if (!title || !ingredients || !instructions || !createdBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const recipe = await createRecipe({ title, ingredients, instructions, imageUrl, createdBy });
  
      // נוסיף את המתכון לרשימת המתכונים שנוצרו עבור המשתמש
      await addGeneratedRecipe(createdBy, recipe.id);
  
      res.status(201).json(recipe);
    } catch (error) {
      console.error('Error creating recipe:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // שליפת מתכון לפי ID
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
  
  // לייק למתכון
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
  
  // שליפת כל המתכונים
  const getAllRecipesHandler = async (req, res) => {
    try {
      const recipes = await getAllRecipes();
      res.status(200).json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    createRecipeHandler,
    getRecipeHandler,
    likeRecipeHandler,
    getAllRecipesHandler,
  };
  