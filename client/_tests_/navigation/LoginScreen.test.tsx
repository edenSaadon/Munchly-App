// _tests_/navigation/LoginScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// 🧪 Mock לפונטים לפני import של LoginScreen
jest.mock('@expo-google-fonts/fredoka', () => ({
  useFonts: () => [true], // fontsLoaded === true
  Fredoka_400Regular: 'Fredoka_400Regular',
  Fredoka_700Bold: 'Fredoka_700Bold',
}));

// 🧪 Mock ל־viewModel
jest.mock('../../src/viewModels/useAuthViewModel');

// 🧪 Mock ל־firebase.ts
jest.mock('../../src/config/firebase', () => ({
  auth: {}, // לא נשתמש באמת בפונקציות בפועל
}));

// 🧪 Mock ל־Google Auth
jest.mock('expo-auth-session/providers/google', () => ({
  useAuthRequest: () => [null, null, jest.fn()],
}));

import LoginScreen from '../../app/(auth)/login';
import * as viewModel from '../../src/viewModels/useAuthViewModel';

describe('LoginScreen', () => {
  it('renders and calls loginWithEmail on button press', async () => {
    const mockLogin = jest.fn();

    (viewModel.useAuthViewModel as jest.Mock).mockReturnValue({
      loginWithEmail: mockLogin,
      signupWithEmail: jest.fn(),
      promptGoogleSignIn: jest.fn(),
      user: null,
      isLoading: false,
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '12345678');
    fireEvent.press(getByText('Log In with Email'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', '12345678');
    });
  });
});
