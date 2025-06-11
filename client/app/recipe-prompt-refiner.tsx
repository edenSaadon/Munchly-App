// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router, useLocalSearchParams } from 'expo-router';

// export default function RecipePromptRefinerScreen() {
//   const { items } = useLocalSearchParams();

//   const [craving, setCraving] = useState('');
//   const [time, setTime] = useState('');
//   const [mood, setMood] = useState('');

//   const handleContinue = () => {
//     if (!craving || !time || !mood) {
//       alert('Please answer all questions');
//       return;
//     }

//     const answers = { craving, time, mood };

//     router.push({
//       pathname: '/menu',
//       params: {
//         items: items || '[]',
//         answers: JSON.stringify(answers),
//       },
//     });
//   };

//   const renderOption = (label: string, value: string, selected: string, setSelected: any) => (
//     <TouchableOpacity
//       onPress={() => setSelected(value)}
//       style={[styles.option, selected === value && styles.optionSelected]}
//     >
//       <Text style={styles.optionText}>{label}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <ScrollView contentContainerStyle={styles.overlay}>
//         <Text style={styles.title}>Let’s Fine-Tune Your Recipe 🍳</Text>

//         <Text style={styles.question}>What are you craving?</Text>
//         {renderOption('Sweet', 'sweet', craving, setCraving)}
//         {renderOption('Savory', 'savory', craving, setCraving)}
//         {renderOption('Healthy', 'healthy', craving, setCraving)}
//         {renderOption('Surprise me', 'surprise', craving, setCraving)}

//         <Text style={styles.question}>How much time do you have?</Text>
//         {renderOption('Under 10 min', '10min', time, setTime)}
//         {renderOption('Up to 30 min', '30min', time, setTime)}
//         {renderOption('As long as it takes', 'unlimited', time, setTime)}

//         <Text style={styles.question}>What’s your mood?</Text>
//         {renderOption('Snack', 'snack', mood, setMood)}
//         {renderOption('Full Meal', 'meal', mood, setMood)}
//         {renderOption('Dessert', 'dessert', mood, setMood)}

//         <PrimaryButton title="Continue to Menu" onPress={handleContinue} />
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   overlay: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//   },
//   title: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   question: {
//     fontSize: 18,
//     color: '#fff',
//     marginTop: 20,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   option: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   optionSelected: {
//     backgroundColor: '#00AEEF',
//   },
//   optionText: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });


// RecipePromptRefinerScreen.tsx
//
// This screen appears after the fridge-items screen and before entering the menu.
// It asks the user 3 real questions to personalize the AI-generated recipe:
// 1. What are you craving? ('Sweet', 'Savory', 'Healthy', or 'Surprise me')
// 2. How much time do you have? ('Under 10 min', 'Up to 30 min', 'As long as it takes')
// 3. What’s your mood? ('Snack', 'Full Meal', or 'Dessert')
// These answers are passed along with the scanned fridge items to the /menu screen.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';

export default function RecipePromptRefinerScreen() {
  const { items } = useLocalSearchParams(); // Items scanned from fridge (YOLO/Vision)

  // Each question answer is stored in its own state
  const [craving, setCraving] = useState(''); // Q1: craving type
  const [time, setTime] = useState('');       // Q2: cooking time
  const [mood, setMood] = useState('');       // Q3: meal type/mood

  // When "Continue to Menu" is pressed
  const handleContinue = () => {
    if (!craving || !time || !mood) {
      alert('Please answer all questions'); // Don't allow proceeding without answers
      return;
    }

    const answers = { craving, time, mood };

    // Pass both fridge items and answers to /menu as route params
    router.push({
      pathname: '/menu',
      params: {
        items: items || '[]',
        answers: JSON.stringify(answers),
      },
    });
  };

  // Reusable function to render selectable options for each question
  const renderOption = (label: string, value: string, selected: string, setSelected: any) => (
    <TouchableOpacity
      onPress={() => setSelected(value)}
      style={[styles.option, selected === value && styles.optionSelected]}
    >
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Let’s Fine-Tune Your Recipe 🍳</Text>

        {/* Q1: Craving */}
        <Text style={styles.question}>What are you craving?</Text>
        {renderOption('Sweet', 'sweet', craving, setCraving)}
        {renderOption('Savory', 'savory', craving, setCraving)}
        {renderOption('Healthy', 'healthy', craving, setCraving)}
        {renderOption('Surprise me', 'surprise', craving, setCraving)}

        {/* Q2: Cooking time */}
        <Text style={styles.question}>How much time do you have?</Text>
        {renderOption('Under 10 min', '10min', time, setTime)}
        {renderOption('Up to 30 min', '30min', time, setTime)}
        {renderOption('As long as it takes', 'unlimited', time, setTime)}

        {/* Q3: Mood / Type of meal */}
        <Text style={styles.question}>What’s your mood?</Text>
        {renderOption('Snack', 'snack', mood, setMood)}
        {renderOption('Full Meal', 'meal', mood, setMood)}
        {renderOption('Dessert', 'dessert', mood, setMood)}

        {/* Submit answers and continue */}
        <PrimaryButton title="Continue to Menu" onPress={handleContinue} />
      </ScrollView>
    </ImageBackground>
  );
}

// Styles for layout and buttons
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)', // Dark overlay for readability
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  option: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: '#00AEEF', // Selected option styling
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
