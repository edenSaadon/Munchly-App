// // App.js ✅ Basic Firebase Connectivity Check
// import React, { useEffect, useState } from 'react';
// import { Text, View, ActivityIndicator, Platform, StyleSheet } from 'react-native';
// import React from 'react';
// import LoginView from './src/views/LoginView';
// import { auth } from './src/config/firebaseConfig';

// export default function App() {
//   const [authReady, setAuthReady] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       console.log('👤 Current user:', user);
//       setAuthReady(true);
//     });

//     return unsubscribe;
//   }, []);

//   if (!authReady) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" />
//         <Text style={styles.text}>Connecting to Firebase...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.success}>✅ Firebase is connected on {Platform.OS}!</Text>
//     </View>
//   );
// }
// // App.js
// export default function App() {
//   return <LoginView />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     marginTop: 16,
//     fontSize: 16,
//   },
//   success: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'green',
//   },
// });

// App.js ✅ Firebase with LoginView
import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import LoginView from './src/views/LoginView';
import { makeRedirectUri } from 'expo-auth-session';

export default function App() {
  useEffect(() => {
    const uri = makeRedirectUri();
    console.log("🔁 Redirect URI used by Expo:", uri);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Platform: {Platform.OS}</Text>
      <LoginView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
});
