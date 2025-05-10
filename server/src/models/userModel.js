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


// // ✅ server/src/models/UserModel.js
// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin'); // וודא שזו הדרך בה אתה מייבא את ה־firebaseAdmin

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

// // const addFridgeSnapshot = async (uid, detectedItems) => {
// //   const userRef = db.collection(USERS_COLLECTION).doc(uid);
// //   const newSnapshot = {
// //     detectedItems,
// //     timestamp: new Date(),
// //   };
// //   await userRef.update({
// //     fridgeHistory: FieldValue.arrayUnion(newSnapshot),
// //     lastFridgeScan: newSnapshot.timestamp,
// //   });
// // };

// // פונקציה לשמירה של סריקת מקרר ב-Firestore
// const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
//   try {
//     const db = admin.firestore(); // גישה ל-Firestore

//     // יצירת קובץ סריקה חדש עם תאריך
//     const timestamp = new Date().toISOString();
//     const fridgeSnapshotRef = db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp);

//     // שמירה של המידע ב-Firestore
//     await fridgeSnapshotRef.set({
//       detectedItems, // המוצרים שזוהו
//       imageUrl,      // ה-URL של התמונה
//       timestamp,     // תאריך הסריקה
//     });

//     console.log("✅ Fridge snapshot added successfully.");
//   } catch (error) {
//     console.error("❌ Error saving fridge snapshot:", error);
//     throw new Error('Error saving fridge snapshot');
//   }
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

// // פונקציה למחוק מוצר מתוך ה-FridgeHistory
// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
  
//   // כאן יש לעדכן את המבנה למוצר בתוך ה-fridgeHistory לפי איך שאתה שומר את המידע
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayRemove({ item }), // אנחנו מניחים שמכילים רק את השם של המוצר
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
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
// };

// // ✅ server/src/models/UserModel.js
// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin'); // וודא שזו הדרך בה אתה מייבא את ה־firebaseAdmin

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

// // פונקציה לשמירה של סריקת מקרר ב-Firestore
// const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
//   try {
//     const db = admin.firestore(); // גישה ל-Firestore

//     // יצירת קובץ סריקה חדש עם תאריך
//     const timestamp = new Date().toISOString();
//     const fridgeSnapshotRef = db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp);

//     // שמירה של המידע ב-Firestore
//     await fridgeSnapshotRef.set({
//       detectedItems, // המוצרים שזוהו
//       imageUrl,      // ה-URL של התמונה
//       timestamp,     // תאריך הסריקה
//     });

//     console.log("✅ Fridge snapshot added successfully.");
//   } catch (error) {
//     console.error("❌ Error saving fridge snapshot:", error);
//     throw new Error('Error saving fridge snapshot');
//   }
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

// // פונקציה למחוק מוצר מתוך ה-FridgeHistory
// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
  
//   // כאן יש לעדכן את המבנה למוצר בתוך ה-fridgeHistory לפי איך שאתה שומר את המידע
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayRemove({ item }), // אנחנו מניחים שמכילים רק את השם של המוצר
//   });

//   console.log('✅ Product removed from fridge history');
// };

// // ✅ פונקציה חדשה לשמירה מרוכזת של פריטים לסיום
// const saveFridgeItemsToUser = async (uid, items) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({ fridgeItems: items });
// };

// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser, // ✅ הוספה כאן
// };

// // ✅ server/src/models/UserModel.js
// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin'); // וודא שזו הדרך בה אתה מייבא את ה־firebaseAdmin

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

// // פונקציה לשמירה של סריקת מקרר ב-Firestore
// const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
//   try {
//     const db = admin.firestore(); // גישה ל-Firestore

//     const timestamp = new Date().toISOString();
//     const fridgeSnapshotRef = db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp);

//     await fridgeSnapshotRef.set({
//       detectedItems,
//       imageUrl,
//       timestamp,
//     });

//     // ✅ שמירה גם תחת היוזר הראשי
//     const userRef = db.collection(USERS_COLLECTION).doc(uid);
//     await userRef.update({
//       fridgeHistory: FieldValue.arrayUnion({ detectedItems, imageUrl, timestamp }),
//       lastFridgeScan: timestamp,
//     });

//     console.log("✅ Fridge snapshot added successfully.");
//   } catch (error) {
//     console.error("❌ Error saving fridge snapshot:", error);
//     throw new Error('Error saving fridge snapshot');
//   }
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

