// ### Script Purpose: Generate Recipe with Gemini AI (Final: Flash Model) ###
// Goal:
// This script connects to Google’s Gemini AI service to generate cooking recipes based on a list of scanned fridge items.
// It was initially used to explore various models such as 'gemini-pro' and 'gemini-1.0-pro', comparing their response quality and speed.
// After testing multiple variants, the final implementation uses the gemini-1.5-flash model due to its faster response time and sufficient
//  output quality for recipe generation use cases.

// What it tests or accomplishes:
// 1. Accessing and authenticating with Gemini AI
// 2. Prompting the model with structured natural language
// 3. Evaluating output quality
// 4. Confirming compatibility and stability of the chosen model (gemini-2.0-flash)


require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load the Gemini API key from the .env file and initialize the client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Generate a recipe based on scanned fridge items using Gemini AI
async function generateRecipeWithGemini(detectedItems) {
  // Choose the Gemini model to use (test different versions if needed)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); 
  // Alternative: 'gemini-1.0-pro' if supported or more stable

// Create a structured prompt for recipe generation
const prompt = `Use the following items to create a tasty recipe: ${detectedItems.join(', ')}. 
Return a recipe name, a list of ingredients, and clear preparation instructions.`;


  try {
    // Send the prompt to the model and wait for the generated content
    const result = await model.generateContent(prompt);

    // Extract and return the generated text from the response
    const text = result.response.text();
    return text;
  } catch (err) {
    // Log and rethrow any error that occurs during generation
    console.error('AI generation error:', err);
    throw new Error('Failed to generate recipe');
  }
}

// Export the function for use in other parts of the app
module.exports = { generateRecipeWithGemini };

