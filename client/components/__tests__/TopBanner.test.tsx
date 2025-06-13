/**
 * Test File: TopBanner.test.tsx
 *
 *  Purpose:
 * This test suite verifies the behavior of the <TopBanner /> component, which renders a top banner UI in the app.
 * The component includes:
 * - A "hamburger" menu button (☰)
 * - The app title ("Munchly")
 * - A dropdown modal menu with options: Profile, Scan Fridge, and Logout
 * - A goodbye modal that appears after logout
 *
 * These tests check:
 * 1. That the title renders correctly.
 * 2. That clicking the ☰ icon opens the modal menu with the correct options.
 * 3. That clicking "Profile" triggers router navigation to `/profile`.
 * 4. That clicking "Logout" displays the goodbye modal and redirects to `/` after 2.5 seconds.
 *
 * The test mocks:
 * - Font loading via @expo-google-fonts/fredoka
 * - The `router` object from `expo-router`, including `push` and `replace` functions
 *
 * The tests use `@testing-library/react-native` to render components and simulate interactions.
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import TopBanner from '../TopBanner';

// Mock Google Fonts (Fredoka)
// Prevents actual font loading issues in test environment
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true], // Pretend fonts are always loaded
  Fredoka_400Regular: 'Fredoka_400Regular',
  Fredoka_700Bold: 'Fredoka_700Bold',
}));

// Mock navigation functions (router.push and router.replace)
// TopBanner uses `import { router } from 'expo-router'`, so we mock that object
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  __esModule: true,
  router: {
    push: (...args: any[]) => mockPush(...args),
    replace: (...args: any[]) => mockReplace(...args),
  },
}));

describe('TopBanner', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Banner renders with correct title
  it('renders title', () => {
    const { getByText } = render(<TopBanner />);
    expect(getByText('Munchly')).toBeTruthy();
  });

  // Pressing ☰ icon opens the menu with 3 expected options
  it('opens menu when ☰ is pressed', () => {
    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    expect(getByText('👤 Profile')).toBeTruthy();
    expect(getByText('📷 Scan Fridge')).toBeTruthy();
    expect(getByText('🚪 Logout')).toBeTruthy();
  });

  // Selecting "Profile" from menu navigates to /profile
  it('navigates to profile on press', () => {
    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    fireEvent.press(getByText('👤 Profile'));
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });

  // Pressing "Logout" shows goodbye modal and redirects after 2.5s
  it(
    'logs out and shows goodbye modal, then redirects after 2.5s',
    async () => {
      // Use fake timers to simulate timeout behavior
      jest.useFakeTimers();

      const { getByText } = render(<TopBanner />);
      fireEvent.press(getByText('☰'));
      fireEvent.press(getByText('🚪 Logout'));

      // Modal should be visible
      expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

      // Advance time by 2.5s and check redirect
      await act(async () => {
        jest.advanceTimersByTime(2500);
      });

      expect(mockReplace).toHaveBeenCalledWith('/');
      jest.useRealTimers();
    },
    10000 // Allow extra time for the test if needed
  );
});
