import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import { saveUserPreferences } from '@/services/userService'; // ניצור קובץ שירות

const initialPreferences = {
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  lactoseFree: false,
  nutAllergy: false,
  seafoodAllergy: false,
};

export default function PreferencesScreen() {
  const { user } = useAuthViewModel();
  const [preferences, setPreferences] = useState(initialPreferences);

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = async () => {
    if (!user) {
      return Alert.alert('Error', 'User not logged in.');
    }

    try {
      await saveUserPreferences(user.uid, preferences);
      router.push('/fridge-scan');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tell us your preferences 🍽️</Text>
      <Text style={styles.subtitle}>We’ll personalize your recipes accordingly</Text>

      {Object.entries(preferences).map(([key, value]) => (
        <View style={styles.row} key={key}>
          <Text style={styles.label}>{formatLabel(key)}</Text>
          <Switch value={value} onValueChange={() => togglePreference(key as keyof typeof preferences)} />
        </View>
      ))}

      <PrimaryButton title="Continue to Fridge Scan" onPress={handleContinue} />
    </ScrollView>
  );
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'
  },
  subtitle: {
    fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center'
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginVertical: 10
  },
  label: {
    fontSize: 16
  }
});







