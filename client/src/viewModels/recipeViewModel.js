// src/viewmodels/recipeViewModel.js
import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { RecipeModel } from '../models/RecipeModel';

export async function addRecipe(recipe) {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), recipe.toFirestore());
    console.log('📦 Recipe added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding recipe:', error);
    throw error;
  }
}

export async function getAllRecipes() {
  try {
    const snapshot = await getDocs(collection(db, 'recipes'));
    return snapshot.docs.map((doc) => RecipeModel.fromFirestore(doc));
  } catch (error) {
    console.error('❌ Error fetching recipes:', error);
    return [];
  }
}
