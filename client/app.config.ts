/**
 * File: app.config.js
 *
 * Purpose:
 * This file defines the **dynamic Expo configuration** for the Munchly app.
 * It replaces the traditional static `app.json` file with a JavaScript-based config,
 * allowing the use of logic (like loading from .env) and better flexibility.
 *
 * What it configures:
 * - App name, version, icons, splash screen, orientation
 * - iOS and Android bundle/package identifiers
 * - Firebase environment variables via Expo `extra`
 * - Plugins like `expo-font`
 *
 * Why it's important:
 * Expo uses this file when building the app or running `npx expo start`.
 * This setup allows you to keep secrets out of version control (via `.env`)
 * while still exposing safe public keys to the client.
 *
 * Keys like `EXPO_PUBLIC_FIREBASE_...` are exposed to the client by design.
 */


// Loads environment variables from .env (e.g., Firebase keys)
import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

// Exports a dynamic Expo config function (used instead of static app.json)
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config, // Preserve any default config values from Expo CLI

  // General App Info
  name: 'Munchly', // The app name shown on the device
  slug: 'munchly', // Used in Expo URLs and build configuration
  version: '1.0.0', // App version (semantic versioning)
  orientation: 'portrait', // Lock app to portrait orientation
  icon: './assets/images/icon.png', // Main app icon (used across platforms)
  userInterfaceStyle: 'light', // Force light mode UI
  scheme: 'exp', // Used for deep linking (e.g., exp://)
  newArchEnabled: true, // Enables the new Expo architecture (Fabric)

  // Splash Screen Settings (shown during app load)
  splash: {
    image: './assets/images/icon.png', // Image displayed on launch
    resizeMode: 'contain', // Prevents stretching the splash image
    backgroundColor: '#ffffff', // White background for splash screen
  },

  // iOS-Specific Settings
  ios: {
    supportsTablet: true, // Enable layout support for iPad/tablet
    bundleIdentifier: 'com.munchly.client', // Unique iOS bundle ID
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true, // Allow all network requests (development only)
      },
    },
  },

  // Android-Specific Settings
  android: {
    package: 'com.munchly.client', // Unique Android package name
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png', // Foreground icon
      backgroundColor: '#ffffff', // Background color of the adaptive icon
    },
    permissions: [], // No additional permissions declared at this time
  },

  // Web-Specific Settings
  web: {
    favicon: './assets/images/favicon.png', // Favicon used for PWA/web
  },

  // Expo Plugins Configuration
  plugins: [
    'expo-font', // Load custom fonts via expo-font (moved from app.json)
  ],

  // Environment variables and project metadata
  extra: {
    eas: {
      projectId: '64fc4a67-4645-4168-8104-17315f028f3c', // Project ID used by EAS Build/Update
    },

    // Firebase credentials exposed to client (public keys only)
    EXPO_PUBLIC_FIREBASE_API_KEY_ANDROID: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_ANDROID,
    EXPO_PUBLIC_FIREBASE_API_KEY_IOS: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_IOS,
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID,
    EXPO_PUBLIC_FIREBASE_APP_ID_IOS: process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS,
  },
});
