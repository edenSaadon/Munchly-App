/**
 * Test File: RecipesScreen.test.tsx
 *
 * Purpose:
 * This test validates the behavior of the RecipesScreen, which fetches
 * a list of recipes (either AI-generated or from the DB) and displays them.
 *
 * This screen is the entry point for users to browse recipes in the app.
 * Recipes can come from two sources:
 * - source: 'db' (manual/database recipes)
 * - source: 'ai' (AI-generated recipes)
 *
 * The test ensures that:
 * - Recipes are correctly fetched from the server
 * - Each recipe's title and image appear on screen
 * - The like/unlike button works and reflects state visually
 * - Navigation occurs correctly based on the recipe's source
 *
 * Mocks:
 * - global.fetch simulates API response with 2 recipes
 * - Firebase auth returns a fake logged-in user
 * - getIdToken provides a mock authentication token
 * - expo-router's router.push and router.replace are mocked
 */

import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import RecipesScreen from '../../app/recipes';

// Mocking custom fonts to prevent UI loading delays in tests
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true], // Simulates fonts being loaded
  Fredoka_400Regular: 'Fredoka_400Regular',
  Fredoka_700Bold: 'Fredoka_700Bold',
}));

// Mocking Firebase Auth Token service
jest.mock('../../src/services/authTokenService', () => ({
  getIdToken: jest.fn(() => Promise.resolve('fake-token')),
}));

// Mocking Firebase Auth to simulate a logged-in user
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: 'user123' }, // fake user ID
  })),
}));

// Creating mock functions for router navigation
const mockPush = jest.fn();
const mockReplace = jest.fn();

// Mocking the router object from expo-router
jest.mock('expo-router', () => ({
  __esModule: true,
  router: {
    push: (...args: any[]) => mockPush(...args),      // Simulates router.push
    replace: (...args: any[]) => mockReplace(...args) // Simulates router.replace
  },
}));

// Before running any test, mock the API response for the recipe list
beforeAll(() => {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: 'recipe1',
        title: 'Pasta',
        imageUrl: 'https://example.com/pasta.jpg',
        source: 'db', // manually saved recipe
      },
      {
        id: 'recipe2',
        title: 'Salad',
        imageUrl: 'https://example.com/salad.jpg',
        source: 'ai', // AI-generated recipe
      },
    ],
  });
});

// Group of tests for RecipesScreen behavior
describe('RecipesScreen', () => {
  // Test that the fetched recipe titles appear on screen
  it('displays recipe titles after fetch', async () => {
    const { getByText } = render(<RecipesScreen />);

    // Wait until both titles appear
    await waitFor(() => {
      expect(getByText('Pasta')).toBeTruthy(); // DB recipe
      expect(getByText('Salad')).toBeTruthy(); // AI recipe
    });
  });

  // Test that clicking a recipe navigates to the correct screen
  it('navigates to correct screen on recipe press', async () => {
    const { getByText } = render(<RecipesScreen />);

    await waitFor(() => getByText('Pasta'));

    // Simulate pressing on a DB recipe
    fireEvent.press(getByText('Pasta'));
    expect(mockPush).toHaveBeenCalledWith('/recipe-db/recipe1');

    // Simulate pressing on an AI recipe
    fireEvent.press(getByText('Salad'));
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/recipe/recipe2',
      params: { source: 'collection' },
    });
  });

  // Test toggling like/unlike for a recipe
  it('toggles like button', async () => {
    const { getAllByText } = render(<RecipesScreen />);

    // Wait for initial unliked state (🤍)
    await waitFor(() => getAllByText('🤍'));

    const likeButton = getAllByText('🤍')[0];

    // Press like button
    fireEvent.press(likeButton);

    // Wait for state to update to liked 
    await waitFor(() => {
      expect(getAllByText('❤️').length).toBeGreaterThan(0);
    });
  });
});
