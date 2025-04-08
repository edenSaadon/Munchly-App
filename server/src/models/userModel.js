// ✅ server/src/models/UserModel.js
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const db = getFirestore();

const USERS_COLLECTION = 'users';

const createUser = async ({ uid, name, email }) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    await userRef.set({
      uid,
      name,
      email,
      preferences: {},
      likedRecipes: [],
      fridgeHistory: [],
      generatedRecipes: [],
      lastFridgeScan: null,
      createdAt: new Date(),
    });
  }
};

const getUserById = async (uid) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const doc = await userRef.get();
  if (!doc.exists) return null;
  return doc.data();
};

const addLikedRecipe = async (uid, recipeId) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.update({
    likedRecipes: FieldValue.arrayUnion(recipeId),
  });
};

const addFridgeSnapshot = async (uid, detectedItems) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const newSnapshot = {
    detectedItems,
    timestamp: new Date(),
  };
  await userRef.update({
    fridgeHistory: FieldValue.arrayUnion(newSnapshot),
    lastFridgeScan: newSnapshot.timestamp,
  });
};

const addGeneratedRecipe = async (uid, recipeId) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.update({
    generatedRecipes: FieldValue.arrayUnion(recipeId),
  });
};

const updatePreferences = async (uid, preferences) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.update({ preferences });
};
const updatePreferences = async (uid, preferences) => {
  const userRef = db.collection('users').doc(uid);
  await userRef.update({ preferences });
};


module.exports = {
  createUser,
  getUserById,
  addLikedRecipe,
  addFridgeSnapshot,
  addGeneratedRecipe,
  updatePreferences,
};
