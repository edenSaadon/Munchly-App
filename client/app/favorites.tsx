// // 📁 app/favorites.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
// import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
// import { router } from 'expo-router';

// // 🔁 מתכונים לדוגמה - בהמשך תוחלף בקריאה ל־Firestore לפי המשתמש
// const mockFavorites = [
//   {
//     id: '1',
//     title: 'שקשוקה חריפה',
//     image: 'https://images.unsplash.com/photo-1589308078055-ebf9a9c36c96',
//   },
//   {
//     id: '2',
//     title: 'פסטה טבעונית',
//     image: 'https://images.unsplash.com/photo-1603133872878-684f207b69d4',
//   },
// ];

// export default function FavoritesScreen() {
//   const { user } = useAuthViewModel();
//   const [favorites, setFavorites] = useState(mockFavorites);

//   useEffect(() => {
//     // 📥 כאן תבוא קריאה ל־Firestore להוריד את המתכונים שהמשתמש אהב
//   }, [user]);

//   const renderItem = ({ item }: any) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => router.push(`/recipe/${item.id}`)}
//     >
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.screenTitle}>❤️ Favorite Recipes</Text>
//       <FlatList
//         data={favorites}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, padding: 20, backgroundColor: '#fff',
//   },
//   screenTitle: {
//     fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center',
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   card: {
//     marginBottom: 20, borderRadius: 10, overflow: 'hidden', backgroundColor: '#f8f8f8', elevation: 2,
//   },
//   image: {
//     width: '100%', height: 180,
//   },
//   title: {
//     fontSize: 18, fontWeight: '600', padding: 10,
//   },
// });

// 📁 app/favorites.tsx

/**
 * FavoritesScreen – Displays the user's favorite recipes.
 *
 * Purpose:
 * This screen shows a list of recipes that the user has liked or saved.
 * Currently, it uses hardcoded mock data. In the future, it should retrieve the
 * liked recipes from Firestore based on the authenticated user.
 *
 * Instructions:
 * - Replace the mock data with Firestore query logic.
 * - Fetch the user's `likedRecipes` (array of recipe IDs).
 * - Retrieve recipe details from the `recipes` collection.
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useAuthViewModel } from '@/viewModels/useAuthViewModel';
import { router } from 'expo-router';

// Temporary mock data. To be replaced with real Firestore data.
const mockFavorites = [
  {
    id: '1',
    title: 'Spicy Shakshuka',
    image: 'https://images.unsplash.com/photo-1589308078055-ebf9a9c36c96',
  },
  {
    id: '2',
    title: 'Vegan Pasta',
    image: 'https://images.unsplash.com/photo-1603133872878-684f207b69d4',
  },
];

export default function FavoritesScreen() {
  const { user } = useAuthViewModel(); // Get current user info
  const [favorites, setFavorites] = useState(mockFavorites); // Initial favorites

  useEffect(() => {
    // In a future version:
    // 1. Get the user's likedRecipes array from Firestore.
    // 2. Fetch the full recipe documents using those IDs.
    // 3. setFavorites(dataFromFirestore);
  }, [user]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/recipe/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Favorite Recipes</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  },
});
