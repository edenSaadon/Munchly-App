const admin = require('firebase-admin');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('./secrets/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'munchly-48936',
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

async function importAndStoreRecipe(index) {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    const meal = data.meals?.[0];
    if (!meal) {
      console.log(`❌ [${index}] No recipe found`);
      return;
    }

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

    const imageRes = await fetch(meal.strMealThumb);
    const buffer = await imageRes.buffer();

    const fileName = `recipes/${uuidv4()}.jpg`;
    const uuid = uuidv4();
    const file = bucket.file(fileName);

    await file.save(buffer, {
      metadata: {
        contentType: 'image/jpeg',
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
      resumable: false,
    });

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${uuid}`;
    recipe.imageUrl = imageUrl;

    const docRef = await db.collection('recipes').add(recipe);
    console.log(`✅ [${index}] Saved: ${recipe.title} (ID: ${docRef.id})`);
  } catch (err) {
    console.error(`❌ [${index}] Error:`, err.message);
  }
}

async function importBatch(count = 30) {
  for (let i = 1; i <= count; i++) {
    await importAndStoreRecipe(i);
  }
  console.log(`🎉 Imported ${count} recipes`);
}

importBatch();
