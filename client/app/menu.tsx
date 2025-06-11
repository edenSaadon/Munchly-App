// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ImageBackground, Alert, Modal } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router, useLocalSearchParams } from 'expo-router';
// import { getAuth } from 'firebase/auth';
// import { getIdToken } from '../src/services/authTokenService';
// import LottieView from 'lottie-react-native';

// export default function MenuScreen() {
//   const [showAnimation, setShowAnimation] = useState(false);
//   const { answers } = useLocalSearchParams();

//   const handleGenerateAIRecipe = async () => {
//     try {
//       setShowAnimation(true);

//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) throw new Error('User not logged in');

//       const token = await getIdToken(true);

//       const userRes = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/${user.uid}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const userData = await userRes.json();
//       const fridgeItems = userData.aiFridgeItems || [];
//       const preferences = userData.preferences || {};

//       const extraAnswers = answers ? JSON.parse(answers as string) : {};

//       if (fridgeItems.length === 0) {
//         setShowAnimation(false);
//         Alert.alert('Error', 'Your fridge is empty! Scan items first.');
//         return;
//       }

//       const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/generate/ai`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           detectedItems: fridgeItems,
//           createdBy: user.uid,
//           preferences,
//           extraAnswers,
//         }),
//       });

//       const data = await response.json();
//       setShowAnimation(false);
//       if (!response.ok) throw new Error(data.message);

//       router.push(`/recipe/${data.id}`);
//     } catch (error: any) {
//       setShowAnimation(false);
//       console.error('❌ Error generating recipe:', error);
//       Alert.alert('Error', error.message || 'Failed to generate recipe');
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>🍽️ Munchly Menu</Text>
//         <Text style={styles.subtitle}>Choose how you'd like to cook today</Text>

//         <PrimaryButton title="Generate Recipe with AI" onPress={handleGenerateAIRecipe} />
//         <PrimaryButton title="Browse All Recipes" onPress={() => router.push('/recipes')} />
//         <PrimaryButton title="Go to Profile" onPress={() => router.push('/profile')} />
//       </View>

//       <Modal visible={showAnimation} transparent animationType="fade">
//         <View style={styles.animationOverlay}>
//           <LottieView
//             source={require('../assets/animations/ai-cooking.json')}
//             autoPlay
//             loop
//             style={{ width: 250, height: 250 }}
//           />
//           <Text style={styles.loadingText}>Chef Munchly is cooking your recipe...</Text>
//         </View>
//       </Modal>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#eee',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   animationOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.75)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 20,
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ImageBackground, Alert, Modal } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router, useLocalSearchParams } from 'expo-router';
// import { getAuth } from 'firebase/auth';
// import { getIdToken } from '../src/services/authTokenService';
// import LottieView from 'lottie-react-native';

// export default function MenuScreen() {
//   const [showAnimation, setShowAnimation] = useState(false);
//   const { answers } = useLocalSearchParams();

//   const handleGenerateAIRecipe = async () => {
//     try {
//       setShowAnimation(true);

//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) throw new Error('User not logged in');

//       const token = await getIdToken(true);

//       const userRes = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/${user.uid}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const userData = await userRes.json();
//       const fridgeItems = userData.aiFridgeItems || [];
//       const preferences = userData.preferences || {};

//       const extraAnswers = answers ? JSON.parse(answers as string) : {};

//       if (fridgeItems.length === 0) {
//         setShowAnimation(false);
//         Alert.alert('Error', 'Your fridge is empty! Scan items first.');
//         return;
//       }

//       const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/generate/ai`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           detectedItems: fridgeItems,
//           createdBy: user.uid,
//           preferences,
//           extraAnswers,
//         }),
//       });

//       const data = await response.json();
//       setShowAnimation(false);
//       if (!response.ok) throw new Error(data.message);

//       // ✅ NEW: If recipe was already generated before, show message and don't redirect
//       if (data.reused) {
//         Alert.alert(
//           'Recipe Already Generated',
//           'Your AI recipe was already created and is waiting in your cookbook under your profile.'
//         );
//         return;
//       }

