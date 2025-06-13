// // _tests_/navigation/LoginScreen.test.tsx

// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';

// // 🧪 Mock לפונטים לפני import של LoginScreen
// jest.mock('@expo-google-fonts/fredoka', () => ({
//   useFonts: () => [true], // fontsLoaded === true
//   Fredoka_400Regular: 'Fredoka_400Regular',
//   Fredoka_700Bold: 'Fredoka_700Bold',
// }));

// // 🧪 Mock ל־viewModel
// jest.mock('../../src/viewModels/useAuthViewModel');

// // 🧪 Mock ל־firebase.ts
// jest.mock('../../src/config/firebase', () => ({
//   auth: {}, // לא נשתמש באמת בפונקציות בפועל
// }));

// // 🧪 Mock ל־Google Auth
// jest.mock('expo-auth-session/providers/google', () => ({
//   useAuthRequest: () => [null, null, jest.fn()],
// }));

// import LoginScreen from '../../app/(auth)/login';
// import * as viewModel from '../../src/viewModels/useAuthViewModel';

// describe('LoginScreen', () => {
//   it('renders and calls loginWithEmail on button press', async () => {
//     const mockLogin = jest.fn();

//     (viewModel.useAuthViewModel as jest.Mock).mockReturnValue({
//       loginWithEmail: mockLogin,
//       signupWithEmail: jest.fn(),
//       promptGoogleSignIn: jest.fn(),
//       user: null,
//       isLoading: false,
//     });

//     const { getByPlaceholderText, getByText } = render(<LoginScreen />);

//     fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
//     fireEvent.changeText(getByPlaceholderText('Password'), '12345678');
//     fireEvent.press(getByText('Log In with Email'));

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalledWith('test@example.com', '12345678');
//     });
//   });
// });

// _tests_/navigation/LoginScreen.test.tsx

// This test file verifies the login functionality of the LoginScreen component.
// Specifically, it ensures that when the user inputs email and password and presses the "Log In with Email" button,
// the corresponding function `loginWithEmail` is correctly called with the provided credentials.

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mocking the font loading before importing the LoginScreen.
// The `useFonts` hook is mocked to always return true (fonts are considered loaded).
// This prevents any rendering issues related to font loading during tests.
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true], // fontsLoaded === true
  Fredoka_400Regular: 'Fredoka_400Regular',
  Fredoka_700Bold: 'Fredoka_700Bold',
}));

// Mocking the useAuthViewModel, which manages authentication logic.
// This allows us to control its return values during tests and track function calls.
jest.mock('../../src/viewModels/useAuthViewModel');

// Mocking the Firebase config file to prevent real Firebase calls.
// The `auth` object is stubbed as it's not needed for the scope of this test.
jest.mock('../../src/config/firebase', () => ({
  auth: {},
}));

// Mocking the Google Auth request from Expo.
// We're stubbing `useAuthRequest` to prevent actual OAuth behavior in tests.
jest.mock('expo-auth-session/providers/google', () => ({
  useAuthRequest: () => [null, null, jest.fn()],
}));

// Importing the component under test – the LoginScreen.
// Also importing the real (mocked) viewModel to configure mock return values in the test.
import LoginScreen from '../../app/(auth)/login';
import * as viewModel from '../../src/viewModels/useAuthViewModel';

// Main test suite for the LoginScreen component.
describe('LoginScreen', () => {

  // Simulates a user logging in with email and password.
  // This test checks that when the user enters valid input and clicks the "Log In with Email" button,
  // the `loginWithEmail` function is invoked with the expected arguments.
  it('renders and calls loginWithEmail on button press', async () => {
    const mockLogin = jest.fn(); // Create a mock function to track the login call.

    // Set the mocked implementation of the useAuthViewModel hook.
    // This includes all the properties the LoginScreen expects (e.g., loginWithEmail, user, isLoading).
    (viewModel.useAuthViewModel as jest.Mock).mockReturnValue({
      loginWithEmail: mockLogin,
      signupWithEmail: jest.fn(),
      promptGoogleSignIn: jest.fn(),
      user: null,
      isLoading: false,
    });

    // Render the LoginScreen for testing.
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Simulate user input for email and password.
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '12345678');

    // Simulate button press for logging in.
    fireEvent.press(getByText('Log In with Email'));

    // Wait for the async action to complete and assert that the login function was called.
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', '12345678');
    });
  });
});
