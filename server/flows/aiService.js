// // require('dotenv').config();
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// // async function generateRecipeWithGemini(detectedItems) {
// //   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// //   const prompt = `השתמש במוצרים הבאים כדי ליצור מתכון טעים: ${detectedItems.join(', ')}. 
// //   החזר לי שם מתכון, רשימת מרכיבים, והוראות הכנה ברורה.`

// //   const result = await model.generateContent(prompt);
// //   const text = result.response.text();

// //   return text;
// // }

// // module.exports = { generateRecipeWithGemini };
// // 📁 server/flows/aiService.js

// // require('dotenv').config();
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// // async function generateRecipeWithGemini(detectedItems) {
// //   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// //   const prompt = `
// // אתה עוזר לפתח אפליקציית אוכל.
// // בהתבסס על המוצרים הבאים: ${detectedItems.join(', ')}

// // תחזיר לי אך ורק JSON מדויק עם המבנה הבא:
// // {
// //   "title": "שם המתכון",
// //   "ingredients": ["מרכיב1", "מרכיב2", ...],
// //   "instructions": ["שלב1", "שלב2", ...]
// // }
// // בלי להוסיף הסברים, בלי טקסט נוסף, רק JSON!`;

// //   const result = await model.generateContent(prompt);
// //   let text = result.response.text();

// //   // ניקוי התגובה מכל סימני ```json ו- ```
// //   text = text.replace(/```json|```/g, '').trim();

// //   try {
// //     const json = JSON.parse(text);
// //     return json;
// //   } catch (error) {
// //     console.error('❌ Failed to parse cleaned AI JSON:', error);
// //     throw new Error('AI response format is invalid');
// //   }
// // }

// // module.exports = { generateRecipeWithGemini };


// // require('dotenv').config();
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// // async function generateRecipeWithGemini(detectedItems, preferences = {}) {
// //   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// //   const prompt = `
// // אתה עוזר לפתח אפליקציית אוכל חכמה.
// // יש לך את המוצרים הבאים: ${detectedItems.join(', ')}
// // ועדפות המשתמש הן: ${JSON.stringify(preferences)}.

// // 🔵 תיצור מתכון על בסיס המוצרים והעדפות.
// // 🔵 אם אין מספיק מוצרים להכין מתכון טוב, תחזיר שדות ריקים מוסכמים.

// // תמיד תחזיר **אך ורק JSON חוקי** במבנה הבא:
// // {
// //   "title": "שם המתכון",
// //   "ingredients": ["רשימת מרכיבים"],
// //   "instructions": ["שלבי הכנה"]
// // }

// // בלי טקסט נוסף, בלי הסברים. אין להוסיף שום תיאור נוסף.`;
  
// //   const result = await model.generateContent(prompt);
// //   let text = result.response.text();

// //   text = text.replace(/```json|```/g, '').trim();

// //   try {
// //     const json = JSON.parse(text);
// //     return json;
// //   } catch (error) {
// //     console.error('❌ Failed to parse cleaned AI JSON:', error);
// //     throw new Error('AI response format is invalid');
// //   }
// // }

// // module.exports = { generateRecipeWithGemini };



// // // ✅ server/flows/aiService.js
// // require('dotenv').config();
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// // async function generateRecipeWithGemini(detectedItems, preferences = {}) {
// //   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// //   const prompt = `
// // אתה עוזר לפתח אפליקציית אוכל חכמה.
// // יש לך את המוצרים הבאים: ${detectedItems.join(', ')}
// // והעדפות המשתמש הן: ${JSON.stringify(preferences)}.

// // 🔵 צור מתכון אמיתי, על בסיס המוצרים והעדפות המשתמש.
// // 🔵 אם אין מספיק מוצרים להכין מתכון טוב — תחזיר שדות ריקים מוסכמים ("title": "", וכו').

// // תמיד תחזיר אך ורק JSON חוקי במבנה הבא:
// // {
// //   "title": "שם המתכון",
// //   "ingredients": ["רשימת מרכיבים"],
// //   "instructions": ["שלבי הכנה"]
// // }

// // ❗ אין להוסיף טקסט נוסף, אין הסברים, אין עטיפות קוד (כמו \`\`\`json).
// // `;
  
