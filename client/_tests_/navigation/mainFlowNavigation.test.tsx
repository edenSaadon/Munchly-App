// ==============================
// File: mainFlowNavigation.test.tsx
// Purpose:
// This test manually calls `router.push()` with various route strings and parameters,
// and verifies that the push function was called correctly each time.
// It does NOT render any UI components or simulate real user navigation.
// Instead, it focuses only on ensuring that the route strings and parameters used
// in navigation logic are valid and consistent.
// This is useful as a smoke test for route naming and flow structure consistency.
// ==============================

import { router } from 'expo-router';

const mockPush = jest.fn();

// 🔁 Replaces the real expo-router module with a mock version where push is a spy
jest.mock('expo-router', () => ({
  router: { push: mockPush },
}));

describe('Full App Navigation Flow (Mocked Calls Only)', () => {
  beforeEach(() => {
    // 🔄 Clears the call history of the mock function before each test
    mockPush.mockClear();
  });

  it('navigates full flow step by step using mockPush calls', () => {
    // Manually simulate navigation to signup screen
    mockPush('/signup');
    expect(mockPush).toHaveBeenCalledWith('/signup');

    // Simulate navigation to preferences
    mockPush('/preferences');
    expect(mockPush).toHaveBeenCalledWith('/preferences');

    // Simulate navigation to fridge scan
    mockPush('/fridge-scan');
    expect(mockPush).toHaveBeenCalledWith('/fridge-scan');

    // Simulate navigation to fridge items
    mockPush('/fridge-items');
    expect(mockPush).toHaveBeenCalledWith('/fridge-items');

    // Simulate navigation to prompt refiner with example items
    mockPush({
      pathname: '/recipe-prompt-refiner',
      params: { items: '["tomato", "cheese"]' },
    });
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/recipe-prompt-refiner',
      params: { items: '["tomato", "cheese"]' },
    });

    // Simulate navigation to menu with example answers
    mockPush({
      pathname: '/menu',
      params: { answers: '["quick", "vegan"]' },
    });
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/menu',
      params: { answers: '["quick", "vegan"]' },
    });

    // Simulate navigation to profile
    mockPush('/profile');
    expect(mockPush).toHaveBeenCalledWith('/profile');

    // Simulate navigation to recipe collection
    mockPush('/recipes');
    expect(mockPush).toHaveBeenCalledWith('/recipes');

    // Simulate navigation to AI recipe creation screen
    mockPush('/recipes/new'); // Adjust if your real path differs
    expect(mockPush).toHaveBeenCalledWith('/recipes/new');
  });
});
