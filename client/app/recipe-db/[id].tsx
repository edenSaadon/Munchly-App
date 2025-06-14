// ============================================
// File: app/recipe-db/[id].tsx
//
// Purpose:
// This screen displays a manually stored recipe from Firestore.
// It supports structured ingredients (with name and quantity),
// a single instruction string (parsed into steps),
// and user actions like going back or sharing the recipe.
// ============================================

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getIdToken } from '../../src/services/authTokenService';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import PrimaryButton from 'components/buttons/PrimaryButton';

export default function RecipeDbScreen() {
  // Get the dynamic route param (recipe ID)
  const { id } = useLocalSearchParams();

  // Local state to hold the fetched recipe and loading state
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load custom fonts before rendering content
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  // Fetch the recipe by ID from the backend, using Firebase token
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = await getIdToken(); // Get secure user token
        const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message); // Handle server error
        setRecipe(data); // Save recipe in state
      } catch (err: any) {
        console.error('Error loading DB recipe:', err);
        Alert.alert('Error', err.message || 'Failed to load recipe');
      } finally {
        setLoading(false); // Done loading (success or failure)
      }
    };

    if (id) fetchRecipe(); // Trigger fetch only if ID exists
  }, [id]);

  // Navigate to menu screen (replaces current route)
  const handleBackToMenu = () => {
    router.replace('/menu');
  };

  // Share the recipe via system share dialog
  const handleShare = async () => {
    if (!recipe) return;

    // Format ingredients for display
    const ingredientsText = Array.isArray(recipe.ingredients)
      ? recipe.ingredients
          .map((item: any) => `• ${item.name} - ${item.quantity}`)
          .join('\n')
      : 'No ingredients listed.';

    // Parse and format instructions string
    const instructionsText =
      typeof recipe.instructions === 'string' && recipe.instructions.trim().length > 0
        ? recipe.instructions
            .split('.')
            .map((line: string, idx: number) =>
              line.trim().length > 0 ? `${idx + 1}. ${line.trim()}.` : null
            )
            .filter(Boolean)
            .join('\n')
        : 'No instructions provided.';

    // Final text to share
    const message = `🍽️ ${recipe.title}\n\nIngredients:\n${ingredientsText}\n\nInstructions:\n${instructionsText}`;

    try {
      await Share.share({ message });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to share recipe');
    }
  };

  // Show loading state while fetching data or fonts
  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  // Show fallback if recipe is missing
  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Recipe not found</Text>
      </View>
    );
  }

  // Render the full recipe content
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.recipeCard}>
        {/* Header: Logo and Recipe Title */}
        <View style={styles.headerRow}>
          <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.title}>{recipe.title}</Text>
        </View>

        {/* Recipe image (if exists) */}
        {recipe.imageUrl && (
          <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
        )}

        {/* Render Ingredients */}
        {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((item: any, idx: number) => (
              <Text key={idx} style={styles.item}>
                • {item.name} - {item.quantity}
              </Text>
            ))}
          </>
        )}

        {/* Render Instructions */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        {typeof recipe.instructions === 'string' && recipe.instructions.trim().length > 0 ? (
          recipe.instructions
            .split('.')
            .map((line: string, idx: number) =>
              line.trim().length > 0 ? (
                <Text key={idx} style={styles.item}>
                  {idx + 1}. {line.trim()}.
                </Text>
              ) : null
            )
        ) : (
          <Text style={styles.item}>No instructions provided.</Text>
        )}
      </View>

      {/* Footer: Signature and Buttons */}
      <Text style={styles.signature}>Stored with 🧡 in your Munchly DB</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleBackToMenu}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Share Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ============================================
// Styles used across the screen
// ============================================
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#003366',
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003366',
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Fredoka_400Regular',
    marginTop: 10,
    textAlign: 'center',
  },
  recipeCard: {
    backgroundColor: '#fefefe',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#003366',
    fontFamily: 'Fredoka_700Bold',
    flexShrink: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#003366',
    fontFamily: 'Fredoka_700Bold',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'left',
  },
  item: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Fredoka_400Regular',
    marginBottom: 6,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#003366',
    fontFamily: 'Fredoka_700Bold',
  },
  shareButton: {
    marginTop: 15,
    backgroundColor: '#f5f5dc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    color: '#003366',
    fontFamily: 'Fredoka_700Bold',
  },
  signature: {
    fontSize: 14,
    color: '#f5f5dc',
    fontFamily: 'Fredoka_400Regular',
    textAlign: 'center',
    marginTop: 10,
  },
});
