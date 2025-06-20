// ==============================================
// AI Recipe Generator Service (Gemini Integration)
// ==============================================
//
// Purpose:
// This module connects directly to Google Cloud's Generative AI API (Gemini)
// to generate AI-created recipes based on a user's fridge items, preferences,
// and additional context. It does not rely on Firebase but uses a direct API key
// for authentication.
//
// Technology Stack:
// - Uses the official @google/generative-ai package
// - Authenticates with Google Cloud using an API Key (loaded from environment variables)
// - The AI model used is 'gemini-2.0-flash' (optimized for fast, structured responses)
//
// This service is intended to be used by the backend to dynamically generate
// recipes in real time based on user input or scanned data from their fridge.


require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Instantiate the Gemini API client with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

/**
 * Generates a recipe using Gemini based on fridge items, user preferences, and extra answers.
 *
 * @param {string[]} detectedItems - List of ingredient names detected in the fridge
 * @param {Object} preferences - User dietary preferences (e.g., allergies, likes/dislikes)
 * @param {Object} extraAnswers - Additional context from user (e.g., time of day, hunger level)
 * @returns {Promise<Object>} A structured recipe object in JSON format
 */
async function generateRecipeWithGemini(detectedItems, preferences = {}, extraAnswers = {}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Dynamically construct the prompt to handle missing inputs
  const ingredientsText =
    detectedItems && detectedItems.length > 0
      ? `The user has the following ingredients: ${detectedItems.join(', ')}.`
      : `The user did not provide any ingredients. Use your creativity to invent a recipe with common ingredients.`;

  const preferencesText =
    preferences && Object.keys(preferences).length > 0
      ? `Their fixed preferences are: ${JSON.stringify(preferences)}.`
      : `The user did not specify any dietary preferences.`;

  const extraAnswersText =
    extraAnswers && Object.keys(extraAnswers).length > 0
      ? `Their current context is: ${JSON.stringify(extraAnswers)}.`
      : `No additional context was provided by the user.`;

  const prompt = `
You are an expert chef helping build a smart cooking assistant app.

${ingredientsText}
${preferencesText}
${extraAnswersText}

Your task:
- Create a real, coherent recipe that makes culinary sense.
- If an ingredient conflicts with preferences (e.g., dairy allergy), suggest a substitute.
- Avoid absurd or overly simple dishes (like "cut a tomato and eat it").
- Suggest a meaningful dish type (e.g., pasta, toast, salad, smoothie) based on the items.
- Keep it easy to prepare and under 30 minutes when possible.
- The recipe should be suitable for a late-night munchies craving after cannabis use.
- Prefer familiar, fun, or junk-food-like ideas. No gourmet, no healthy twists.
- Always respect the user's dietary preferences.
- Always respond in English, regardless of input.

Return only valid JSON in this exact structure – no explanations, no formatting, no \`\`\`json markers:
{
  "title": "Recipe Title",
  "ingredients": ["List", "of", "ingredients"],
  "instructions": ["Step 1", "Step 2", "Step 3"]
}
`;

  // Debug logs to verify the inputs being sent
  console.log(' Sending to Gemini:');
  console.log('🔸 Detected Items:', detectedItems);
  console.log('🔸 Preferences:', preferences);
  console.log('🔸 Extra Answers:', extraAnswers);
  console.log(' Full Prompt:', prompt);

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    console.log(' RAW Gemini response:', text);

    text = text.replace(/```json|```/g, '').trim();

    let json;
    try {
      json = JSON.parse(text);
    } catch (error) {
      console.error(' Failed to parse cleaned AI JSON:', error);
      throw new Error('AI response format is invalid');
    }

    const { title, ingredients, instructions } = json;

    const hasHebrew = /[\u0590-\u05FF]/.test(
      title + ingredients.join('') + instructions.join('')
    );

    if (
      typeof title !== 'string' ||
      !Array.isArray(ingredients) ||
      !Array.isArray(instructions) ||
      hasHebrew
    ) {
      console.warn(' Gemini response invalid or contains Hebrew:', {
        title,
        ingredients,
        instructions,
      });
      return {
        title: '',
        ingredients: [],
        instructions: [],
      };
    }

    return json;
  } catch (err) {
    console.error(' AI generation failure:', err);
    throw new Error('AI response format is invalid');
  }
}

module.exports = { generateRecipeWithGemini };
