/**
 * File: authViewModel.test.tsx
 *
 * Purpose:
 * This test validates the behavior of the custom hook `useAuthViewModel`.
 * It specifically checks that:
 * - When there is no authenticated user, `user` is null
 * - The `isLoggedIn` flag is set to false
 *
 * Dependencies:
 * - React Native Testing Library
 * - Firebase Auth (mocked)
 * - expo-auth-session (mocked to prevent crashes)
 *
 * Why it's important:
 * Ensures that the authentication view model initializes correctly
 * when no user is logged in — a critical part of app logic.
 */

import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { useAuthViewModel } from '../src/viewModels/useAuthViewModel';
import { onAuthStateChanged } from 'firebase/auth';

// Mock Firebase auth module to simulate authentication logic
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),                   // Returns empty auth object
  onAuthStateChanged: jest.fn(),                  
  GoogleAuthProvider: {
    credential: jest.fn(),                        // Mock Google credentials
  },
  signInWithCredential: jest.fn(),                // Mock sign-in behavior
  signOut: jest.fn(),                             // Mock sign-out behavior
}));

// Mock expo-auth-session to avoid runtime crashes in tests
jest.mock('expo-auth-session/providers/google', () => ({
  useAuthRequest: () => [null, null, jest.fn()],  // Return dummy auth request
}));

// A small test component that uses the custom hook and renders two flags
const TestComponent = () => {
  const { user } = useAuthViewModel();
  const isLoggedIn = !!user; // true if user exists

  return (
    <>
      <Text testID="user">{user ? 'yes' : 'no'}</Text>             {/* Shows 'no' if user is null */}
      <Text testID="logged">{isLoggedIn ? 'true' : 'false'}</Text> {/* Shows login state */}
    </>
  );
};

describe('useAuthViewModel', () => {
  it('should show no user when not authenticated', () => {
    // Simulate no user signed in
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback(null); // Simulate null user
      return () => {}; // Return dummy unsubscribe function
    });

    const { getByTestId } = render(<TestComponent />);

    // Validate the rendered output reflects the null user state
    expect(getByTestId('user').props.children).toBe('no');
    expect(getByTestId('logged').props.children).toBe('false');
  });
});
