// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Switch,
//   Alert,
//   ImageBackground,
// } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router } from 'expo-router';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// import { saveUserPreferences } from '@/services/userService';

// const initialPreferences = {
//   vegetarian: false,
//   vegan: false,
//   glutenFree: false,
//   lactoseFree: false,
//   nutAllergy: false,
//   seafoodAllergy: false,
// };

// export default function PreferencesScreen() {
//   const { user } = useAuthViewModel();
//   const [preferences, setPreferences] = useState(initialPreferences);

//   const togglePreference = (key: keyof typeof preferences) => {
//     setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleContinue = async () => {
//     if (!user) {
//       return Alert.alert('Error', 'User not logged in.');
//     }

//     try {
//       await saveUserPreferences(user.uid, preferences);
//       router.push('/fridge-scan');
//     } catch (err: any) {
//       Alert.alert('Error', err.message);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <ScrollView contentContainerStyle={styles.overlay}>
//         <Text style={styles.title}>Tell us your preferences 🍽️</Text>
//         <Text style={styles.subtitle}>We’ll personalize your recipes accordingly</Text>

//         {Object.entries(preferences).map(([key, value]) => (
//           <View style={styles.row} key={key}>
//             <Text style={styles.label}>{formatLabel(key)}</Text>
//             <Switch
//               value={value}
//               onValueChange={() => togglePreference(key as keyof typeof preferences)}
//               trackColor={{ true: '#00AEEF', false: '#999' }}
//               thumbColor={value ? '#fff' : '#ccc'}
//             />
//           </View>
//         ))}

//         <PrimaryButton title="Continue to Fridge Scan" onPress={handleContinue} />
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// function formatLabel(key: string): string {
//   return key
//     .replace(/([A-Z])/g, ' $1')
//     .replace(/^./, (str) => str.toUpperCase());
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   overlay: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#eee',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//     paddingBottom: 8,
//   },
//   label: {
//     fontSize: 16,
//     color: '#fff',
//   },
// });


// app/preferences.tsx
//
// This is the user Preferences screen.
// After signing up or logging in, the user is asked to select their dietary preferences or allergies.
// These preferences are stored in Firestore and used to personalize recipe generation later.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  ImageBackground,
} from 'react-native';

import PrimaryButton from '../components/buttons/PrimaryButton'; // Reusable custom button
import { router } from 'expo-router'; // Navigation tool
import { useAuthViewModel } from '@/viewModels/useAuthViewModel'; // Hook for accessing logged-in user
import { saveUserPreferences } from '@/services/userService'; // Function that saves preferences in Firestore

// Default state for the preferences form
const initialPreferences = {
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  lactoseFree: false,
  nutAllergy: false,
  seafoodAllergy: false,
};

export default function PreferencesScreen() {
  const { user } = useAuthViewModel(); // Get the currently logged-in user
  const [preferences, setPreferences] = useState(initialPreferences); // Local state for user toggles

  // Toggles a specific preference field (e.g., vegan, glutenFree)
  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handler for the "Continue" button
  const handleContinue = async () => {
    if (!user) {
      return Alert.alert('Error', 'User not logged in.');
    }

    try {
      // Save the selected preferences to Firestore under the current user
      await saveUserPreferences(user.uid, preferences);
      // Navigate to the fridge scan screen
      router.push('/fridge-scan');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Tell us your preferences</Text>
        <Text style={styles.subtitle}>We’ll personalize your recipes accordingly</Text>

        {/* Dynamically render a row for each preference */}
        {Object.entries(preferences).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>{formatLabel(key)}</Text>
            <Switch
              value={value}
              onValueChange={() => togglePreference(key as keyof typeof preferences)}
              trackColor={{ true: '#00AEEF', false: '#999' }}
              thumbColor={value ? '#fff' : '#ccc'}
            />
          </View>
        ))}

        <PrimaryButton title="Continue to Fridge Scan" onPress={handleContinue} />
      </ScrollView>
    </ImageBackground>
  );
}

// Format camelCase keys into user-friendly labels (e.g., "glutenFree" → "Gluten Free")
function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

// --- Styles ---
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay for contrast
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
});
