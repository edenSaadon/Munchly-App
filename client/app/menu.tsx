// 📁 app/menu.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';

export default function MenuScreen() {
  const handleGenerateAIRecipe = async () => {
    try {
      // ✨ קריאה לשרת שיחזיר מתכון חדש עם AI
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/generate/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ detectedItems: ['example', 'data'] }), // תחליפי ברשימה האמיתית מה-Fridge
      });
      const recipe = await response.json();
      if (!response.ok) throw new Error(recipe.message);

      router.push(`/recipe/${recipe.id}`); // ניווט לדף מתכון עם ID
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to generate recipe');
    }
  };

  const handleFetchFridgeRecipe = () => {
    // 🎯 ניווט למסך מתכון קיים שמתאים לפריטים שנסרקו
    router.push('/recipe/123'); // תחליפי ב־ID אמיתי כשתמשיכי ליישם
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🍽️ Munchly Menu</Text>
        <Text style={styles.subtitle}>Choose how you'd like to cook today</Text>

        <PrimaryButton title="Generate Recipe with AI" onPress={handleGenerateAIRecipe} />
        <PrimaryButton title="Fetch fridge based recipe" onPress={handleFetchFridgeRecipe} />
{/* 
        <PrimaryButton title="See Sample Recipe" onPress={() => router.push('/recipe/1234')} />
        <PrimaryButton title="Go to Profile" onPress={() => router.push('/profile')} />
        <PrimaryButton title="Go to Favorites" onPress={() => router.push('/favorites')} />
        <PrimaryButton title="Go to Scan Fridge" onPress={() => router.push('/fridge-scan')} />
        <PrimaryButton title="Go to Fridge Items" onPress={() => router.push('/fridge-items')} />
        <PrimaryButton title="Go to Preferences" onPress={() => router.push('/preferences')} />*/} 





      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
});
