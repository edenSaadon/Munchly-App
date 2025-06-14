// ProfileScreen.tsx
//
// This screen displays the authenticated user's profile, including:
// - Display name and profile image
// - Stored food preferences (e.g., vegan, gluten-free)
// - Last fridge scan timestamp
// - List of liked recipes, fetched by ID from the backend
//
// The user can:
// - Pick a new profile image from the device gallery
// - View and scroll through their saved (liked) recipes
// - Open individual recipes to view full details (image, ingredients, instructions)
// - Navigate back to the main menu
//
// All data is securely retrieved using Firebase Authentication tokens.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import { getUserProfile } from '@/services/userService';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router } from 'expo-router';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import { getIdToken } from '../src/services/authTokenService';

export default function ProfileScreen() {
  const { user } = useAuthViewModel();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showRecipeBook, setShowRecipeBook] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  // Fetch profile data from backend using user's UID
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);

        // Fetch liked recipes if any exist
        if (data.likedRecipes && data.likedRecipes.length > 0) {
          const token = await getIdToken();
          const recipePromises = data.likedRecipes.map((id: string) =>
            fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then(res => res.json())
          );
          const fullRecipes = await Promise.all(recipePromises);
          setRecipes(fullRecipes);
        }
      } catch (err: any) {
        Alert.alert('Error', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Allow user to pick an image from their gallery
  const handlePickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'Gallery access is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Show loading spinner until fonts and data are ready
  if (!fontsLoaded || loading) {
    return (
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
    );
  }

  // Show fallback message if profile failed to load
  if (!profile) {
    return <Text style={styles.error}>Unable to load profile.</Text>;
  }

  return (
    <ImageBackground
      source={require('../assets/images/scan-fridge.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <TouchableOpacity onPress={handlePickProfileImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../assets/images/default-avatar.png')
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}>{user?.displayName || 'Munchly User'}</Text>

        <Text style={styles.sectionTitle}>🍽️ Food Preferences:</Text>
        {Object.entries(profile.preferences || {}).map(([key, value]) => (
          <Text key={key} style={styles.item}>
            {formatLabel(key)}: {value ? '✅' : '❌'}
          </Text>
        ))}

        {profile.lastFridgeScan && (
          <>
            <Text style={styles.sectionTitle}>📸 Last Fridge Scan:</Text>
            <Text style={styles.item}>{profile.lastFridgeScan}</Text>
          </>
        )}

        <PrimaryButton title="📚 My Recipe Book" onPress={() => setShowRecipeBook(true)} />
        <PrimaryButton title="Back to Menu" onPress={() => router.replace('/menu')} />
      </ScrollView>

      <Modal
        visible={showRecipeBook}
        animationType="slide"
        onRequestClose={() => setShowRecipeBook(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {selectedRecipe ? (
              <View>
                <TouchableOpacity onPress={() => setSelectedRecipe(null)}>
                  <Text style={{ color: '#fff', marginBottom: 10 }}>🔙 Back to list</Text>
                </TouchableOpacity>

                {selectedRecipe.imageUrl && (
                  <Image source={{ uri: selectedRecipe.imageUrl }} style={styles.fullImage} />
                )}

                <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                {Array.isArray(selectedRecipe.ingredients) &&
                  selectedRecipe.ingredients.map((item: any, idx: number) => {
                    if (typeof item === 'string') {
                      return (
                        <Text key={idx} style={styles.item}>
                          • {item}
                        </Text>
                      );
                    } else if (item.name && item.quantity) {
                      return (
                        <Text key={idx} style={styles.item}>
                          • {item.name} - {item.quantity}
                        </Text>
                      );
                    } else {
                      return null;
                    }
                  })}

                <Text style={styles.sectionTitle}>Instructions</Text>
                {Array.isArray(selectedRecipe.instructions) ? (
                  selectedRecipe.instructions.map((step: string, idx: number) => (
                    <Text key={idx} style={styles.item}>
                      {idx + 1}. {step}
                    </Text>
                  ))
                ) : typeof selectedRecipe.instructions === 'string' ? (
                  selectedRecipe.instructions
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
            ) : (
              <>
                <Text style={styles.modalTitle}>📚 My Recipe Book</Text>
                {recipes.length === 0 ? (
                  <Text style={styles.item}>No liked recipes yet.</Text>
                ) : (
                  recipes.map((recipe, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.recipeCard}
                      onPress={() => setSelectedRecipe(recipe)}
                    >
                      {recipe.imageUrl && (
                        <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                      )}
                      <Text style={styles.recipeTitle}>{recipe.title}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </>
            )}

            <PrimaryButton
              title={selectedRecipe ? 'Back to Recipes' : 'Close'}
              onPress={() => {
                if (selectedRecipe) {
                  setSelectedRecipe(null);
                } else {
                  setShowRecipeBook(false);
                }
              }}
            />
          </ScrollView>
        </View>
      </Modal>
    </ImageBackground>
  );
}

// Format preference key to a readable label
function formatLabel(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

// Styles for layout and appearance
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Fredoka_700Bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: '#fff',
  },
  item: {
    fontSize: 16,
    fontFamily: 'Fredoka_400Regular',
    marginBottom: 6,
    alignSelf: 'flex-start',
    color: '#fff',
  },
  error: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#003366',
    paddingTop: 60,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Fredoka_700Bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#fefefe',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 18,
    color: '#003366',
    fontFamily: 'Fredoka_700Bold',
    flexShrink: 1,
  },
  fullImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
});
