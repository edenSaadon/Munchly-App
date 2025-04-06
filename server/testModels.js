require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ודאי שה־API Key קיים
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// 🧠 בקשת יצירת מתכון בהתבסס על מוצרים שנסרקו
async function generateRecipeWithGemini(detectedItems) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // או gemini-1.0-pro אם עדיין לא עובד

  const prompt = `השתמש במוצרים הבאים כדי ליצור מתכון טעים: ${detectedItems.join(', ')}. 
  החזר לי שם מתכון, רשימת מרכיבים, והוראות הכנה ברורה.`

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text;
  } catch (err) {
    console.error('AI generation error:', err);
    throw new Error('Failed to generate recipe');
  }
}

module.exports = { generateRecipeWithGemini };
