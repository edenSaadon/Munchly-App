// // // ======================================================================
// // // User Model – Firestore Access Layer for User Data
// // // ======================================================================
// // //
// // // Purpose:
// // // This module defines functions that interact directly with Firestore's 'users' collection
// // // and related subcollections. It provides logic for creating and updating user data,
// // // managing preferences, liked recipes, fridge snapshots, and AI-generated fridge item lists.
// // //
// // // Firestore Structure:
// // // - Collection: 'users'
// // // - Subcollection: 'fridgeSnapshots' (under 'fridgeSnapshots/{uid}/snapshots')
// // // - Common fields: preferences, likedRecipes, aiFridgeItems, fridgeHistory, etc.

// // const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// // const admin = require('../config/firebaseAdmin');

// // const db = getFirestore();
// // const USERS_COLLECTION = 'users';

// // /**
// //  * Filters out irrelevant or generic items from detected fridge items.
// //  * Used to clean up results from object detection models.
// //  */
// // function filterAllowedItems(items) {
// //   const forbiddenWords = [
// //     'fruit', 'bottle', 'tableware', 'drinkware', 'beverage',
// //     'liquid', 'plate', 'bowl', 'cup', 'container', 'cutlery', 'utensil'
// //   ];
// //   return items.filter(item => {
// //     const normalizedItem = item.trim().toLowerCase();
// //     return !forbiddenWords.some(forbidden => normalizedItem.includes(forbidden));
// //   });
// // }

// // /**
// //  * Creates a new user document in Firestore if it doesn't already exist.
// //  */
// // const createUser = async ({ uid, name, email }) => {
// //   const userRef = db.collection(USERS_COLLECTION).doc(uid);
// //   const doc = await userRef.get();
// //   if (!doc.exists) {
// //     await userRef.set({
// //       uid,
// //       name,
// //       email,
// //       preferences: {},
// //       likedRecipes: [],
// //       fridgeHistory: [],
// //       generatedRecipes: [],
// //       lastFridgeScan: null,
// //       aiFridgeItems: [],
// //       createdAt: new Date(),
// //     });
// //   }
// // };

// // /**
// //  * Retrieves full user document by UID.
// //  */
// // const getUserById = async (uid) => {
// //   const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
// //   if (!doc.exists) return null;
// //   return doc.data();
// // };

// // /**
// //  * Returns a simplified user profile with key fields only.
// //  */
// // const getUserProfile = async (uid) => {
// //   const user = await getUserById(uid);
// //   if (!user) return null;

// //   return {
// //     uid: user.uid,
// //     email: user.email,
// //     preferences: user.preferences || {},
// //     likedRecipes: user.likedRecipes || [],
// //     lastFridgeScan: user.lastFridgeScan || null,
// //   };
// // };

// // /**
// //  * Adds a recipe ID to the user's likedRecipes array.
// //  */
// // const addLikedRecipe = async (uid, recipeId) => {
// //   await db.collection(USERS_COLLECTION).doc(uid).update({
// //     likedRecipes: FieldValue.arrayUnion(recipeId),
// //   });
// // };

// // /**
// //  * Saves a fridge snapshot image and detected items to a subcollection,
// //  * and updates the user's fridgeHistory and current aiFridgeItems.
// //  */
// // const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
// //   const timestamp = new Date().toISOString();
// //   await db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp).set({
// //     detectedItems,
// //     imageUrl,
// //     timestamp,
// //   });

// //   const userRef = db.collection(USERS_COLLECTION).doc(uid);
// //   const filteredItems = filterAllowedItems(detectedItems);

// //   await userRef.update({
// //     fridgeHistory: FieldValue.arrayUnion({ detectedItems, imageUrl, timestamp }),
// //     aiFridgeItems: filteredItems,
// //     lastFridgeScan: timestamp,
// //   });
// // };

// // /**
// //  * Adds a generated recipe record to the user's list of generatedRecipes.
// //  */
// // const addGeneratedRecipe = async (uid, recipeRecord) => {
// //   const userRef = db.collection(USERS_COLLECTION).doc(uid);
// //   const userDoc = await userRef.get();
// //   const current = userDoc.data().generatedRecipes || [];
// //   const updated = [...current, recipeRecord];
// //   await userRef.update({ generatedRecipes: updated });
// // };

// // /**
// //  * Updates the user's preferences object.
// //  */
// // const updatePreferences = async (uid, preferences) => {
// //   await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
// // };