// //   const result = await model.generateContent(prompt);
// //   let text = result.response.text();

// //   text = text.replace(/```json|```/g, '').trim();

// //   try {
// //     const json = JSON.parse(text);
// //     return json;
// //   } catch (error) {
// //     console.error('❌ Failed to parse cleaned AI JSON:', error);
// //     throw new Error('AI response format is invalid');
// //   }
// // }

// // module.exports = { generateRecipeWithGemini };


// // // ✅ server/flows/aiService.js
// // require('dotenv').config();
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// // async function generateRecipeWithGemini(detectedItems, preferences = {}) {
// //   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// //   const prompt = `
// // אתה עוזר לפתח אפליקציית אוכל חכמה.
// // יש לך את המוצרים הבאים: ${detectedItems.join(', ')}
// // והעדפות המשתמש הן: ${JSON.stringify(preferences)}.

// // 🔵 צור מתכון אמיתי, על בסיס המוצרים והעדפות המשתמש.
// // 🔵 אם אין מספיק מוצרים להכין מתכון טוב — תחזיר שדות ריקים מוסכמים ("title": "", וכו').

// // תמיד תחזיר אך ורק JSON חוקי במבנה הבא:
// // {
// //   "title": "שם המתכון",
// //   "ingredients": ["רשימת מרכיבים"],
// //   "instructions": ["שלבי הכנה"]
// // }

// // ❗ אין להוסיף טקסט נוסף, אין הסברים, אין עטיפות קוד (כמו \`\`\`json).
// // `;
  
// //   const result = await model.generateContent(prompt);
// //   let text = result.response.text();

// //   text = text.replace(/```json|```/g, '').trim();

// //   try {
// //     const json = JSON.parse(text);
// //     return json;
// //   } catch (error) {
// //     console.error('❌ Failed to parse cleaned AI JSON:', error);
// //     throw new Error('AI response format is invalid');
// //   }
// // }

// // // module.exports = { generateRecipeWithGemini };
// // // ✅ server/flows/aiService.js
// // require('dotenv').config();
// // const { GoogleGenerativeAI } = require('@google/generative-ai');

// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// // async function generateRecipeWithGemini(detectedItems, preferences = {}) {
// //   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// //   const prompt = `
// // אתה עוזר לפתח אפליקציית אוכל חכמה.
// // יש לך את המוצרים הבאים: ${detectedItems.join(', ')}
// // והעדפות המשתמש הן: ${JSON.stringify(preferences)}.

// // 🔵 צור מתכון אמיתי, על בסיס המוצרים והעדפות המשתמש.
// // 🔵 אם אין מספיק מוצרים להכין מתכון טוב — תחזיר שדות ריקים מוסכמים (title: "", וכו').

// // ❗ החזר אך ורק JSON תקני, בלי הסברים, בלי טקסט מסביב, בלי סימוני קוד (כמו \`\`\`json או \`\`\`).
// // ❗ מבנה התשובה תמיד כך:
// // {
// //   "title": "שם המתכון",
// //   "ingredients": ["רשימת מרכיבים"],
// //   "instructions": ["שלבי הכנה"]
// // }
// // אם אין מה להחזיר – החזר בדיוק כך:
// // {
// //   "title": "",
// //   "ingredients": [],
// //   "instructions": []
// // }
// // `;

// //   try {
// //     const result = await model.generateContent(prompt);
// //     let text = result.response.text();

// //     console.log('📥 RAW Gemini response:', text);

// //     // ניקוי סימונים לא חוקיים אם יש (בכל זאת)
// //     text = text.replace(/```json|```/g, '').trim();

// //     let json;
// //     try {
// //       json = JSON.parse(text);
// //     } catch (error) {
// //       console.error('❌ Failed to parse cleaned AI JSON:', error);
// //       throw new Error('AI response format is invalid');
// //     }

// //     const { title, ingredients, instructions } = json;

// //     // הגנה נוספת – לוודא שהשדות קיימים ותקינים
// //     if (
// //       typeof title !== 'string' ||
// //       !Array.isArray(ingredients) ||
// //       !Array.isArray(instructions)
// //     ) {
// //       console.warn('⚠️ Gemini response missing or invalid fields:', { title, ingredients, instructions });
// //       return {
// //         title: '',
// //         ingredients: [],
// //         instructions: [],
// //       };
// //     }