// const updateLastScanStatus = async (uid, status) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     lastScanStatus: status,
//   });
// };

// const deleteLastFridgeScan = async (uid) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayRemove({ timestamp: userRef.timestamp }),
//     lastScanStatus: "pending",
//   });
// };

// const addItemToFridge = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);

//   const newItem = {
//     item,
//     timestamp: new Date(),
//   };

//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion(newItem),
//   });
// };

// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayRemove({ item }),
//   });
//   console.log('✅ Product removed from fridge history');
// };

// // ✅ פונקציה חדשה לשמירה מרוכזת של פריטים לסיום
// const saveFridgeItemsToUser = async (uid, items, imageUrl = null) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const data = { fridgeItems: items };
//   if (imageUrl) {
//     data.lastImageUploaded = imageUrl;
//   }
//   await userRef.update(data);
// };

// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser,
// };
// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin');

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
//   const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
//   if (!doc.exists) return null;
//   return doc.data();
// };

// const addLikedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     likedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
//   const timestamp = new Date().toISOString();

//   await db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp).set({
//     detectedItems,
//     imageUrl,
//     timestamp,
//   });

//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayUnion({ detectedItems, imageUrl, timestamp }),
//     lastFridgeScan: timestamp,
//   });
// };

// const addGeneratedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     generatedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const updatePreferences = async (uid, preferences) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
// };

// const updateLastScanStatus = async (uid, status) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ lastScanStatus: status });
// };

// const deleteLastFridgeScan = async (uid) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayRemove({ timestamp: db.collection(USERS_COLLECTION).doc(uid).timestamp }),
//     lastScanStatus: "pending",
//   });
// };

// const addItemToFridge = async (uid, item) => {
//   const newItem = { item, timestamp: new Date() };
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayUnion(newItem),
//   });
// };

// const deleteFridgeItem = async (uid, item) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayRemove({ item }),
//   });
// };

// // const saveFridgeItemsToUser = async (uid, items, imageUrl = null) => {
// //   const data = { fridgeItems: items };
// //   if (imageUrl) data.lastImageUploaded = imageUrl;
// //   await db.collection(USERS_COLLECTION).doc(uid).update(data);
// // };
// const saveFridgeItemsToUser = async (uid, items, imageUrl = null) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);

//   // שמירה ב־fridgeItems (רשימה עדכנית) ובתוך fridgeHistory (לוג היסטורי)
//   const timestamp = new Date().toISOString();
//   const snapshot = {
//     detectedItems: items,
//     imageUrl: imageUrl || null,
//     timestamp,
//   };

//   await userRef.update({
//     fridgeItems: items, // רשימה עדכנית
//     fridgeHistory: FieldValue.arrayUnion(snapshot), // הוספה להיסטוריה
//     lastFridgeScan: timestamp,
//     ...(imageUrl && { lastImageUploaded: imageUrl }),
//   });
// };

// // ✅ שמירה של המצב הסופי של המקרר (כולל כל מה שהמשתמש הוסיף או הסיר)
// const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
//   const db = admin.firestore();
//   const timestamp = new Date().toISOString();

//   const fridgeSnapshotRef = db
//     .collection('fridgeSnapshots')
//     .doc(uid)
//     .collection('snapshots')
//     .doc(timestamp);

//   const snapshot = { detectedItems: items, imageUrl, timestamp };

//   await fridgeSnapshotRef.set(snapshot);

//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion(snapshot),
//     lastFridgeScan: timestamp,
//     fridgeItems: items,
//     lastImageUploaded: imageUrl,
//   });

//   console.log('✅ Final snapshot saved to user and snapshot collection');
// };


// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser,
//   saveFinalFridgeSnapshot,
// };


// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin');

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
//   const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
//   if (!doc.exists) return null;
//   return doc.data();
// };

// const addLikedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     likedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
//   const timestamp = new Date().toISOString();

//   await db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp).set({
//     detectedItems,
//     imageUrl,
//     timestamp,
//   });

//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion({ detectedItems, imageUrl, timestamp }),
//     aiFridgeItems: detectedItems, // ✅ עדכון השדה החדש
//     lastFridgeScan: timestamp,
//   });
// };

// const addGeneratedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     generatedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const updatePreferences = async (uid, preferences) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
// };

