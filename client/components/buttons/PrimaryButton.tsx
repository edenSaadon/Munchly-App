// PrimaryButton.tsx
//
// Purpose:
// A reusable, styled primary button component for use throughout the app.
// It supports:
// - A `title` string as button label
// - An `onPress` function triggered when pressed
// - An optional `disabled` state which changes style and disables touch
//
// Dependencies:
// - React Native `TouchableOpacity`, `Text`, `StyleSheet` for UI and layout
//
// Used in many screens like Profile, Menu, etc., to trigger navigation or actions.

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;               // Text label displayed on the button
  onPress: () => void;         // Callback when the button is pressed
  disabled?: boolean;          // Optional: disables the button if true
};

export default function PrimaryButton({ title, onPress, disabled = false }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]} // Apply disabled style conditionally
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark semi-transparent background
    paddingVertical: 12,                  // Vertical padding inside button
    paddingHorizontal: 30,                // Horizontal padding inside button
    borderRadius: 10,                     // Rounded corners
    marginTop: 20,                        // Spacing above button
  },
  text: {
    color: '#fff',                        // White text
    //fontWeight: 'regular',
    fontSize: 16,
    fontFamily: 'Fredoka_400Regular',     // Custom font to match app design
  },
  disabled: {
    backgroundColor: '#AAB2BD',           // Dimmed background for disabled state
  },
  textDisabled: {
    color: '#f2f2f2',                     // Lighter text color for disabled button
  },
});
