// __tests__/navigation/indexNavigation.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../../app/index';
import { router } from 'expo-router';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// 🟢 Mock useFonts to always return "loaded"
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true],
}));

describe('WelcomeScreen Navigation', () => {
  it('navigates to Sign Up screen on button press', () => {
    const { getByText } = render(<WelcomeScreen />);
    fireEvent.press(getByText('Sign Up'));
    expect(router.push).toHaveBeenCalledWith('/signup');
  });

  it('navigates to Log In screen on button press', () => {
    const { getByText } = render(<WelcomeScreen />);
    fireEvent.press(getByText('Log In'));
    expect(router.push).toHaveBeenCalledWith('/login');
  });
});
