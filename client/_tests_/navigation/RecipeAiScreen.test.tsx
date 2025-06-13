// _tests_/navigation/RecipeScreen.test.tsx

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import RecipeScreen from '../../app/recipe/[id]';

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: 'test-id' }),
}));

jest.mock('../../src/services/authTokenService', () => ({
  getIdToken: jest.fn(() => Promise.resolve('test-token')),
}));

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


describe('RecipeScreen', () => {
  it('displays recipe data after fetching', async () => {
    const { getByText } = render(<RecipeScreen />);

    await waitFor(() => {
      expect(getByText('Test Recipe')).toBeTruthy();
      expect(getByText(/Tomato/)).toBeTruthy(); // ✅ ← fixed
      expect(getByText(/Chop vegetables/)).toBeTruthy();
    });
  });
});
