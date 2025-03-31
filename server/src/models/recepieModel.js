const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const db = getFirestore();

const RECIPES_COLLECTION = 'recipes';

const createRecipe = async ({ title, ingredients, instructions, imageUrl, createdBy }) => {
  const recipe = {
    title,
    ingredients,
    instructions,
    imageUrl,
    createdBy,
    createdAt: new Date(),
    likes: 0,
  };

  const docRef = await db.collection(RECIPES_COLLECTION).add(recipe);
  return { id: docRef.id, ...recipe };
};

const getRecipeById = async (id) => {
  const doc = await db.collection(RECIPES_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const likeRecipe = async (id) => {
  const docRef = db.collection(RECIPES_COLLECTION).doc(id);
  await docRef.update({
    likes: FieldValue.increment(1),
  });
};

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
