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
  // Retrieve the generative model instance from Google Cloud
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Construct the prompt for the AI model
  const prompt = `
You are an expert chef helping build a smart cooking assistant app.

The user has the following ingredients: ${detectedItems.join(', ')}
Their fixed preferences are: ${JSON.stringify(preferences)}
Their current context: ${JSON.stringify(extraAnswers)}

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

  try {
    // Generate a text response from the Gemini model
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    console.log('📥 RAW Gemini response:', text);

    // Clean response by removing code block markers
    text = text.replace(/```json|```/g, '').trim();

    let json;
    try {
      json = JSON.parse(text); // Attempt to parse the JSON result
    } catch (error) {
      console.error('❌ Failed to parse cleaned AI JSON:', error);
      throw new Error('AI response format is invalid');
    }

    const { title, ingredients, instructions } = json;

    // Validate the response to ensure it does not contain Hebrew characters
    const hasHebrew = /[\u0590-\u05FF]/.test(
      title + ingredients.join('') + instructions.join('')
    );

    if (
      typeof title !== 'string' ||
      !Array.isArray(ingredients) ||
      !Array.isArray(instructions) ||
      hasHebrew
    ) {
      console.warn('⚠️ Gemini response invalid or contains Hebrew:', {
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

    // Return the valid structured recipe
    return json;
  } catch (err) {
    console.error('❌ AI generation failure:', err);
    throw new Error('AI response format is invalid');
  }
}

// Export the function to be used by other modules in the server
module.exports = { generateRecipeWithGemini };

