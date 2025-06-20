// BackButton.tsx
//
// Purpose:
// This component provides a reusable "Back" button that allows users to navigate
// to the previous screen using the built-in `router.back()` method from `expo-router`.
//
// It's styled as a floating circular button with a semi-transparent background,
// typically placed in the bottom-left corner of the screen.
//
// Dependencies:
// - expo-router: for navigation control
// - react-native: core UI components and styling
// - @expo/vector-icons (Ionicons): for rendering the back arrow icon
//
// Includes `testID` prop for automated testing with Jest or React Native Testing Library.

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Icon library for back arrow

export default function BackButton() {
  const router = useRouter(); // React Navigation hook from expo-router

  return (
    <TouchableOpacity
      testID="BackButtonTouchable" // Used only in testing (Jest/RTL), not visible to users
      style={styles.button}
      onPress={() => router.back()} // Navigate back when pressed
    >
      <Ionicons name="arrow-back" size={30} color="white" /> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',             // Position the button over the screen
    bottom: 20,                       // Distance from bottom edge
    left: 20,                         // Distance from left edge
    backgroundColor: 'rgba(0, 0, 0, 0.6)', //  Semi-transparent black background
    padding: 10,                      // Inner padding
    borderRadius: 50,                // Fully rounded button
  },
});