// const updateLastScanStatus = async (uid, status) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ lastScanStatus: status });
// };

// const deleteLastFridgeScan = async (uid) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayRemove({ timestamp: db.collection(USERS_COLLECTION).doc(uid).timestamp }),
//     lastScanStatus: "pending",
//   });
// };

// const addItemToFridge = async (uid, item) => {
//   const newItem = { item, timestamp: new Date() };
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayUnion(newItem),
//   });
// };

// const deleteFridgeItem = async (uid, item) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayRemove({ item }),
//   });
// };

// const saveFridgeItemsToUser = async (uid, items, imageUrl = null) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);

//   const timestamp = new Date().toISOString();
//   const snapshot = {
//     detectedItems: items,
//     imageUrl: imageUrl || null,
//     timestamp,
//   };

//   await userRef.update({
//     fridgeItems: items,
//     fridgeHistory: FieldValue.arrayUnion(snapshot),
//     aiFridgeItems: items, // ✅ עדכון השדה החדש
//     lastFridgeScan: timestamp,
//     ...(imageUrl && { lastImageUploaded: imageUrl }),
//   });
// };

// const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
//   const db = admin.firestore();
//   const timestamp = new Date().toISOString();

//   const fridgeSnapshotRef = db
//     .collection('fridgeSnapshots')
//     .doc(uid)
//     .collection('snapshots')
//     .doc(timestamp);

//   const snapshot = { detectedItems: items, imageUrl, timestamp };

//   await fridgeSnapshotRef.set(snapshot);

//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion(snapshot),
//     aiFridgeItems: items, // ✅ גם כאן
//     lastFridgeScan: timestamp,
//     fridgeItems: items,
//     lastImageUploaded: imageUrl,
//   });

//   console.log('✅ Final snapshot saved to user and snapshot collection');
// };

// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser,
//   saveFinalFridgeSnapshot,
// };

// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin');

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
//       aiFridgeItems: [],
//       createdAt: new Date(),
//     });
//   }
// };

// const getUserById = async (uid) => {
//   const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
//   if (!doc.exists) return null;
//   return doc.data();
// };

// const addLikedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     likedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
//   const timestamp = new Date().toISOString();

//   await db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp).set({
//     detectedItems,
//     imageUrl,
//     timestamp,
//   });

//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion({ detectedItems, imageUrl, timestamp }),
//     aiFridgeItems: detectedItems,
//     lastFridgeScan: timestamp,
//   });
// };

// const addGeneratedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     generatedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const updatePreferences = async (uid, preferences) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
// };

// const updateLastScanStatus = async (uid, status) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ lastScanStatus: status });
// };

// const deleteLastFridgeScan = async (uid) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayRemove({ timestamp: db.collection(USERS_COLLECTION).doc(uid).timestamp }),
//     lastScanStatus: "pending",
//   });
// };

// const addItemToFridge = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = Array.from(new Set([...currentItems, item]));

//   await userRef.update({
//     aiFridgeItems: updatedItems,
//   });
// };

// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = currentItems.filter(i => i !== item);

//   await userRef.update({
//     aiFridgeItems: updatedItems,
//   });
// };

// // ✅ מתוקן - רק aiFridgeItems מתעדכן
// const saveFridgeItemsToUser = async (uid, items) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);

//   await userRef.update({
//     aiFridgeItems: items,
//   });
// };

// const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
//   const db = admin.firestore();
//   const timestamp = new Date().toISOString();

//   const fridgeSnapshotRef = db
//     .collection('fridgeSnapshots')
//     .doc(uid)
//     .collection('snapshots')
//     .doc(timestamp);

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

//   console.log('✅ Final snapshot saved to user and snapshot collection');
// };

// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser,
//   saveFinalFridgeSnapshot,
// };



// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin');

// const db = getFirestore();
// const USERS_COLLECTION = 'users';

// // ✅ פונקציה שמנקה מילים לא רלוונטיות מהפריטים
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

// const getUserById = async (uid) => {
//   const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
//   if (!doc.exists) return null;
//   return doc.data();
// };

// const addLikedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     likedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const addFridgeSnapshot = async (uid, detectedItems, imageUrl) => {
//   const timestamp = new Date().toISOString();

//   await db.collection('fridgeSnapshots').doc(uid).collection('snapshots').doc(timestamp).set({
//     detectedItems,
//     imageUrl,
//     timestamp,
//   });

