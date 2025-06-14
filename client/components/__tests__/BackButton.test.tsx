/**
 * Test File: BackButton.test.tsx
 *
 * Purpose:
 * This test suite verifies the behavior of the <BackButton /> component, which is
 * responsible for navigating back using `router.back()` when pressed.
 *
 * What is tested:
 * 1. The component renders a button with the correct test ID.
 * 2. When the button is pressed, the router's `back()` function is triggered.
 *
 * Mocks:
 * - The `useRouter` hook from `expo-router` is mocked to provide a controlled
 *   version of the `back()` function (so that navigation behavior can be observed in isolation).
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BackButton from '../buttons/BackButton';

// Create a mock function to track if `back()` was called
const mockBack = jest.fn();

// Mock the `useRouter` hook from expo-router to return our mockBack function
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

// Begin the test suite for the BackButton component
describe('BackButton', () => {
  // Test 1: Make sure the button renders properly with the test ID
  it('renders the back button icon', () => {
    const { getByTestId } = render(<BackButton />);
    
    // Assert that the component with testID "BackButtonTouchable" exists
    expect(getByTestId('BackButtonTouchable')).toBeTruthy();
  });

  // Test 2: Simulate pressing the button and check if router.back() is called
  it('calls router.back() when pressed', () => {
    const { getByTestId } = render(<BackButton />);
    
    // Simulate a user pressing the button
    fireEvent.press(getByTestId('BackButtonTouchable'));
    
    // Verify that the mock `back()` function was called
    expect(mockBack).toHaveBeenCalled();
  });
});
