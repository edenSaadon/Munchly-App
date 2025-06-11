// ============================================
// ✅ File: RecipeDbScreen.test.tsx
//
// 📌 Purpose:
// This test verifies that the <RecipeDbScreen /> component correctly fetches and displays
// a recipe stored in the Firestore database (manually created by users).
//
// The test mocks:
// - The dynamic route param `id` (simulates navigating to /recipe-db/[id])
// - Firebase token using `getIdToken`
// - The `fetch` call to return structured recipe data from Firestore
//
// ✅ What this test ensures:
// - Title of the recipe appears
// - Each ingredient appears in "name - quantity" format (e.g., "Tomato - 2 pcs")
// - Instructions (a single string) are correctly split into steps and rendered
//
// 🧠 Difference from AI recipe test:
// - This screen expects ingredients to be structured (with both name & quantity)
// - Instructions are a long string that needs parsing (split into steps like "1. ...", "2. ...")
// ============================================

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RecipeDbScreen from '../../app/recipe-db/[id]';

// 🧪 Mock route parameter: always use id = 'test-db-id'
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'test-db-id' }),
  router: { back: jest.fn(), replace: jest.fn() },
}));

// 🧪 Mock token service to return a fake Firebase token
jest.mock('../../src/services/authTokenService', () => ({
  getIdToken: jest.fn(() => Promise.resolve('mock-token')),
}));

// 🌐 Mock global fetch response: simulate a DB recipe from Firestore
beforeAll(() => {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      title: 'DB Test Recipe',
      ingredients: [
        { name: 'Tomato', quantity: '2 pcs' },
        { name: 'Salt', quantity: '1 tsp' },
      ],
      instructions: 'Wash vegetables. Chop them. Add salt.', // Single string to be split
    }),
  });
});

// 🧪 Main test: verifies title, structured ingredients, and parsed instructions
describe('RecipeDbScreen', () => {
  it('displays DB recipe data after fetching', async () => {
    // Render the screen with mocked data
    const { getByText } = render(<RecipeDbScreen />);

    await waitFor(() => {
      // ✅ Title should be shown
      expect(getByText('DB Test Recipe')).toBeTruthy();

      // ✅ Ingredients should be displayed with name and quantity
      expect(getByText(/Tomato - 2 pcs/)).toBeTruthy();
      expect(getByText(/Salt - 1 tsp/)).toBeTruthy();

      // ✅ Instructions should be parsed into separate steps (numbered)
      expect(getByText(/1. Wash vegetables./)).toBeTruthy();
      expect(getByText(/2. Chop them./)).toBeTruthy();
      expect(getByText(/3. Add salt./)).toBeTruthy();
    });
  });
});