//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const filteredItems = filterAllowedItems(detectedItems); // ✅ סינון לפני שמירת aiFridgeItems

//   await userRef.update({
//     fridgeHistory: FieldValue.arrayUnion({ detectedItems, imageUrl, timestamp }), // ❗ שומר הכל
//     aiFridgeItems: filteredItems, // ❗ שומר רק מה שמפולטר
//     lastFridgeScan: timestamp,
//   });
// };

// const addGeneratedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     generatedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

// const updatePreferences = async (uid, preferences) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
// };

// const updateLastScanStatus = async (uid, status) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ lastScanStatus: status });
// };

// const deleteLastFridgeScan = async (uid) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayRemove({ timestamp: db.collection(USERS_COLLECTION).doc(uid).timestamp }),
//     lastScanStatus: "pending",
//   });
// };

// const addItemToFridge = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = Array.from(new Set([...currentItems, item]));

//   await userRef.update({
//     aiFridgeItems: updatedItems,
//   });
// };

// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = currentItems.filter(i => i !== item);

//   await userRef.update({
//     aiFridgeItems: updatedItems,
//   });
// };

// const saveFridgeItemsToUser = async (uid, items) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);

//   await userRef.update({
//     aiFridgeItems: items,
//   });
// };

// const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
//   const db = admin.firestore();
//   const timestamp = new Date().toISOString();

//   const fridgeSnapshotRef = db
//     .collection('fridgeSnapshots')
//     .doc(uid)
//     .collection('snapshots')
//     .doc(timestamp);

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

//   console.log('✅ Final snapshot saved to user and snapshot collection');
// };

// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser,
//   saveFinalFridgeSnapshot,
// };


// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin');

// const db = getFirestore();
// const USERS_COLLECTION = 'users';

// // ✅ פונקציה שמנקה מילים לא רלוונטיות מהפריטים
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

// const getUserById = async (uid) => {
//   const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
//   if (!doc.exists) return null;
//   return doc.data();
// };

// const addLikedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     likedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

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

// const addGeneratedRecipe = async (uid, recipeId, recipeData) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);

//   await userRef.update({
//     generatedRecipes: FieldValue.arrayUnion({
//       id: recipeId,
//       ...recipeData,
//       savedAt: new Date().toISOString(),
//     }),
//   });
// };

// const updatePreferences = async (uid, preferences) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
// };

// const updateLastScanStatus = async (uid, status) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ lastScanStatus: status });
// };

// const deleteLastFridgeScan = async (uid) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayRemove({ timestamp: db.collection(USERS_COLLECTION).doc(uid).timestamp }),
//     lastScanStatus: "pending",
//   });
// };

// const addItemToFridge = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = Array.from(new Set([...currentItems, item]));

//   await userRef.update({
//     aiFridgeItems: updatedItems,
//   });
// };

// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = currentItems.filter(i => i !== item);

//   await userRef.update({
//     aiFridgeItems: updatedItems,
//   });
// };

// const saveFridgeItemsToUser = async (uid, items) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     aiFridgeItems: items,
//   });
// };

// const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
//   const db = admin.firestore();
//   const timestamp = new Date().toISOString();

//   const fridgeSnapshotRef = db
//     .collection('fridgeSnapshots')
//     .doc(uid)
//     .collection('snapshots')
//     .doc(timestamp);

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

//   console.log('✅ Final snapshot saved to user and snapshot collection');
// };

// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser,
//   saveFinalFridgeSnapshot,
// };


// const { getFirestore, FieldValue } = require('firebase-admin/firestore');
// const admin = require('../config/firebaseAdmin');

// const db = getFirestore();
// const USERS_COLLECTION = 'users';

// // ✅ פונקציה שמנקה מילים לא רלוונטיות מהפריטים
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
//       generatedRecipes: [], // ← כאן ישמרו כל המתכונים
//       lastFridgeScan: null,
//       aiFridgeItems: [],
//       createdAt: new Date(),
//     });
//   }
// };

// const getUserById = async (uid) => {
//   const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
//   if (!doc.exists) return null;
//   return doc.data();
// };

// const addLikedRecipe = async (uid, recipeId) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     likedRecipes: FieldValue.arrayUnion(recipeId),
//   });
// };

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