// //     return json;
// //   } catch (err) {
// //     console.error('❌ AI generation failure:', err);
// //     throw new Error('AI response format is invalid');
// //   }
// // }

// // module.exports = { generateRecipeWithGemini };

// require('dotenv').config();
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// async function generateRecipeWithGemini(detectedItems, preferences = {}) {
//   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//   const prompt = `
// אתה עוזר לפתח אפליקציית אוכל חכמה.
// יש לך את המוצרים הבאים: ${detectedItems.join(', ')}
// והעדפות המשתמש הן: ${JSON.stringify(preferences)}.

// 🔵 צור מתכון אמיתי, פשוט ויצירתי – גם אם יש רק רכיב אחד!
// 🔵 תמיד תמציא משהו: חטיף, טוסט, סלט, מריחה... כל דבר ריאלי שאפשר להכין בבית.
// 🔵 גם אם חסרים רכיבים – תכתוב את המתכון כאילו המשתמש יכול להוסיף דברים קטנים (כמו מלח או שמן).

// ❗ תן תשובה אך ורק בפורמט JSON חוקי – בלי הסברים, בלי טקסט נוסף, בלי סימוני קוד כמו \`\`\`json.
// ❗ תמיד תכתוב במדויק כך:
// {
//   "title": "שם המתכון",
//   "ingredients": ["רשימת מרכיבים"],
//   "instructions": ["שלבי הכנה"]
// }
// `;

//   try {
//     const result = await model.generateContent(prompt);
//     let text = result.response.text();

//     console.log('📥 RAW Gemini response:', text);

//     // ניקוי שאריות טקסט אם צריך
//     text = text.replace(/```json|```/g, '').trim();

//     let json;
//     try {
//       json = JSON.parse(text);
//     } catch (error) {
//       console.error('❌ Failed to parse cleaned AI JSON:', error);
//       throw new Error('AI response format is invalid');
//     }

//     const { title, ingredients, instructions } = json;

//     // הגנה נוספת
//     if (
//       typeof title !== 'string' ||
//       !Array.isArray(ingredients) ||
//       !Array.isArray(instructions)
//     ) {
//       console.warn('⚠️ Gemini response missing or invalid fields:', {
//         title,
//         ingredients,
//         instructions,
//       });
//       return {
//         title: '',
//         ingredients: [],
//         instructions: [],
//       };
//     }

//     return json;
//   } catch (err) {
//     console.error('❌ AI generation failure:', err);
//     throw new Error('AI response format is invalid');
//   }
// }

// module.exports = { generateRecipeWithGemini };


// require('dotenv').config();
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// async function generateRecipeWithGemini(detectedItems, preferences = {}) {
//   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//   const prompt = `
// You are helping to build a smart cooking assistant app.
// Here are the detected ingredients: ${detectedItems.join(', ')}
// User preferences: ${JSON.stringify(preferences)}

// 🟢 Generate a creative, real recipe based on the ingredients and preferences.
// 🟢 If there's only one ingredient — improvise a realistic snack, dip, toast, etc.
// 🟢 It's okay to assume the user has basic kitchen staples (salt, oil, etc.).

// ❗ Respond with **valid English JSON only**, no explanations, no extra text, no \`\`\`json markers.
// ❗ Response format must match exactly:
// {
//   "title": "Recipe Title",
//   "ingredients": ["List", "of", "ingredients"],
//   "instructions": ["Step 1", "Step 2", "Step 3"]
// }
// `;

//   try {
//     const result = await model.generateContent(prompt);
//     let text = result.response.text();

//     console.log('📥 RAW Gemini response:', text);

//     // Strip markdown markers if they exist
//     text = text.replace(/```json|```/g, '').trim();

//     let json;
//     try {
//       json = JSON.parse(text);
//     } catch (error) {
//       console.error('❌ Failed to parse cleaned AI JSON:', error);
//       throw new Error('AI response format is invalid');
//     }

//     const { title, ingredients, instructions } = json;

//     // Additional safety check
//     if (
//       typeof title !== 'string' ||
//       !Array.isArray(ingredients) ||
//       !Array.isArray(instructions)
//     ) {
//       console.warn('⚠️ Gemini response missing or invalid fields:', {
//         title,
//         ingredients,
//         instructions,
//       });
//       return {
//         title: '',
//         ingredients: [],
//         instructions: [],
//       };
//     }

