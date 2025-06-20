/**
 * Test File: PrimaryButton.test.tsx
 *
 * Purpose:
 * This test suite checks the behavior and rendering of the <PrimaryButton /> component,
 * a reusable UI button in the app.
 *
 * What is tested:
 * 1. The button renders with the correct title passed via props.
 * 2. The onPress handler is triggered when the button is pressed and not disabled.
 * 3. The onPress handler is NOT triggered when the button is disabled.
 *
 * Notes:
 * - React Native's fireEvent is used to simulate user interaction.
 * - Assertions check both rendering and behavior.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from '../buttons/PrimaryButton';

describe('PrimaryButton', () => {
  // Test 1: Ensure the button displays the correct title
  it('renders the correct title', () => {
    const { getByText } = render(
      <PrimaryButton title="Click Me" onPress={() => {}} />
    );

    // Verify that the button text is rendered correctly
    expect(getByText('Click Me')).toBeTruthy();
  });

  // Test 2: Ensure onPress is called when the button is pressed and not disabled
  it('calls onPress when pressed and not disabled', () => {
    const mockPress = jest.fn(); // Create a mock function for onPress
    const { getByText } = render(
      <PrimaryButton title="Submit" onPress={mockPress} />
    );

    // Simulate button press
    fireEvent.press(getByText('Submit'));

    // Assert that the onPress mock function was called
    expect(mockPress).toHaveBeenCalled();
  });

  // Test 3: Ensure onPress is NOT called if the button is disabled
  it('does NOT call onPress when button is disabled', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton title="Disabled" onPress={mockPress} disabled />
    );

    // Simulate press on disabled button
    fireEvent.press(getByText('Disabled'));

    // Assert that onPress was NOT called
    expect(mockPress).not.toHaveBeenCalled();
  });
});
