// 📁 components/__tests__/TopBanner.test.tsx

/**
 * ✅ Test Summary:
 * This test suite validates the TopBanner component's behavior.
 * It verifies that:
 * - The title "Munchly" is displayed
 * - Pressing the ☰ icon opens the side menu with 3 options
 * - Pressing "Profile" triggers navigation to the /profile route
 * 
 * Mocks are used to simulate font loading and routing behavior during testing.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TopBanner from '../TopBanner';

// 🟣 Mock font loading so the component doesn't return null during tests
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true], // Simulate "fonts are loaded"
  Fredoka_400Regular: 'Fredoka_400Regular',
  Fredoka_700Bold: 'Fredoka_700Bold',
}));

// 🟠 Mock expo-router to track navigation without performing real navigation
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('TopBanner', () => {
  it('renders title', () => {
    // 🧪 Render and check that the title is displayed
    const { getByText } = render(<TopBanner />);
    expect(getByText('Munchly')).toBeTruthy();
  });

  it('opens menu when ☰ is pressed', () => {
    // 🧪 Press ☰ icon and check that menu options are visible
    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    expect(getByText('👤 Profile')).toBeTruthy();
    expect(getByText('📷 Scan Fridge')).toBeTruthy();
    expect(getByText('🚪 Logout')).toBeTruthy();
  });

  it('navigates to profile on press', () => {
    // 🧪 Simulate pressing "Profile" and verify navigation
    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    fireEvent.press(getByText('👤 Profile'));

    const { router } = require('expo-router');
    expect(router.push).toHaveBeenCalledWith('/profile');
  });
});
