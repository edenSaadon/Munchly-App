// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import { getIdToken } from '../../src/services/authTokenService';

// export default function RecipeDbScreen() {
//   const { id } = useLocalSearchParams();
//   const [recipe, setRecipe] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const token = await getIdToken();
//         const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);
//         setRecipe(data);
//       } catch (err) {
//         console.error('Error loading DB recipe:', err);
//         Alert.alert('Error', 'Failed to load recipe');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchRecipe();
//   }, [id]);

//   if (loading) return <ActivityIndicator style={{ marginTop: 100 }} />;

//   if (!recipe) return <Text style={styles.error}>Recipe not found</Text>;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>{recipe.title}</Text>
//       {recipe.imageUrl && (
//         <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
//       )}

//       <Text style={styles.sectionTitle}>Ingredients:</Text>
//       {Array.isArray(recipe.ingredients) && recipe.ingredients.map((item: any, idx: number) => (
//         <Text key={idx} style={styles.item}>• {item.name} - {item.quantity}</Text>
//       ))}

//       <Text style={styles.sectionTitle}>Instructions:</Text>
//       {typeof recipe.instructions === 'string'
//         ? recipe.instructions.split('.').map((line: string, idx: number) =>
//             line.trim() ? <Text key={idx} style={styles.item}>{line.trim()}.</Text> : null
//           )
//         : <Text style={styles.item}>No instructions provided.</Text>
//       }
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginVertical: 10,
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 6,
//   },
//   error: {
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 100,
//   },
// });


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
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = await getIdToken();
        const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setRecipe(data);
      } catch (err: any) {
        console.error('Error loading DB recipe:', err);
        Alert.alert('Error', err.message || 'Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  const handleBackToMenu = () => {
    router.replace('/menu');
  };

  const handleShare = async () => {
    if (!recipe) return;

    const ingredientsText = Array.isArray(recipe.ingredients)
      ? recipe.ingredients
          .map((item: any) => `• ${item.name} - ${item.quantity}`)
          .join('\n')
      : 'No ingredients listed.';

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

    const message = `🍽️ ${recipe.title}\n\nIngredients:\n${ingredientsText}\n\nInstructions:\n${instructionsText}`;

    try {
      await Share.share({ message });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to share recipe');
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.recipeCard}>
        <View style={styles.headerRow}>
          <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.title}>{recipe.title}</Text>
        </View>

        {recipe.imageUrl && (
          <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
        )}

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

      <Text style={styles.signature}>Stored with 🧡 in your Munchly DB</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
  <Text style={styles.buttonText}>Close</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleBackToMenu}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>📤 Share Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
