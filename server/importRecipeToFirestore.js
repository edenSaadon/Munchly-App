// =============================================
// Firebase Seeder Script for Initial Recipes
// =============================================
//
// Purpose:
// This script imports random recipes from the external API 'TheMealDB' and saves them
// into Firebase Firestore and Firebase Storage. It is intended for one-time use to
// populate the database with initial content for testing or demonstration purposes.
//
// Usage Note:
// This is a one-time execution script. It was run once to seed the Firestore database
// and Firebase Storage with a batch of sample recipes. It is not part of the production
// application flow and should not be re-run without caution.
//
// Source:
// TheMealDB API (https://www.themealdb.com/api.php) provides structured recipe data,
// including ingredients, instructions, and image URLs.
//
// Firebase Services Used:
// - Firestore: stores recipe metadata such as title, ingredients, and instructions
// - Storage: stores the recipe image associated with each recipe document

const admin = require('firebase-admin');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('./secrets/serviceAccountKey.json');

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'munchly-48936',
});

const db = admin.firestore(); // Firestore database instance
const bucket = admin.storage().bucket(); // Firebase Storage bucket reference

/**
 * Fetches a random recipe from TheMealDB API and stores it in Firestore and Storage.
 * @param {number} index - The iteration number used for logging and tracking progress.
 */
async function importAndStoreRecipe(index) {
  try {
    // Fetch a random meal object from TheMealDB
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    const meal = data.meals?.[0];
    if (!meal) {
      console.log(`❌ [${index}] No recipe found`);
      return;
    }

    // Create recipe object with initial structure
    const recipe = {
      title: meal.strMeal,
      instructions: meal.strInstructions,
      ingredients: [],
      imageUrl: '',
      createdBy: null,
      source: 'db',
      createdAt: new Date(),
      likes: 0,
    };

    // Extract up to 20 ingredients with their quantities
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const quantity = meal[`strMeasure${i}`];
      if (name && name.trim()) {
        recipe.ingredients.push({
          name: name.trim(),
          quantity: quantity ? quantity.trim() : '',
        });
      }
    }

    // Download the image and prepare it for Firebase Storage
    const imageRes = await fetch(meal.strMealThumb);
    const buffer = await imageRes.buffer();

    const fileName = `recipes/${uuidv4()}.jpg`; // Generate a unique image filename
    const uuid = uuidv4(); // Unique download token
    const file = bucket.file(fileName); // Reference to the file in the bucket

    // Upload the image with associated metadata including the download token
    await file.save(buffer, {
      metadata: {
        contentType: 'image/jpeg',
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
      resumable: false,
    });

    // Construct a public image URL with the download token
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${uuid}`;
    recipe.imageUrl = imageUrl;

    // Save the complete recipe object to Firestore
    const docRef = await db.collection('recipes').add(recipe);
    console.log(`✅ [${index}] Saved: ${recipe.title} (ID: ${docRef.id})`);
  } catch (err) {
    console.error(`❌ [${index}] Error:`, err.message);
  }
}

/**
 * Imports a batch of recipes by repeatedly calling the import function.
 * @param {number} count - Number of recipes to import. Default is 30.
 */
async function importBatch(count = 30) {
  for (let i = 1; i <= count; i++) {
    await importAndStoreRecipe(i);
  }
  console.log(`🎉 Imported ${count} recipes`);
}

// Start the import process
importBatch();
