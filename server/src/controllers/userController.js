const {
    createUser,
    getUserById,
    addLikedRecipe,
    addFridgeSnapshot,
    addGeneratedRecipe,
  } = require('../models/userModel');
  
  const createUserHandler = async (req, res) => {
    const { uid, name, email } = req.body;
  
    try {
      await createUser({ uid, name, email });
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const getUser = async (req, res) => {
    if (req.params.uid !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    try {
      const user = await getUserById(req.params.uid);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const addLikedRecipeHandler = async (req, res) => {
    if (req.params.uid !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    const { recipeId } = req.body;
  
    try {
      await addLikedRecipe(req.params.uid, recipeId);
      res.status(200).json({ message: 'Recipe liked successfully' });
    } catch (error) {
      console.error('Error adding liked recipe:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const addFridgeSnapshotHandler = async (req, res) => {
    if (req.params.uid !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    const { detectedItems } = req.body;
  
    try {
      await addFridgeSnapshot(req.params.uid, detectedItems);
      res.status(200).json({ message: 'Fridge snapshot added successfully' });
    } catch (error) {
      console.error('Error adding fridge snapshot:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const addGeneratedRecipeHandler = async (req, res) => {
    if (req.params.uid !== req.user.uid) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    const { recipeId } = req.body;
  
    try {
      await addGeneratedRecipe(req.params.uid, recipeId);
      res.status(200).json({ message: 'Generated recipe saved successfully' });
    } catch (error) {
      console.error('Error saving generated recipe:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    createUser: createUserHandler,
    getUser,
    addLikedRecipe: addLikedRecipeHandler,
    addFridgeSnapshot: addFridgeSnapshotHandler,
    addGeneratedRecipe: addGeneratedRecipeHandler,
  };
  