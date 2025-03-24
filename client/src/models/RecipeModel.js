// src/models/RecipeModel.js

export class RecipeModel {
  constructor({
    id,
    title,
    description,
    ingredients = [],
    steps = [],
    imageUrl = '',
    createdBy = null,
  }) {
    this.id = id || null;
    this.title = title || '';
    this.description = description || '';
    this.ingredients = ingredients;
    this.steps = steps;
    this.imageUrl = imageUrl;
    this.createdBy = createdBy; // User ID או אובייקט משתמש
  }

  // יצירת מתכון מאובייקט שהתקבל מ־Firestore
  static fromFirestore(doc) {
    const data = doc.data();
    return new RecipeModel({
      id: doc.id,
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      steps: data.steps,
      imageUrl: data.imageUrl,
      createdBy: data.createdBy,
    });
  }

  // המרה חזרה לאובייקט שמתאים ל־Firestore
  toFirestore() {
    return {
      title: this.title,
      description: this.description,
      ingredients: this.ingredients,
      steps: this.steps,
      imageUrl: this.imageUrl,
      createdBy: this.createdBy,
    };
  }
}
