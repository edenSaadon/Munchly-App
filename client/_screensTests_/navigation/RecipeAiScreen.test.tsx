/**
 * Test File: RecipeScreen.test.tsx
 *
 * Purpose:
 * This test simulates rendering the RecipeScreen component when displaying
 * an AI-generated recipe (from Gemini).
 *
 * The screen receives a recipe ID through the router params and fetches
 * the recipe data from a backend server using a fetch call.
 *
 * The test mocks:
 * - The route parameter (`id`)
 * - The authentication token service (`getIdToken`)
 * - The fetch call to return a fake recipe
 *
 * It then verifies that the recipe title, ingredients, and instructions are rendered.
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RecipeScreen from '../../app/recipe/[id]';

// Mock the route to provide a fake recipe ID
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'test-id' }),
}));

// Mock the token service to return a fake token
jest.mock('../../src/services/authTokenService', () => ({
  getIdToken: jest.fn(() => Promise.resolve('test-token')),
}));

// Mock the fetch API to return a sample recipe
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

// Run the actual test
describe('RecipeScreen', () => {
  it('displays recipe data after fetching', async () => {
    const { getByText } = render(<RecipeScreen />);

    // Wait for the mocked data to be rendered
    await waitFor(() => {
      expect(getByText('Test Recipe')).toBeTruthy();
      expect(getByText(/Tomato/)).toBeTruthy();
      expect(getByText(/Chop vegetables/)).toBeTruthy();
    });
  });
});