// // /**
// //  * Adds a new item to the aiFridgeItems list (ensures uniqueness).
// //  */
// // const addItemToFridge = async (uid, item) => {
// //   const userRef = db.collection(USERS_COLLECTION).doc(uid);
// //   const userDoc = await userRef.get();
// //   if (!userDoc.exists) return;

// //   const currentItems = userDoc.data().aiFridgeItems || [];
// //   const updatedItems = Array.from(new Set([...currentItems, item]));
// //   await userRef.update({ aiFridgeItems: updatedItems });
// // };

// // /**
// //  * Removes an item from the aiFridgeItems list.
// //  */
// // const deleteFridgeItem = async (uid, item) => {
// //   const userRef = db.collection(USERS_COLLECTION).doc(uid);
// //   const userDoc = await userRef.get();
// //   if (!userDoc.exists) return;

// //   const currentItems = userDoc.data().aiFridgeItems || [];
// //   const updatedItems = currentItems.filter(i => i !== item);
// //   await userRef.update({ aiFridgeItems: updatedItems });
// // };

// // /**
// //  * Saves a full aiFridgeItems list to the user document.
// //  */
// // const saveFridgeItemsToUser = async (uid, items) => {
// //   const userRef = db.collection(USERS_COLLECTION).doc(uid);
// //   await userRef.update({ aiFridgeItems: items });
// // };

// // /**
// //  * Saves a complete snapshot (items + image) to the fridgeSnapshots subcollection
// //  * and updates relevant fields in the user's main document.
// //  */
// // const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
// //   const timestamp = new Date().toISOString();
// //   const fridgeSnapshotRef = db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp);
// //   const snapshot = { detectedItems: items, imageUrl, timestamp };

// //   await fridgeSnapshotRef.set(snapshot);

// //   const userRef = db.collection(USERS_COLLECTION).doc(uid);
// //   await userRef.update({
// //     fridgeHistory: FieldValue.arrayUnion(snapshot),
// //     aiFridgeItems: items,
// //     lastFridgeScan: timestamp,
// //     fridgeItems: items,
// //     lastImageUploaded: imageUrl,
// //   });
// // };

// // module.exports = {
// //   createUser,
// //   getUserById,
// //   getUserProfile,
// //   addLikedRecipe,
// //   addFridgeSnapshot,
// //   addGeneratedRecipe,
// //   updatePreferences,
// //   addItemToFridge,
// //   deleteFridgeItem,
// //   saveFridgeItemsToUser,
// //   saveFinalFridgeSnapshot,
// // };


// // ======================================================================
// // User Model – Firestore Access Layer for User Data
// // ======================================================================
// //
// // Purpose:
// // This module defines functions that interact directly with Firestore's 'users' collection
// // and related subcollections. It provides logic for creating and updating user data,
// // managing preferences, liked recipes, fridge snapshots, and AI-generated fridge item lists.
// //
// // Firestore Structure:
// // - Collection: 'users'
// // - Subcollection: 'fridgeSnapshots' (under 'fridgeSnapshots/{uid}/snapshots')
// // - Common fields: preferences, likedRecipes, aiFridgeItems, fridgeHistory, etc.

// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin');

// const db = getFirestore();
// const USERS_COLLECTION = 'users';

// /**
//  * Filters out irrelevant or generic items from detected fridge items.
//  * Used to clean up results from object detection models.
//  */
// function filterAllowedItems(items) {
//   const forbiddenWords = [
//     'fruit', 'bottle', 'tableware', 'drinkware', 'beverage',
//     'liquid', 'plate', 'bowl', 'cup', 'container', 'cutlery', 'utensil'
//   ];
//   return items.filter(item => {
//     const normalizedItem = item.trim().toLowerCase();
//     return !forbiddenWords.some(forbidden => normalizedItem.includes(forbidden));
//   });
// }

// /**
//  * Creates a new user document in Firestore if it doesn't already exist.
//  */
// const createUser = async ({ uid, name, email }) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const doc = await userRef.get();
//   if (!doc.exists) {
//     await userRef.set({
//       uid,
//       name,
//       email,
//       preferences: {},
//       likedRecipes: [],
//       fridgeHistory: [],
//       generatedRecipes: [],
//       lastFridgeScan: null,
//       aiFridgeItems: [],
//       createdAt: new Date(),
//     });
//   }
// };

// /**
//  * Retrieves full user document by UID.
//  */
// const getUserById = async (uid) => {
//   const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
//   if (!doc.exists) return null;
//   return doc.data();
// };

// /**
//  * Returns a simplified user profile with key fields only.
//  */
// const getUserProfile = async (uid) => {
//   const user = await getUserById(uid);
//   if (!user) return null;

