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
import { render, fireEvent, act } from '@testing-library/react-native';
import TopBanner from '../TopBanner';

// 🟣 Mock font loading
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true],
  Fredoka_400Regular: 'Fredoka_400Regular',
  Fredoka_700Bold: 'Fredoka_700Bold',
}));

// ✅ Mock expo-router
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

describe('TopBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    const { getByText } = render(<TopBanner />);
    expect(getByText('Munchly')).toBeTruthy();
  });

  it('opens menu when ☰ is pressed', () => {
    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    expect(getByText('👤 Profile')).toBeTruthy();
    expect(getByText('📷 Scan Fridge')).toBeTruthy();
    expect(getByText('🚪 Logout')).toBeTruthy();
  });

  it('navigates to profile on press', () => {
    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    fireEvent.press(getByText('👤 Profile'));
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });

  it('logs out and shows goodbye modal, then redirects after 2.5s', async () => {
    jest.useFakeTimers(); // ⏲️ הפעלת טיימרים מזויפים

    const { getByText } = render(<TopBanner />);
    fireEvent.press(getByText('☰'));
    fireEvent.press(getByText('🚪 Logout'));

    // ⏳ המתן ל־modal
    expect(getByText('Thanks for choosing Munchly!')).toBeTruthy();

    // ⏱️ העבר זמן של 2.5 שניות וודא שה־replace נקרא
    await act(async () => {
      jest.advanceTimersByTime(2500);
    });

    expect(mockReplace).toHaveBeenCalledWith('/');
    jest.useRealTimers(); // תמיד להחזיר
  });
});
