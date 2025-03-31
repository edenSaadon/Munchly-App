// flows/generateRecipe.flow.js
import { flow } from 'genkit';
import { geminiPro } from '@genkit-ai/googleai';

/**
 * יוצר מתכון חדש לפי מוצרים מזוהים מהמקרר
 */
export const generateRecipe = flow('generateRecipe', async ({ detectedItems }) => {
  const prompt = `השתמש בפריטים הבאים כדי ליצור מתכון: ${detectedItems.join(', ')}. 
  תן לי שם למתכון, רשימת מרכיבים, והוראות הכנה מפורטות.`;

  const result = await geminiPro.generateContent(prompt);
  const text = result.text();

  return { recipeText: text };
});