// // ✅ מאפשר לשמור כל מתכון חדש עם timestamp וסריקה
// const addGeneratedRecipe = async (uid, recipeRecord) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   const current = userDoc.data().generatedRecipes || [];

//   const updated = [...current, recipeRecord];

//   await userRef.update({ generatedRecipes: updated });
// };

// const updatePreferences = async (uid, preferences) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
// };

// const updateLastScanStatus = async (uid, status) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({ lastScanStatus: status });
// };

// const deleteLastFridgeScan = async (uid) => {
//   await db.collection(USERS_COLLECTION).doc(uid).update({
//     fridgeHistory: FieldValue.arrayRemove({ timestamp: db.collection(USERS_COLLECTION).doc(uid).timestamp }),
//     lastScanStatus: "pending",
//   });
// };

// const addItemToFridge = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = Array.from(new Set([...currentItems, item]));

//   await userRef.update({
//     aiFridgeItems: updatedItems,
//   });
// };

// const deleteFridgeItem = async (uid, item) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   const userDoc = await userRef.get();
//   if (!userDoc.exists) return;

//   const currentItems = userDoc.data().aiFridgeItems || [];
//   const updatedItems = currentItems.filter(i => i !== item);

//   await userRef.update({
//     aiFridgeItems: updatedItems,
//   });
// };

// const saveFridgeItemsToUser = async (uid, items) => {
//   const userRef = db.collection(USERS_COLLECTION).doc(uid);
//   await userRef.update({
//     aiFridgeItems: items,
//   });
// };

// const saveFinalFridgeSnapshot = async (uid, items, imageUrl) => {
//   const db = admin.firestore();
//   const timestamp = new Date().toISOString();

//   const fridgeSnapshotRef = db
//     .collection('fridgeSnapshots')
//     .doc(uid)
//     .collection('snapshots')
//     .doc(timestamp);

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

//   console.log('✅ Final snapshot saved to user and snapshot collection');
// };

// module.exports = {
//   createUser,
//   getUserById,
//   addLikedRecipe,
//   addFridgeSnapshot,
//   addGeneratedRecipe,
//   updatePreferences,
//   updateLastScanStatus,
//   deleteLastFridgeScan,
//   addItemToFridge,
//   deleteFridgeItem,
//   saveFridgeItemsToUser,
//   saveFinalFridgeSnapshot,
// };

// ✅ server/src/models/UserModel.js
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const admin = require('../config/firebaseAdmin');

const db = getFirestore();
const USERS_COLLECTION = 'users';

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

const getUserById = async (uid) => {
  const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
  if (!doc.exists) return null;
  return doc.data();
};

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

// const getUserProfile = async (uid) => {
//   console.log('🔍 Fetching profile from Firestore for uid:', uid);
//   const user = await getUserById(uid);
//   if (!user) {
//     console.warn('⚠️ No user found in Firestore!');
//     return null;
//   }
//   return {
//     uid: user.uid,
//     email: user.email,
//     preferences: user.preferences || {},
//     likedRecipes: user.likedRecipes || [],
//     lastFridgeScan: user.lastFridgeScan || null,
//   };
// };

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



const addLikedRecipe = async (uid, recipeId) => {
  await db.collection(USERS_COLLECTION).doc(uid).update({
    likedRecipes: FieldValue.arrayUnion(recipeId),
  });
};

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

const addGeneratedRecipe = async (uid, recipeRecord) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const userDoc = await userRef.get();
  const current = userDoc.data().generatedRecipes || [];
  const updated = [...current, recipeRecord];
  await userRef.update({ generatedRecipes: updated });
};

const updatePreferences = async (uid, preferences) => {
  await db.collection(USERS_COLLECTION).doc(uid).update({ preferences });
};

const addItemToFridge = async (uid, item) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) return;
  const currentItems = userDoc.data().aiFridgeItems || [];
  const updatedItems = Array.from(new Set([...currentItems, item]));
  await userRef.update({ aiFridgeItems: updatedItems });
};

const deleteFridgeItem = async (uid, item) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) return;
  const currentItems = userDoc.data().aiFridgeItems || [];
  const updatedItems = currentItems.filter(i => i !== item);
  await userRef.update({ aiFridgeItems: updatedItems });
};

const saveFridgeItemsToUser = async (uid, items) => {
  const userRef = db.collection(USERS_COLLECTION).doc(uid);
  await userRef.update({ aiFridgeItems: items });
};

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