//   return {
//     uid: user.uid,
//     email: user.email,
//     preferences: user.preferences || {},
//     likedRecipes: user.likedRecipes || [],
//     lastFridgeScan: user.lastFridgeScan || null,
//   };
// };

// /**
//  * Adds a recipe ID to the user's likedRecipes array.
//  * Uses arrayUnion to avoid duplicates automatically.
//  */
// const addLikedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     likedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// /**
//  * Saves a fridge snapshot image and detected items to a subcollection,
//  * and updates the user's fridgeHistory and current aiFridgeItems.
//  */
// const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
//   const timestamp = new Date().toISOString();
//   await db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp).set({
//     detectedItems,
//     imageUrl,
//     timestamp,
//   });

//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const filteredItems = filterAllowedItems(detectedItems);

//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion({ detectedItems, imageUrl, timestamp }),
//     aiFridgeItems: filteredItems,
//     lastFridgeScan: timestamp,
//   });
// };

// /**
//  * Adds a generated recipe to the user's list of generatedRecipes.
//  * ✅ מבטיח שלא יתווסף פעמיים לפי ID
//  * ✅ מוסיף אותו גם ל־likedRecipes (רק אם לא קיים – בזכות arrayUnion)
//  */
// const addGeneratedRecipe = async (uid, recipeRecord) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentGenerated = userDoc.data().generatedRecipes || [];

//   // בדיקה אם המתכון כבר קיים לפי ID
//   const isAlreadyGenerated = currentGenerated.some(r => r.id === recipeRecord.id);

//   if (!isAlreadyGenerated) {
//     const updatedGenerated = [...currentGenerated, recipeRecord];
//     await userRef.update({ generatedRecipes: updatedGenerated });
//   }

//   // שמירה גם ל־likedRecipes בלי כפילויות (arrayUnion מונע כפילות)
//   await userRef.update({ likedRecipes: FieldValue.arrayUnion(recipeRecord.id) });
// };

// /**
//  * Updates the user's preferences object.
//  */
// const updatePreferences = async (uid, preferences) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
// };

// /**
//  * Adds a new item to the aiFridgeItems list (ensures uniqueness).
//  */
// const addItemToFridge = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = Array.from(new Set([...currentItems, item]));
//   await userRef.update({ aiFridgeItems: updatedItems });
// };

// /**
//  * Removes an item from the aiFridgeItems list.
//  */
// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = currentItems.filter(i => i !== item);
//   await userRef.update({ aiFridgeItems: updatedItems });
// };

// /**
//  * Saves a full aiFridgeItems list to the user document.
//  */
// const saveFridgeItemsToUser = async (uid, items) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({ aiFridgeItems: items });
// };

// /**
//  * Saves a complete snapshot (items + image) to the fridgeSnapshots subcollection
//  * and updates relevant fields in the user's main document.
//  */
// const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
//   const timestamp = new Date().toISOString();
//   const fridgeSnapshotRef = db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp);
//   const snapshot = { detectedItems: items, imageUrl, timestamp };

//   await fridgeSnapshotRef.set(snapshot);

//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion(snapshot),
//     aiFridgeItems: items,
//     lastFridgeScan: timestamp,
//     fridgeItems: items,
//     lastImageUploaded: imageUrl,
//   });
// };

// module.exports = {
//   createUser,
//   getUserById,
//   getUserProfile,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser,
//   saveFinalFridgeSnapshot,
// };


// ======================================================================
// User Model – Firestore Access Layer for User Data
// ======================================================================
//
// Purpose:
// This module defines functions that interact directly with Firestore's 'users' collection
// and related subcollections. It provides logic for creating and updating user data,
// managing preferences, liked recipes, fridge snapshots, and AI-generated fridge item lists.
//
// Firestore Structure:
// - Collection: 'users'
// - Subcollection: 'fridgeSnapshots' (under 'fridgeSnapshots/{uid}/snapshots')
// - Common fields: preferences, likedRecipes, aiFridgeItems, fridgeHistory, etc.

const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const admin = require('../config/firebaseAdmin');

const db = getFirestore();
const USERS_COLLECTION = 'users';

/**
 * Filters out irrelevant or generic items from detected fridge items.
 * Used to clean up results from object detection models.
 */
function filterAllowedItems(items) {
  const forbiddenWords = [
    'fruit', 'bottle', 'tableware', 'drinkware', 'beverage',
    'liquid', 'plate', 'bowl', 'cup', 'container', 'cutlery', 'utensil'
  ];
  return items.filter(item => {
    const normalizedItem = item.trim().toLowerCase();
    return !forbiddenWords.some(forbidden => normalizedItem.includes(forbidden));
  });
}