//       router.push(`/recipe/${data.id}`);
//     } catch (error: any) {
//       setShowAnimation(false);
//       console.error('❌ Error generating recipe:', error);
//       Alert.alert('Error', error.message || 'Failed to generate recipe');
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>🍽️ Munchly Menu</Text>
//         <Text style={styles.subtitle}>Choose how you'd like to cook today</Text>

//         <PrimaryButton title="Generate Recipe with AI" onPress={handleGenerateAIRecipe} />
//         <PrimaryButton title="Browse All Recipes" onPress={() => router.push('/recipes')} />
//         <PrimaryButton title="Go to Profile" onPress={() => router.push('/profile')} />
//       </View>

//       <Modal visible={showAnimation} transparent animationType="fade">
//         <View style={styles.animationOverlay}>
//           <LottieView
//             source={require('../assets/animations/ai-cooking.json')}
//             autoPlay
//             loop
//             style={{ width: 250, height: 250 }}
//           />
//           <Text style={styles.loadingText}>Chef Munchly is cooking your recipe...</Text>
//         </View>
//       </Modal>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#eee',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   animationOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.75)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 20,
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });


// app/menu.tsx
//
// This is the main Menu screen of the Munchly app.
// After scanning fridge items and answering recipe refinement questions,
// the user lands here to choose one of three actions:
// 1. Generate a personalized AI recipe
// 2. Browse all recipes
// 3. Go to their personal profile

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  Modal,
} from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { getIdToken } from '../src/services/authTokenService';
import LottieView from 'lottie-react-native';

export default function MenuScreen() {
  const [showAnimation, setShowAnimation] = useState(false); // Whether to show loading animation
  const { answers } = useLocalSearchParams(); // Optional extra answers from previous screen

  // This function is triggered when user taps "Generate Recipe with AI"
  const handleGenerateAIRecipe = async () => {
    try {
      setShowAnimation(true); // Show loading animation

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      const token = await getIdToken(true); // Get Firebase Auth token

      // Fetch user data from the server to retrieve fridge items and preferences
      const userRes = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/${user.uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await userRes.json();
      const fridgeItems = userData.aiFridgeItems || []; // Items detected from the fridge
      const preferences = userData.preferences || {};   // User dietary preferences

      const extraAnswers = answers ? JSON.parse(answers as string) : {}; // Additional input

      // If fridge is empty, show alert
      if (fridgeItems.length === 0) {
        setShowAnimation(false);
        Alert.alert('Error', 'Your fridge is empty! Scan items first.');
        return;
      }

      // Send recipe generation request to server
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/generate/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          detectedItems: fridgeItems,
          createdBy: user.uid,
          preferences,
          extraAnswers,
        }),
      });

      const data = await response.json();
      setShowAnimation(false);

      if (!response.ok) throw new Error(data.message);

      // If recipe already exists, notify the user and do not redirect
      if (data.reused === true) {
        Alert.alert(
          'Recipe Already Generated',
          'Your AI recipe was already created and is waiting in your cookbook under your profile.'
        );
        return;
      }

      // Navigate to the newly generated recipe screen
      router.push(`/recipe/${data.id}`);
    } catch (error: any) {
      setShowAnimation(false);
      console.error('Error generating recipe:', error);
      Alert.alert('Error', error.message || 'Failed to generate recipe');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Munchly Menu</Text>
        <Text style={styles.subtitle}>Choose how you'd like to cook today</Text>

        {/* AI Recipe Generation Button */}
        <PrimaryButton title="Generate Recipe with AI" onPress={handleGenerateAIRecipe} />

        {/* Go to all saved recipes */}
        <PrimaryButton title="Browse All Recipes" onPress={() => router.push('/recipes')} />

        {/* Navigate to user profile */}
        <PrimaryButton title="Go to Profile" onPress={() => router.push('/profile')} />
      </View>

      {/* Loading animation modal during recipe generation */}
      <Modal visible={showAnimation} transparent animationType="fade">
        <View style={styles.animationOverlay}>
          <LottieView
            source={require('../assets/animations/ai-cooking.json')}
            autoPlay
            loop
            style={{ width: 250, height: 250 }}
          />
          <Text style={styles.loadingText}>Chef Munchly is cooking your recipe...</Text>
        </View>
      </Modal>
    </ImageBackground>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Dark overlay for contrast
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 30,
    textAlign: 'center',
  },
  animationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
