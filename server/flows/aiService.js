// require('dotenv').config();
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// async function generateRecipeWithGemini(detectedItems) {
//   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//   const prompt = `השתמש במוצרים הבאים כדי ליצור מתכון טעים: ${detectedItems.join(', ')}. 
//   החזר לי שם מתכון, רשימת מרכיבים, והוראות הכנה ברורה.`

//   const result = await model.generateContent(prompt);
//   const text = result.response.text();

//   return text;
// }

// module.exports = { generateRecipeWithGemini };
// 📁 server/flows/aiService.js

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function generateRecipeWithGemini(detectedItems) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
אתה עוזר לפתח אפליקציית אוכל.
בהתבסס על המוצרים הבאים: ${detectedItems.join(', ')}

תחזיר לי אך ורק JSON מדויק עם המבנה הבא:
{
  "title": "שם המתכון",
  "ingredients": ["מרכיב1", "מרכיב2", ...],
  "instructions": ["שלב1", "שלב2", ...]
}
בלי להוסיף הסברים, בלי טקסט נוסף, רק JSON!`;

  const result = await model.generateContent(prompt);
  let text = result.response.text();

  // ניקוי התגובה מכל סימני ```json ו- ```
  text = text.replace(/```json|```/g, '').trim();

  try {
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.error('❌ Failed to parse cleaned AI JSON:', error);
    throw new Error('AI response format is invalid');
  }
}

module.exports = { generateRecipeWithGemini };