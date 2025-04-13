// // ✅ server/src/models/UserModel.js
// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const db = getFirestore();

// const USERS_COLLECTION = 'users';

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
//       createdAt: new Date(),
//     });
//   }
// };

// const getUserById = async (uid) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const doc = await userRef.get();
//   if (!doc.exists) return null;
//   return doc.data();
// };

// const addLikedRecipe = async (uid, recipeId) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     likedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const addFridgeSnapshot = async (uid, detectedItems) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const newSnapshot = {
//     detectedItems,
//     timestamp: new Date(),
//   };
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion(newSnapshot),
//     lastFridgeScan: newSnapshot.timestamp,
//   });
// };

// const addGeneratedRecipe = async (uid, recipeId) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     generatedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const updatePreferences = async (uid, preferences) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({ preferences });
// };

// // פונקציה לעדכן את מצב הסריקה
// const updateLastScanStatus = async (uid, status) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     lastScanStatus: status, // סטטוס הסריקה, לדוגמה "scanned" או "pending"
//   });
// };

// // פונקציה למחוק את הסריקה האחרונה
// const deleteLastFridgeScan = async (uid) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayRemove({ timestamp: userRef.timestamp }),
//     lastScanStatus: "pending", // Reset the status after deleting the scan
//   });
// };

// const addItemToFridge = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);

//   // נוסיף את המוצר החדש ל-`fridgeHistory`
//   const newItem = {
//     item,
//     timestamp: new Date(),  // נוסיף תאריך לזמן הוספת המוצר
//   };

//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion(newItem),
//   });
// };


// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
  
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayRemove({ detectedItems: [item] }),
//   });

//   console.log('✅ Product removed from fridge history');
// };




// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
// };


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

// פונקציה לעדכן את מצב הסריקה
const updateLastScanStatus = async (uid, status) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.update({
    lastScanStatus: status, // סטטוס הסריקה, לדוגמה "scanned" או "pending"
  });
};

// פונקציה למחוק את הסריקה האחרונה
const deleteLastFridgeScan = async (uid) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.update({
    fridgeHistory: FieldValue.arrayRemove({ timestamp: userRef.timestamp }),
    lastScanStatus: "pending", // Reset the status after deleting the scan
  });
};

const addItemToFridge = async (uid, item) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);

  // נוסיף את המוצר החדש ל-`fridgeHistory`
  const newItem = {
    item,
    timestamp: new Date(),  // נוסיף תאריך לזמן הוספת המוצר
  };

  await userRef.update({
    fridgeHistory: FieldValue.arrayUnion(newItem),
  });
};

// פונקציה למחוק מוצר מתוך ה-FridgeHistory
const deleteFridgeItem = async (uid, item) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  
  // כאן יש לעדכן את המבנה למוצר בתוך ה-fridgeHistory לפי איך שאתה שומר את המידע
  await userRef.update({
    fridgeHistory: FieldValue.arrayRemove({ item }), // אנחנו מניחים שמכילים רק את השם של המוצר
  });

  console.log('✅ Product removed from fridge history');
};

module.exports = {
  createUser,
  getUserById,
  addLikedRecipe,
  addFridgeSnapshot,
  addGeneratedRecipe,
  updatePreferences,
  updateLastScanStatus,
  deleteLastFridgeScan,
  addItemToFridge,
  deleteFridgeItem,
};
