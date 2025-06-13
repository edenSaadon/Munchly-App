// // _tests_/navigation/ProfileScreen.test.tsx

// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import ProfileScreen from '../../app/profile';

// // 🧪 Mock firebase config (so auth/db לא יעלו שגיאה על API Key)
// jest.mock('../../src/config/firebase', () => ({
//   auth: {}, db: {}, app: {},
// }));

// // 🧪 Mock לכל המודולים שבפרופיל תלוי בהם
// jest.mock('../../src/viewModels/useAuthViewModel');
// jest.mock('../../src/services/userService');
// jest.mock('../../src/services/authTokenService');

// // ⬇️ ייבוא אחרי mocks כדי להשתמש בהם כ־jest.Mock
// import * as viewModel from '../../src/viewModels/useAuthViewModel';
// import * as userService from '../../src/services/userService';

// describe('ProfileScreen', () => {
//   it('loads and displays user profile data', async () => {
//     // 👤 מוּק למשתמש מחובר
//     (viewModel.useAuthViewModel as jest.Mock).mockReturnValue({
//       user: { uid: '123', displayName: 'TestUser' },
//       isLoading: false,
//     });

//     // 🧾 מוּק לפרופיל מהשרת
//     (userService.getUserProfile as jest.Mock).mockResolvedValue({
//       preferences: { vegetarian: true },
//       lastFridgeScan: '2025-06-01',
//       likedRecipes: [],
//     });

//     const { getByText } = render(<ProfileScreen />);

//     await waitFor(() => {
//       expect(getByText('TestUser')).toBeTruthy();
//       expect(getByText('Vegetarian: ✅')).toBeTruthy();
//       expect(getByText('2025-06-01')).toBeTruthy();
//     });
//   });
// });

// _tests_/navigation/ProfileScreen.test.tsx 

// Purpose:
// This test ensures that the ProfileScreen component loads and displays the user’s profile data correctly.
// It mocks Firebase config, view models, and services to isolate the component and simulate expected behavior
// such as a logged-in user and data returned from the backend.

// The test checks:
// 1. That the logged-in user’s display name appears on the screen.
// 2. That the user’s preference (e.g., vegetarian) is correctly rendered.
// 3. That the last fridge scan date is displayed as expected.

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../../app/profile';

// Mock the Firebase configuration module to avoid real initialization errors.
// The objects `auth`, `db`, and `app` are stubbed to prevent API key issues or initialization crashes.
jest.mock('../../src/config/firebase', () => ({
  auth: {}, db: {}, app: {},
}));

// Mock all dependencies that ProfileScreen relies on:
// 1. useAuthViewModel - provides authentication context.
// 2. userService - handles fetching profile data from the backend.
// 3. authTokenService - likely used for secure calls (though not directly used here).
jest.mock('../../src/viewModels/useAuthViewModel');
jest.mock('../../src/services/userService');
jest.mock('../../src/services/authTokenService');

// Import mocks after mocking so we can configure mock return values using jest.Mock.
import * as viewModel from '../../src/viewModels/useAuthViewModel';
import * as userService from '../../src/services/userService';

// Main test suite for ProfileScreen functionality
describe('ProfileScreen', () => {
  // Test: Ensures user profile data is loaded and shown correctly
  it('loads and displays user profile data', async () => {
    // Mocked authenticated user returned by the view model.
    // Includes a sample UID and display name.
    (viewModel.useAuthViewModel as jest.Mock).mockReturnValue({
      user: { uid: '123', displayName: 'TestUser' },
      isLoading: false,
    });

    // Mocked user profile returned from the backend.
    // Includes preferences, last fridge scan date, and liked recipes.
    (userService.getUserProfile as jest.Mock).mockResolvedValue({
      preferences: { vegetarian: true },
      lastFridgeScan: '2025-06-01',
      likedRecipes: [],
    });

    // Render the ProfileScreen component with mocks applied.
    const { getByText } = render(<ProfileScreen />);

    // Wait for the component to load and check that all expected text is displayed.
    await waitFor(() => {
      expect(getByText('TestUser')).toBeTruthy();              // Validates user's name is shown
      expect(getByText('Vegetarian: ✅')).toBeTruthy();        // Validates dietary preference is shown
      expect(getByText('2025-06-01')).toBeTruthy();            // Validates last scan date is shown
    });
  });
});
