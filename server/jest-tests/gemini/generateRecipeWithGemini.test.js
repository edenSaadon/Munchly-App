// ==============================================================================
// File: generateRecipeWithGemini.test.js
// Purpose:
// This test manually invokes the `generateRecipeWithGemini` function from the AI
// service layer (`flows/aiService.js`) to validate that a complete and meaningful
// recipe is returned when given:
// - A list of detected fridge items
// - User dietary preferences
// - Additional contextual answers (e.g., cravings, time, mood)
//
// The goal is to ensure that the Gemini-based AI service returns a valid object
// with a title, ingredients, and instructions that meet the expected structure.
//
// ==============================================================================
require('dotenv/config');
const { generateRecipeWithGemini } = require('../../flows/aiService');

describe('Gemini AI - generateRecipeWithGemini', () => {
  test('Should return a valid recipe object', async () => {
    const detectedItems = ['bread', 'cheddar cheese', 'butter', 'tomato'];
    const preferences = {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      lactoseFree: false,
      nutAllergy: false,
      seafoodAllergy: false,
    };
    const extraAnswers = {
      craving: 'savory',
      time: '30min',
      mood: 'snack',
    };

    const result = await generateRecipeWithGemini(detectedItems, preferences, extraAnswers);

    console.log(' AI Recipe Output:', result);

    expect(result).toHaveProperty('title');
    expect(Array.isArray(result.ingredients)).toBe(true);
    expect(Array.isArray(result.instructions)).toBe(true);
    expect(result.ingredients.length).toBeGreaterThan(0);
    expect(result.instructions.length).toBeGreaterThan(0);
  });
});
