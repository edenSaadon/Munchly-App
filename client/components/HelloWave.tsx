// HelloWave.tsx
//
// Component Purpose:
// This component displays a waving hand emoji and animates it using rotation to simulate a "hello" wave gesture.
// It uses `react-native-reanimated` to perform smooth and efficient animations on the UI thread.
// The wave gesture rotates the hand to 25 degrees and back, repeated 4 times.

import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

// Import Reanimated hooks and functions
import Animated, {
  useSharedValue,     // Used to define a reactive animated value (in this case, the rotation angle)
  useAnimatedStyle,   // Creates a style that updates automatically when the animated value changes
  withSequence,       // Allows chaining of animations (rotate to angle, then back)
  withTiming,         // Smooth interpolation to a value over time
  withRepeat,         // Repeats the animation a specified number of times
} from 'react-native-reanimated';

export default function HelloWave() {
  // Define a shared value for rotation, starting at 0 degrees
  const rotation = useSharedValue(0);

  useEffect(() => {
    // When component mounts, trigger a waving animation:
    // Rotate to 25° over 150ms, then back to 0° over 150ms
    // Repeat this sequence 4 times
    rotation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150 }), // Rotate right
        withTiming(0, { duration: 150 })   // Rotate back to original
      ),
      4 // Repeat the waving motion 4 times
    );
  }, []);

  // Define an animated style that rotates the emoji based on `rotation` value
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    // Animated container for the waving emoji using the animated rotation style
    <Animated.View style={animatedStyle}>
      <Text style={styles.wave}>👋</Text>
    </Animated.View>
  );
}

// StyleSheet for the emoji
const styles = StyleSheet.create({
  wave: {
    fontSize: 40,       // Make the emoji large
    marginBottom: 12,   // Add space below it
  },
});
