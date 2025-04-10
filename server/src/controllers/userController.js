// ✅ server/src/controllers/userController.js
const {
  createUser,
  getUserById,
  addLikedRecipe,
  addFridgeSnapshot,
  addGeneratedRecipe,
  updatePreferences,
} = require('../models/UserModel');

const { ImageAnnotatorClient } = require('@google-cloud/vision');
const visionClient = new ImageAnnotatorClient();

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
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { preferences, likedRecipes, fridgeHistory } = user;
    const lastFridgeScan = fridgeHistory?.[fridgeHistory.length - 1]?.timestamp || null;

    res.status(200).json({
      uid: user.uid,
      email: user.email,
      preferences,
      likedRecipes,
      lastFridgeScan,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// פונקציה שמבצעת זיהוי תמונה ב-Google Vision
// const scanFridgeHandler = async (req, res) => {
//   try {
//     const chunks = [];
//     req.on('data', chunk => chunks.push(chunk));
//     req.on('end', async () => {
//       const buffer = Buffer.concat(chunks);
//       const uid = req.user?.uid;
//       if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//       // שלב 1: שליחת התמונה ל-Google Vision לזיהוי
//       const [result] = await visionClient.labelDetection({ image: { content: buffer } });
//       const labels = result.labelAnnotations.map(label => label.description);

//       console.log('📷 Vision labels:', labels);

//       // שלב 2: הוספת המוצרים שזוהו להיסטוריית המקרר של המשתמש ב-Firestore
//       await addFridgeSnapshot(uid, labels);

//       res.status(200).json({ items: labels });
//     });
//   } catch (error) {
//     console.error('❌ Error during Vision scan:', error);
//     res.status(500).json({ message: 'Vision scan failed' });
//   }
// };

// const scanFridgeHandler = async (req, res) => {
//   try {
//     const chunks = [];
//     req.on('data', chunk => chunks.push(chunk));
//     req.on('end', async () => {
//       const buffer = Buffer.concat(chunks);
//       const uid = req.user?.uid;
//       if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//       // שלב 1: שליחת התמונה ל-Google Vision לזיהוי
//       const [result] = await visionClient.labelDetection({ image: { content: buffer } });
//       const labels = result.labelAnnotations.map(label => label.description);

//       console.log('📷 Vision labels:', labels); // הצגת המוצרים שזוהו בלוג

//       // שלב 2: החזרת התוצאה
//       res.status(200).json({ items: labels }); // מחזירים את המוצרים שזוהו
//     });
//   } catch (error) {
//     console.error('❌ Error during Vision scan:', error);
//     res.status(500).json({ message: 'Vision scan failed' });
//   }
// };


const scanFridgeHandler = async (req, res) => {
  try {
    console.log("🛠️ Image received on server");

    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      const uid = req.user?.uid;

      if (!uid) {
        console.log("❌ User not authenticated");
        return res.status(401).json({ message: 'User not authenticated' });
      }
      
      console.log("✅ User authenticated, UID:", uid);
      console.log("📥 Image size:", buffer.length, "bytes");

      // שלב 1: שליחת התמונה ל-Google Vision לזיהוי
      console.log("🚀 Sending image to Google Vision...");
      const [result] = await visionClient.labelDetection({ image: { content: buffer } });
      
      console.log("📷 Google Vision response:", result);

      const labels = result.labelAnnotations.map(label => label.description);

      if (labels.length === 0) {
        console.log("❌ No labels detected by Google Vision");
        return res.status(500).json({ message: 'No labels detected from image' });
      }

      console.log("📦 Detected labels:", labels);

      // שלב 2: החזרת התוצאה
      res.status(200).json({ items: labels });
    });
  } catch (error) {
    console.error('❌ Error during Vision scan:', error);
    res.status(500).json({ message: 'Vision scan failed' });
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

const updatePreferencesHandler = async (req, res) => {
  const { uid } = req.params;

  if (uid !== req.user.uid) {
    console.warn(`⚠️ UID mismatch: token UID = ${req.user.uid}, requested UID = ${uid}`);
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const preferences = req.body.preferences;

    if (!preferences || typeof preferences !== 'object') {
      return res.status(400).json({ message: 'Invalid preferences data' });
    }

    console.log(`📥 Updating preferences for UID: ${uid}`, preferences);

    await updatePreferences(uid, preferences);

    res.status(200).json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('❌ Error updating preferences:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createUser: createUserHandler,
  getUser,
  addLikedRecipe: addLikedRecipeHandler,
  addFridgeSnapshot: addFridgeSnapshotHandler,
  addGeneratedRecipe: addGeneratedRecipeHandler,
  updatePreferences: updatePreferencesHandler,
  scanFridge: scanFridgeHandler, // הוספתי את הפונקציה הזאת
};


// const { ImageAnnotatorClient } = require('@google-cloud/vision');
// const visionClient = new ImageAnnotatorClient();
// const admin = require('../config/firebaseAdmin');

// const createUserHandler = async (req, res) => {
//   const { uid, name, email } = req.body;
//   try {
//     await createUser({ uid, name, email });
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getUser = async (req, res) => {
//   if (req.params.uid !== req.user.uid) {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   try {
//     const user = await getUserById(req.params.uid);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const { preferences, likedRecipes, fridgeHistory } = user;
//     const lastFridgeScan = fridgeHistory?.[fridgeHistory.length - 1]?.timestamp || null;

//     res.status(200).json({
//       uid: user.uid,
//       email: user.email,
//       preferences,
//       likedRecipes,
//       lastFridgeScan,
//     });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // פונקציה שמבצעת זיהוי תמונה ב-Google Vision
// const scanFridgeHandler = async (req, res) => {
//   try {
//     const chunks = [];
//     req.on('data', chunk => chunks.push(chunk));
//     req.on('end', async () => {
//       const buffer = Buffer.concat(chunks);
//       const uid = req.user?.uid;
//       if (!uid) return res.status(401).json({ message: 'User not authenticated' });

//       // שלב 1: שליחת התמונה ל-Google Vision לזיהוי
//       const [result] = await visionClient.labelDetection({ image: { content: buffer } });
//       const labels = result.labelAnnotations.map(label => label.description);

//       console.log('📷 Vision labels:', labels); // הצגת המוצרים שזוהו בלוג

//       // שלב 2: החזרת התוצאה
//       res.status(200).json({ items: labels }); // מחזירים את המוצרים שזוהו
//     });
//   } catch (error) {
//     console.error('❌ Error during Vision scan:', error);
//     res.status(500).json({ message: 'Vision scan failed' });
//   }
// };

// const addLikedRecipeHandler = async (req, res) => {
//   if (req.params.uid !== req.user.uid) {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   const { recipeId } = req.body;
//   try {
//     await addLikedRecipe(req.params.uid, recipeId);
//     res.status(200).json({ message: 'Recipe liked successfully' });
//   } catch (error) {
//     console.error('Error adding liked recipe:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const addFridgeSnapshotHandler = async (req, res) => {
//   if (req.params.uid !== req.user.uid) {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   const { detectedItems } = req.body;
//   try {
//     await addFridgeSnapshot(req.params.uid, detectedItems);
//     res.status(200).json({ message: 'Fridge snapshot added successfully' });
//   } catch (error) {
//     console.error('Error adding fridge snapshot:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const addGeneratedRecipeHandler = async (req, res) => {
//   if (req.params.uid !== req.user.uid) {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   const { recipeId } = req.body;
//   try {
//     await addGeneratedRecipe(req.params.uid, recipeId);
//     res.status(200).json({ message: 'Generated recipe saved successfully' });
//   } catch (error) {
//     console.error('Error saving generated recipe:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const updatePreferencesHandler = async (req, res) => {
//   const { uid } = req.params;

//   if (uid !== req.user.uid) {
//     console.warn(`⚠️ UID mismatch: token UID = ${req.user.uid}, requested UID = ${uid}`);
//     return res.status(403).json({ message: 'Access denied' });
//   }

//   try {
//     const preferences = req.body.preferences;

//     if (!preferences || typeof preferences !== 'object') {
//       return res.status(400).json({ message: 'Invalid preferences data' });
//     }

//     console.log(`📥 Updating preferences for UID: ${uid}`, preferences);

//     await updatePreferences(uid, preferences);

//     res.status(200).json({ message: 'Preferences updated successfully' });
//   } catch (error) {
//     console.error('❌ Error updating preferences:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   createUser: createUserHandler,
//   getUser,
//   addLikedRecipe: addLikedRecipeHandler,
//   addFridgeSnapshot: addFridgeSnapshotHandler,
//   addGeneratedRecipe: addGeneratedRecipeHandler,
//   updatePreferences: updatePreferencesHandler,
//   scanFridge: scanFridgeHandler, // הוספתי את הפונקציה הזאת
// };
