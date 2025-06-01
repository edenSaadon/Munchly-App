// ===========================================================
// Recipe Model – Firestore Operations for Recipes Collection
// ===========================================================
//
// Purpose:
// This module provides an interface to interact with the 'recipes' collection
// in Firebase Firestore. It allows for creating, retrieving, and updating recipe documents.
//
// Firestore Structure:
// Collection: 'recipes'
// Each document includes the following fields:
// - title: string
// - ingredients: string[]
// - instructions: string[]
// - imageUrl: string (URL to the recipe image)
// - createdBy: string (UID of the user who created it, or null for system-generated)
// - source: string ('ai' or 'db')
// - createdAt: Date
// - likes: number

const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const db = getFirestore();

const RECIPES_COLLECTION = 'recipes';

/**
 * Creates a new recipe document in Firestore.
 * @param {Object} recipeData - Recipe fields: title, ingredients, instructions, imageUrl, createdBy
 * @returns {Object} The created recipe object with its Firestore ID
 */
const createRecipe = async ({ title, ingredients, instructions, imageUrl, createdBy, source = 'ai' }) => {
  const recipe = {
    title,
    ingredients,
    instructions,
    imageUrl,
    createdBy,
    source, // 'ai' or 'db' (manual entry or AI-generated)
    createdAt: new Date(),
    likes: 0,
  };

  const docRef = await db.collection(RECIPES_COLLECTION).add(recipe);
  return { id: docRef.id, ...recipe };
};

/**
 * Retrieves a recipe by its Firestore document ID.
 * @param {string} id - Firestore document ID
 * @returns {Object|null} The recipe object, or null if not found
 */
const getRecipeById = async (id) => {
  const doc = await db.collection(RECIPES_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

/**
 * Increments the 'likes' field for a given recipe.
 * @param {string} id - Firestore document ID
 */
const likeRecipe = async (id) => {
  const docRef = db.collection(RECIPES_COLLECTION).doc(id);
  await docRef.update({
    likes: FieldValue.increment(1),
  });
};

/**
 * Retrieves all recipes ordered by creation date (most recent first).
 * @returns {Array} List of recipe objects
 */
const getAllRecipes = async () => {
  const snapshot = await db.collection(RECIPES_COLLECTION).orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

module.exports = {
  createRecipe,
  getRecipeById,
  likeRecipe,
  getAllRecipes,
};