//     return json;
//   } catch (err) {
//     console.error('❌ AI generation failure:', err);
//     throw new Error('AI response format is invalid');
//   }
// }

// module.exports = { generateRecipeWithGemini };


// // ✅ server/flows/aiService.js
// require('dotenv').config();
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// async function generateRecipeWithGemini(detectedItems, preferences = {}) {
//   const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//   const prompt = `
// You are helping to build a smart cooking assistant app.
// Here are the detected ingredients: ${detectedItems.join(', ')}
// User preferences: ${JSON.stringify(preferences)}

// 🟢 Generate a creative, real recipe based on the ingredients and preferences.
// 🟢 If there's only one ingredient — improvise a realistic snack, dip, toast, etc.
// 🟢 It's okay to assume the user has basic kitchen staples (salt, oil, etc.).
// 🟢 Always respond **only in English**, regardless of the input language.


// ❗ Respond with **valid English JSON only**, no explanations, no extra text, no \`\`\`json markers.
// ❗ All content (title, ingredients, instructions) must be written in English.
// ❗ Response format must match exactly:
// {
//   "title": "Recipe Title",
//   "ingredients": ["List", "of", "ingredients"],
//   "instructions": ["Step 1", "Step 2", "Step 3"]
// }
// `;

//   try {
//     const result = await model.generateContent(prompt);
//     let text = result.response.text();

//     console.log('📥 RAW Gemini response:', text);

//     // Strip markdown junk
//     text = text.replace(/```json|```/g, '').trim();

//     let json;
//     try {
//       json = JSON.parse(text);
//     } catch (error) {
//       console.error('❌ Failed to parse cleaned AI JSON:', error);
//       throw new Error('AI response format is invalid');
//     }

//     const { title, ingredients, instructions } = json;

//     // ✅ Safety check: valid structure and English only (no Hebrew letters)
//     const hasHebrew = /[\u0590-\u05FF]/.test(
//       title + ingredients.join('') + instructions.join('')
//     );

//     if (
//       typeof title !== 'string' ||
//       !Array.isArray(ingredients) ||
//       !Array.isArray(instructions) ||
//       hasHebrew
//     ) {
//       console.warn('⚠️ Gemini response invalid or contains Hebrew:', {
//         title,
//         ingredients,
//         instructions,
//       });
//       return {
//         title: '',
//         ingredients: [],
//         instructions: [],
//       };
//     }

//     return json;
//   } catch (err) {
//     console.error('❌ AI generation failure:', err);
//     throw new Error('AI response format is invalid');
//   }
// }

// module.exports = { generateRecipeWithGemini };

// ✅ server/flows/aiService.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function generateRecipeWithGemini(detectedItems, preferences = {}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
You are an expert chef helping build a smart cooking assistant app.

🟢 The user has the following ingredients: ${detectedItems.join(', ')}
🟢 Their preferences are: ${JSON.stringify(preferences)}

Your task:
🔸 Create a real, coherent recipe that makes culinary sense.
🔸 If an ingredient conflicts with preferences (e.g., dairy allergy), suggest a substitute.
🔸 Avoid absurd or overly simple dishes (like "cut a tomato and eat it").
🔸 Suggest a meaningful dish type (e.g., pasta, toast, salad, smoothie) based on the items.
🔸 Keep it easy to prepare and under 30 minutes when possible.
🔸 Always respond in English, regardless of input.

❗ Return **only** valid JSON in this exact structure – no explanations, no formatting, no \`\`\`json markers:
{
  "title": "Recipe Title",
  "ingredients": ["List", "of", "ingredients"],
  "instructions": ["Step 1", "Step 2", "Step 3"]
}
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    console.log('📥 RAW Gemini response:', text);

    text = text.replace(/```json|```/g, '').trim();

    let json;
    try {
      json = JSON.parse(text);
    } catch (error) {
      console.error('❌ Failed to parse cleaned AI JSON:', error);
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

    return json;
  } catch (err) {
    console.error('❌ AI generation failure:', err);
    throw new Error('AI response format is invalid');
  }
}

module.exports = { generateRecipeWithGemini };
