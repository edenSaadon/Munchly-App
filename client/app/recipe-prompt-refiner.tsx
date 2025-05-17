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
  const { items } = useLocalSearchParams();

  const [craving, setCraving] = useState('');
  const [time, setTime] = useState('');
  const [mood, setMood] = useState('');

  const handleContinue = () => {
    if (!craving || !time || !mood) {
      alert('Please answer all questions');
      return;
    }

    const answers = { craving, time, mood };

    router.push({
      pathname: '/menu',
      params: {
        items: items || '[]',
        answers: JSON.stringify(answers),
      },
    });
  };

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
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Let’s Fine-Tune Your Recipe 🍳</Text>

        <Text style={styles.question}>What are you craving?</Text>
        {renderOption('Sweet', 'sweet', craving, setCraving)}
        {renderOption('Savory', 'savory', craving, setCraving)}
        {renderOption('Healthy', 'healthy', craving, setCraving)}
        {renderOption('Surprise me', 'surprise', craving, setCraving)}

        <Text style={styles.question}>How much time do you have?</Text>
        {renderOption('Under 10 min', '10min', time, setTime)}
        {renderOption('Up to 30 min', '30min', time, setTime)}
        {renderOption('As long as it takes', 'unlimited', time, setTime)}

        <Text style={styles.question}>What’s your mood?</Text>
        {renderOption('Snack', 'snack', mood, setMood)}
        {renderOption('Full Meal', 'meal', mood, setMood)}
        {renderOption('Dessert', 'dessert', mood, setMood)}

        <PrimaryButton title="Continue to Menu" onPress={handleContinue} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    backgroundColor: '#00AEEF',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
