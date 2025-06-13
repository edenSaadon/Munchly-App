// ==============================
// File:_tests_/navigation/indexNavigation.test.tsx
// Purpose:
// This test file verifies the navigation behavior of the WelcomeScreen .
// It ensures that when users click on the "Sign Up" or "Log In" buttons,
// the app correctly routes them to the appropriate screens using `expo-router`.
// ==============================

// Importing React and essential testing utilities from the testing library.
// `render` is used to render the component for testing,
// and `fireEvent` is used to simulate user interactions (button presses).
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Importing the component under test - the WelcomeScreen.
// This is the screen displayed when the app is first opened.
import WelcomeScreen from '../../app/index';

// Importing and mocking the `router` object from expo-router,
// which handles in-app navigation. We'll spy on `router.push` to ensure correct behavior.
import { router } from 'expo-router';

// Mocking the `router.push` method to track navigation calls without performing real navigation.
// This allows us to test whether the app is *trying* to navigate without actually changing screens.
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mocking the useFonts hook from the @expo-google-fonts/fredoka package
// to always return [true], indicating that the fonts are loaded.
// This prevents font-loading delays from affecting the tests.
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true],
}));

// The test suite for the WelcomeScreen navigation behavior.
describe('WelcomeScreen Navigation', () => {
  // Navigating to the Sign Up screen.
  // This test ensures that when the "Sign Up" button is pressed,
  // the app attempts to navigate to the '/signup' route.
  it('navigates to Sign Up screen on button press', () => {
    const { getByText } = render(<WelcomeScreen />);
    fireEvent.press(getByText('Sign Up'));
    expect(router.push).toHaveBeenCalledWith('/signup');
  });

  // Navigating to the Log In screen.
  // This test ensures that when the "Log In" button is pressed,
  // the app attempts to navigate to the '/login' route.
  it('navigates to Log In screen on button press', () => {
    const { getByText } = render(<WelcomeScreen />);
    fireEvent.press(getByText('Log In'));
    expect(router.push).toHaveBeenCalledWith('/login');
  });
});
