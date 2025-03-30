export default {
  expo: {
    name: 'client',
    slug: 'client',
    version: '1.0.0',
    scheme: 'exp',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.munchly.client',
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true, // מאפשר HTTP במקום רק HTTPS
        },
      },
    },
    android: {
      package: 'com.munchly.client',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [], // כאן אפשר להוסיף הרשאות אם צריך גישה למצלמה, אחסון וכו'
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '64fc4a67-4645-4168-8104-17315f028f3c',
      },
      EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
      EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
      EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO,
      EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,

      EXPO_PUBLIC_FIREBASE_API_KEY_ANDROID: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_ANDROID,
      EXPO_PUBLIC_FIREBASE_API_KEY_IOS: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_IOS,
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID,
      EXPO_PUBLIC_FIREBASE_APP_ID_IOS: process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS,
    },
  },
};