/**
 * Creates a new user document in Firestore if it doesn't already exist.
 */
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
      aiFridgeItems: [],
      createdAt: new Date(),
    });
  }
};

/**
 * Retrieves full user document by UID.
 */
const getUserById = async (uid) => {
  const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
  if (!doc.exists) return null;
  return doc.data();
};

/**
 * Returns a simplified user profile with key fields only.
 */
const getUserProfile = async (uid) => {
  const user = await getUserById(uid);
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    preferences: user.preferences || {},
    likedRecipes: user.likedRecipes || [],
    lastFridgeScan: user.lastFridgeScan || null,
  };
};

/**
 * Adds a recipe ID to the user's likedRecipes array.
 * Uses arrayUnion to avoid duplicates automatically.
 */
const addLikedRecipe = async (uid, recipeId) => {
  await db.collection(USERS_COLLECTION).doc(uid).update({
    likedRecipes: FieldValue.arrayUnion(recipeId),
  });
};

/**
 * Saves a fridge snapshot image and detected items to a subcollection,
 * and updates the user's fridgeHistory and current aiFridgeItems.
 */
const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
  const timestamp = new Date().toISOString();
  await db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp).set({
    detectedItems,
    imageUrl,
    timestamp,
  });

  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const filteredItems = filterAllowedItems(detectedItems);

  await userRef.update({
    fridgeHistory: FieldValue.arrayUnion({ detectedItems, imageUrl, timestamp }),
    aiFridgeItems: filteredItems,
    lastFridgeScan: timestamp,
  });
};

/**
 * Adds a generated recipe to the user's list of generatedRecipes.
 * ✅ מבטיח שלא יתווסף פעמיים לפי ID
 * ✅ מוסיף אותו גם ל־likedRecipes (רק אם לא קיים – בזכות arrayUnion)
 */
const addGeneratedRecipe = async (uid, recipeRecord) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) return;

  const currentGenerated = userDoc.data().generatedRecipes || [];

  // ✅ בדיקה אם המתכון כבר קיים לפי ID
  const isAlreadyGenerated = currentGenerated.some(r => r.id === recipeRecord.id);

  if (!isAlreadyGenerated) {
    const updatedGenerated = [...currentGenerated, recipeRecord];
    await userRef.update({ generatedRecipes: updatedGenerated });
  }

  // ✅ שמירה גם ל־likedRecipes בלי כפילויות (arrayUnion מונע כפילות)
  await userRef.update({
    likedRecipes: FieldValue.arrayUnion(recipeRecord.id),
  });
};

/**
 * Updates the user's preferences object.
 */
const updatePreferences = async (uid, preferences) => {
  await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
};

/**
 * Adds a new item to the aiFridgeItems list (ensures uniqueness).
 */
const addItemToFridge = async (uid, item) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) return;

  const currentItems = userDoc.data().aiFridgeItems || [];
  const updatedItems = Array.from(new Set([...currentItems, item]));
  await userRef.update({ aiFridgeItems: updatedItems });
};

/**
 * Removes an item from the aiFridgeItems list.
 */
const deleteFridgeItem = async (uid, item) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) return;

  const currentItems = userDoc.data().aiFridgeItems || [];
  const updatedItems = currentItems.filter(i => i !== item);
  await userRef.update({ aiFridgeItems: updatedItems });
};

/**
 * Saves a full aiFridgeItems list to the user document.
 */
const saveFridgeItemsToUser = async (uid, items) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.update({ aiFridgeItems: items });
};

/**
 * Saves a complete snapshot (items + image) to the fridgeSnapshots subcollection
 * and updates relevant fields in the user's main document.
 */
const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
  const timestamp = new Date().toISOString();
  const fridgeSnapshotRef = db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp);
  const snapshot = { detectedItems: items, imageUrl, timestamp };

  await fridgeSnapshotRef.set(snapshot);

  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.update({
    fridgeHistory: FieldValue.arrayUnion(snapshot),
    aiFridgeItems: items,
    lastFridgeScan: timestamp,
    fridgeItems: items,
    lastImageUploaded: imageUrl,
  });
};

module.exports = {
  createUser,
  getUserById,
  getUserProfile,
  addLikedRecipe,
  addFridgeSnapshot,
  addGeneratedRecipe,
  updatePreferences,
  addItemToFridge,
  deleteFridgeItem,
  saveFridgeItemsToUser,
  saveFinalFridgeSnapshot,
};
