require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function generateRecipeWithGemini(detectedItems) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `השתמש במוצרים הבאים כדי ליצור מתכון טעים: ${detectedItems.join(', ')}. 
  החזר לי שם מתכון, רשימת מרכיבים, והוראות הכנה ברורה.`

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return text;
}

module.exports = { generateRecipeWithGemini };
