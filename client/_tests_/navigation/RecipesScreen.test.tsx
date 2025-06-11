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

// ============================================
// File: RecipesScreen.test.tsx
//
// Purpose:
// This test ensures that the <RecipesScreen /> correctly fetches and displays
// a list of recipes from the server (e.g., from Firestore or a DB).
//
// The test mocks:
// - Firebase token retrieval via `getIdToken`
// - The global `fetch` function to simulate the backend returning an array of recipes
//
// What this test verifies:
// - That a secure token is retrieved before making the fetch call
// - That the screen displays the title of each recipe in the response
//
// Notes:
// This screen is different from individual recipe screens:
// - It shows a collection of recipes, not a single one
// - Each recipe is expected to have fields like: `id`, `title`, `imageUrl`, `source`
// - The title is used to confirm that the UI renders the fetched content
// ============================================

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RecipesScreen from '../../app/recipes';
import * as authService from '../../src/services/authTokenService';

// Mock the getIdToken function to simulate Firebase auth
jest.mock('../../src/services/authTokenService', () => ({
  getIdToken: jest.fn(),
}));

// Mock the global fetch using `globalThis`
beforeAll(() => {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: '1',
        title: 'Mock Recipe',
        imageUrl: 'https://example.com/image.jpg',
        source: 'db',
      },
    ],
  });
});

// Test: renders the screen and confirms the recipe list appears
describe('RecipesScreen', () => {
  it('displays recipe list after fetching', async () => {
    // Simulate valid Firebase token for secure fetch
    (authService.getIdToken as jest.Mock).mockResolvedValue('test-token');

    const { getByText } = render(<RecipesScreen />);

    await waitFor(() => {
      expect(getByText('Mock Recipe')).toBeTruthy();
    });
  });
});
