// _tests_/navigation/ProfileScreen.test.tsx

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../../app/profile';

// 🧪 Mock firebase config (so auth/db לא יעלו שגיאה על API Key)
jest.mock('../../src/config/firebase', () => ({
  auth: {}, db: {}, app: {},
}));

// 🧪 Mock לכל המודולים שבפרופיל תלוי בהם
jest.mock('../../src/viewModels/useAuthViewModel');
jest.mock('../../src/services/userService');
jest.mock('../../src/services/authTokenService');

// ⬇️ ייבוא אחרי mocks כדי להשתמש בהם כ־jest.Mock
import * as viewModel from '../../src/viewModels/useAuthViewModel';
import * as userService from '../../src/services/userService';

describe('ProfileScreen', () => {
  it('loads and displays user profile data', async () => {
    // 👤 מוּק למשתמש מחובר
    (viewModel.useAuthViewModel as jest.Mock).mockReturnValue({
      user: { uid: '123', displayName: 'TestUser' },
      isLoading: false,
    });

    // 🧾 מוּק לפרופיל מהשרת
    (userService.getUserProfile as jest.Mock).mockResolvedValue({
      preferences: { vegetarian: true },
      lastFridgeScan: '2025-06-01',
      likedRecipes: [],
    });

    const { getByText } = render(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText('TestUser')).toBeTruthy();
      expect(getByText('Vegetarian: ✅')).toBeTruthy();
      expect(getByText('2025-06-01')).toBeTruthy();
    });
  });
});
