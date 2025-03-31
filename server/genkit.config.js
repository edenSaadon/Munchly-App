// genkit.config.js
import { defineConfig } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export default defineConfig({
  plugins: [googleAI()],
  flows: ['flows/generateRecipe.flow.js'], // מצביע על ה-flow שניצור
});
