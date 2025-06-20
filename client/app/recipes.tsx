// RecipesScreen.tsx
//
// This screen displays a scrollable collection of recipes fetched from the backend.
// Users can tap to view a recipe or tap the heart icon to like/unlike it.
// Liked recipes are saved under the user's profile in Firestore.
// Navigation options allow the user to return to the menu or go to their profile.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';
import { getIdToken } from '../src/services/authTokenService';
import { getAuth } from 'firebase/auth';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';

export default function RecipesScreen() {
  // State to store the fetched recipe list
  const [recipes, setRecipes] = useState<any[]>([]);

  // State to store IDs of liked recipes for this session
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);

  // Load custom fonts for text styling
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  // Fetch the recipes from the backend on first render
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = await getIdToken(); // Get Firebase user token
        const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`, // Auth header
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setRecipes(data); // Save recipes to state
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        Alert.alert('Error', 'Could not load recipes');
      }
    };

    fetchRecipes();
  }, []);

  // Handles like/unlike recipe logic
  const handleLike = async (id: string) => {
    try {
      const token = await getIdToken(); // Firebase token
      const user = getAuth().currentUser;
      if (!user) throw new Error('User not logged in');

      // Send like/unlike request to backend
      const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid: user.uid }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Update local liked state
      setLikedRecipes(prev =>
        prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
      );
    } catch (err: any) {
      console.error(' Failed to like recipe:', err);
      Alert.alert('Error', err.message || 'Failed to like recipe');
    }
  };

  // Render each recipe card in the list
  const renderItem = ({ item }: { item: any }) => {
    // Determine path depending on recipe source
    const recipePath = item.source === 'db'
      ? `/recipe-db/${item.id}` // Database recipe screen
      : { pathname: `/recipe/${item.id}`, params: { source: 'collection' } }; // AI-generated recipe

    return (
      <TouchableOpacity style={styles.card} onPress={() => router.push(recipePath)}>
        <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Text style={styles.like}>{likedRecipes.includes(item.id) ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Wait for fonts to load before rendering
  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('../assets/images/recipes.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>📚 Recipes Collection</Text>

        {/* Recipe list display */}
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        {/* Navigation buttons */}
        <View style={styles.footer}>
          <PrimaryButton title="Go to Profile" onPress={() => router.push('/profile')} />
          <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
        </View>
      </View>
    </ImageBackground>
  );
}

// Styling for background, cards, buttons, and text
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontFamily: 'Fredoka_700Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#f5f5dc',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#f5f5dc',
    borderRadius: 50,
    overflow: 'hidden',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  image: {
    height: 60,
    width: 80,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Fredoka_400Regular',
    color: '#333',
  },
  like: {
    fontSize: 24,
    fontFamily: 'Fredoka_400Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
