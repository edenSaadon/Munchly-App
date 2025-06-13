// // ============================================
// // File: RecipesScreen.test.tsx
// //
// // Purpose:
// // This test ensures that the <RecipesScreen /> correctly fetches and displays
// // a list of recipes from the server (e.g., from Firestore or a DB).
// //
// // The test mocks:
// // - Firebase token retrieval via `getIdToken`
// // - The global `fetch` function to simulate the backend returning an array of recipes
// //
// // What this test verifies:
// // - That a secure token is retrieved before making the fetch call
// // - That the screen displays the title of each recipe in the response
// //
// // Notes:
// // This screen is different from individual recipe screens:
// // - It shows a collection of recipes, not a single one
// // - Each recipe is expected to have fields like: `id`, `title`, `imageUrl`, `source`
// // - The title is used to confirm that the UI renders the fetched content
// // ============================================

// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import RecipesScreen from '../../app/recipes'; // Or '@/app/recipes' if alias is set
// import * as authService from '../../src/services/authTokenService'; // Or '@/src/services/authTokenService'

// // Global typing for mocked fetch (so TypeScript recognizes we're mocking it)
// declare global {
//   namespace NodeJS {
//     interface Global {
//       fetch: jest.Mock;
//     }
//   }
// }

// // Mock the getIdToken function to simulate Firebase auth
// jest.mock('../../src/services/authTokenService', () => ({
//   getIdToken: jest.fn(),
// }));

// // Mock the global fetch to simulate recipe list returned by the server
// global.fetch = jest.fn() as jest.Mock;

// (global.fetch as jest.Mock).mockResolvedValue({
//   ok: true,
//   json: async () => [
//     {
//       id: '1',
//       title: 'Mock Recipe',
//       imageUrl: 'https://example.com/image.jpg',
//       source: 'db',
//     },
//   ],
// });

// // Test: renders the screen and confirms the recipe list appears
// describe('RecipesScreen', () => {
//   it('displays recipe list after fetching', async () => {
//     // Simulate valid Firebase token for secure fetch
//     (authService.getIdToken as jest.Mock).mockResolvedValue('test-token');

//     // Render the recipe collection screen
//     const { getByText } = render(<RecipesScreen />);

//     // Wait for recipe title to appear after data is fetched
//     await waitFor(() => expect(getByText('Mock Recipe')).toBeTruthy());
//   });
// });

// // ============================================
// // File: RecipesScreen.test.tsx
// //
// // Purpose:
// // This test ensures that the <RecipesScreen /> correctly fetches and displays
// // a list of recipes from the server (e.g., from Firestore or a DB).
// //
// // The test mocks:
// // - Firebase token retrieval via `getIdToken`
// // - The global `fetch` function to simulate the backend returning an array of recipes
// //
// // What this test verifies:
// // - That a secure token is retrieved before making the fetch call
// // - That the screen displays the title of each recipe in the response
// //
// // Notes:
// // This screen is different from individual recipe screens:
// // - It shows a collection of recipes, not a single one
// // - Each recipe is expected to have fields like: `id`, `title`, `imageUrl`, `source`
// // - The title is used to confirm that the UI renders the fetched content
// // ============================================

// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import RecipesScreen from '../../app/recipes';
// import * as authService from '../../src/services/authTokenService';

// // Mock the getIdToken function to simulate Firebase auth
// jest.mock('../../src/services/authTokenService', () => ({
//   getIdToken: jest.fn(),
// }));

// // Mock the global fetch using `globalThis`
// beforeAll(() => {
//   globalThis.fetch = jest.fn().mockResolvedValue({
//     ok: true,
//     json: async () => [
//       {
//         id: '1',
//         title: 'Mock Recipe',
//         imageUrl: 'https://example.com/image.jpg',
//         source: 'db',
//       },
//     ],
//   });
// });

// // Test: renders the screen and confirms the recipe list appears
// describe('RecipesScreen', () => {
//   it('displays recipe list after fetching', async () => {
//     // Simulate valid Firebase token for secure fetch
//     (authService.getIdToken as jest.Mock).mockResolvedValue('test-token');

//     const { getByText } = render(<RecipesScreen />);

//     await waitFor(() => {
//       expect(getByText('Mock Recipe')).toBeTruthy();
//     });
//   });
// });


// _tests_/navigation/RecipeScreen.test.tsx

// ==========================================
// Purpose:
// This test verifies that the <RecipeScreen /> component correctly fetches
// and displays a single recipe from the Firestore-based recipe collection.
// This screen is part of the recipe collection feature and uses a dynamic route
// to load a specific recipe by its ID.
//
// This is NOT an AI-generated recipe or a manually created recipe screen —
// it is part of the general recipe collection stored in Firestore.
//
// The test mocks:
// - The route parameter using `useLocalSearchParams`
// - Firebase authentication token using `getIdToken`
// - The fetch call to simulate retrieving a recipe document from Firestore
//
// What this test ensures:
// - A specific recipe can be loaded by ID
// - Its title, ingredients (as a string array), and instructions are displayed
// ==========================================

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RecipeScreen from '../../app/recipe/[id]';

// Mock the dynamic route param to simulate navigating to `/recipe/[id]`
// In this case, we simulate a request for the recipe with ID 'test-id'.
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'test-id' }),
}));

// Mock the authentication service to return a fake Firebase token.
// This allows the fetch to succeed without real authentication.
jest.mock('../../src/services/authTokenService', () => ({
  getIdToken: jest.fn(() => Promise.resolve('test-token')),
}));

// Before running the tests, mock the global fetch response.
// The mock returns a Firestore-style recipe with:
// - `title`: string
// - `ingredients`: array of strings
// - `instructions`: array of strings
beforeAll(() => {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      title: 'Test Recipe',
      ingredients: ['Tomato'],
      instructions: ['Chop vegetables'],
    }),
  });
});

// Test suite for the RecipeScreen (used for displaying recipes from Firestore)
describe('RecipeScreen', () => {
  // Test: verifies that the recipe is fetched by ID and its contents are rendered
  it('displays recipe data after fetching', async () => {
    const { getByText } = render(<RecipeScreen />);

    // ⏳ Wait for the component to load the data, then verify each piece of it appears on screen
    await waitFor(() => {
      expect(getByText('Test Recipe')).toBeTruthy();             // Recipe title
      expect(getByText(/Tomato/)).toBeTruthy();                  // Ingredient
      expect(getByText(/Chop vegetables/)).toBeTruthy();         // Instruction step
    });
  });
});
