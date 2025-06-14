import React from 'react';
import { Slot, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import TopBanner from '../components/TopBanner'; // Custom top UI component

/**
 * This is the global layout wrapper for the Expo Router app.
 * It adds a persistent UI structure across all screens, like the TopBanner.
 * Screens under the /app directory are rendered through <Slot />.
 */

export default function Layout() {
  const pathname = usePathname(); // Get the current route path

  /**
   * Define whether to hide the TopBanner based on the route.
   * We hide the UI in initial screens like home, login, and signup.
   */
  const hideUI =
    pathname === '/' || // Home page
    pathname.includes('/(auth)/login') || // Login screen under (auth) group
    pathname.includes('/(auth)/signup');  // Signup screen under (auth) group

  return (
    <View style={styles.container}>
      {/* Show TopBanner only if not in login/signup screens */}
      {!hideUI && <TopBanner />}
      {/* Slot renders the screen corresponding to the route */}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full height
  },
});
