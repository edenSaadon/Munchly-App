// // ✅ Updated RecipeScreen.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   TouchableOpacity,
//   Share,
// } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import { getIdToken } from '../../src/services/authTokenService';
// import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
// import PrimaryButton from 'components/buttons/PrimaryButton';

// export default function RecipeScreen() {
//   const { id, source } = useLocalSearchParams(); // 🟢 הוספנו source
//   const [recipe, setRecipe] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [fontsLoaded] = useFonts({
//     Fredoka_400Regular,
//     Fredoka_700Bold,
//   });

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const token = await getIdToken();
//         const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);
//         setRecipe(data);
//       } catch (error: any) {
//         console.error('❌ Error fetching recipe:', error);
//         Alert.alert('Error', error.message || 'Failed to load recipe');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchRecipe();
//   }, [id]);

//   const handleBackToMenu = () => {
//     router.replace('/menu');
//   };

//   const handleShare = async () => {
//     if (!recipe) return;
//     const message = `🍽️ ${recipe.title}\n\nIngredients:\n${recipe.ingredients
//       .map((item: string) => `• ${item.replace(/\\u2022/g, '').trim()}`)
//       .join('\n')}\n\nInstructions:\n${recipe.instructions
//       .map((step: string, i: number) => `${i + 1}. ${step}`)
//       .join('\n')}`;

//     try {
//       await Share.share({ message });
//     } catch (error: any) {
//       Alert.alert('Error', error.message || 'Failed to share recipe');
//     }
//   };

//   if (!fontsLoaded || loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={styles.loadingText}>Loading recipe...</Text>
//       </View>
//     );
//   }

//   if (!recipe) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Recipe not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.recipeCard}>
//         <View style={styles.headerRow}>
//           <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
//           <Text style={styles.title}>{recipe.title || 'Untitled Recipe'}</Text>
//         </View>

//         {recipe.imageUrl ? (
//           <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
//         ) : null}

//         {recipe.ingredients && recipe.ingredients.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>Ingredients</Text>
//             {recipe.ingredients.map((item: string, idx: number) => (
//               <Text key={idx} style={styles.item}>• {item.replace(/\\u2022/g, '').trim()}</Text>
//             ))}
//           </>
//         )}

//         {recipe.instructions && recipe.instructions.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>Instructions</Text>
//             {recipe.instructions.map((step: string, idx: number) => (
//               <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
//             ))}
//           </>
//         )}
//       </View>

//       <Text style={styles.signature}>Generated with ❤️ by Munchly</Text>

//       {source === 'collection' && (
//         <TouchableOpacity style={styles.button} onPress={() => router.back()}>
//           <Text style={styles.buttonText}>Close</Text>
//         </TouchableOpacity>
//       )}

//       <TouchableOpacity style={styles.button} onPress={handleBackToMenu}>
//         <Text style={styles.buttonText}>Back to Menu</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
//         <Text style={styles.shareButtonText}>📤 Share Recipe</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#003366',
//     flexGrow: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#003366',
//     padding: 20,
//   },
//   loadingText: {
//     color: '#fff',
//     fontSize: 18,
//     fontFamily: 'Fredoka_400Regular',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   recipeCard: {
//     backgroundColor: '#fefefe',
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 10,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 24,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//     flexShrink: 1,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//     marginTop: 12,
//     marginBottom: 8,
//     textAlign: 'left',
//   },
//   item: {
//     fontSize: 16,
//     color: '#333',
//     fontFamily: 'Fredoka_400Regular',
//     marginBottom: 6,
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 25,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//   },
//   shareButton: {
//     marginTop: 15,
//     backgroundColor: '#f5f5dc',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     alignSelf: 'center',
//   },
//   shareButtonText: {
//     fontSize: 16,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//   },
//   signature: {
//     fontSize: 14,
//     color: '#f5f5dc',
//     fontFamily: 'Fredoka_400Regular',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// // This screen displays a single recipe generated by Gemini AI.
// // It fetches the recipe by ID from the backend using a protected route.
// // It shows the title, image, ingredients, instructions, and allows sharing or returning to the menu.

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   TouchableOpacity,
//   Share,
// } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import { getIdToken } from '../../src/services/authTokenService';
// import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
// import PrimaryButton from 'components/buttons/PrimaryButton';

// export default function RecipeScreen() {
//   // Get recipe ID and source (e.g., 'collection' or default) from route params
//   const { id, source } = useLocalSearchParams();

//   // State for the recipe object and loading indicator
//   const [recipe, setRecipe] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Load fonts before rendering
//   const [fontsLoaded] = useFonts({
//     Fredoka_400Regular,
//     Fredoka_700Bold,
//   });

//   // Fetch the recipe from the backend using the ID and user token
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const token = await getIdToken(); // Get Firebase ID token
//         const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);
//         setRecipe(data); // Save the recipe to state
//       } catch (error: any) {
//         console.error('❌ Error fetching recipe:', error);
//         Alert.alert('Error', error.message || 'Failed to load recipe');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchRecipe();
//   }, [id]);

//   // Navigate back to the main menu
//   const handleBackToMenu = () => {
//     router.replace('/menu');
//   };

//   // Share the recipe as text using the Share API
//   const handleShare = async () => {
//     if (!recipe) return;
//     const message = `🍽️ ${recipe.title}\n\nIngredients:\n${recipe.ingredients
//       .map((item: string) => `• ${item.replace(/\\u2022/g, '').trim()}`)
//       .join('\n')}\n\nInstructions:\n${recipe.instructions
//       .map((step: string, i: number) => `${i + 1}. ${step}`)
//       .join('\n')}`;

//     try {
//       await Share.share({ message });
//     } catch (error: any) {
//       Alert.alert('Error', error.message || 'Failed to share recipe');
//     }
//   };

//   // Show loading screen while fonts or recipe are loading
//   if (!fontsLoaded || loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={styles.loadingText}>Loading recipe...</Text>
//       </View>
//     );
//   }

//   // Show fallback UI if recipe not found
//   if (!recipe) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Recipe not found</Text>
//       </View>
//     );
//   }

//   // Render the recipe content
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.recipeCard}>
//         {/* Recipe header: logo + title */}
//         <View style={styles.headerRow}>
//           <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
//           <Text style={styles.title}>{recipe.title || 'Untitled Recipe'}</Text>
//         </View>

//         {/* Recipe image */}
//         {recipe.imageUrl ? (
//           <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
//         ) : null}

//         {/* Ingredients list */}
//         {recipe.ingredients && recipe.ingredients.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>Ingredients</Text>
//             {recipe.ingredients.map((item: string, idx: number) => (
//               <Text key={idx} style={styles.item}>• {item.replace(/\\u2022/g, '').trim()}</Text>
//             ))}
//           </>
//         )}

//         {/* Instructions list */}
//         {recipe.instructions && recipe.instructions.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>Instructions</Text>
//             {recipe.instructions.map((step: string, idx: number) => (
//               <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
//             ))}
//           </>
//         )}
//       </View>

//       {/* Footer text */}
//       <Text style={styles.signature}>Generated with love by Munchly</Text>

//       {/* Conditional close button if accessed from 'collection' screen */}
//       {source === 'collection' && (
//         <TouchableOpacity style={styles.button} onPress={() => router.back()}>
//           <Text style={styles.buttonText}>Close</Text>
//         </TouchableOpacity>
//       )}

//       {/* Button to return to menu */}
//       <TouchableOpacity style={styles.button} onPress={handleBackToMenu}>
//         <Text style={styles.buttonText}>Back to Menu</Text>
//       </TouchableOpacity>

//       {/* Button to share the recipe */}
//       <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
//         <Text style={styles.shareButtonText}>Share Recipe</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // --- Styles for the recipe screen ---
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#003366',
//     flexGrow: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#003366',
//     padding: 20,
//   },
//   loadingText: {
//     color: '#fff',
//     fontSize: 18,
//     fontFamily: 'Fredoka_400Regular',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   recipeCard: {
//     backgroundColor: '#fefefe',
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 10,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 24,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//     flexShrink: 1,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//     marginTop: 12,
//     marginBottom: 8,
//     textAlign: 'left',
//   },
//   item: {
//     fontSize: 16,
//     color: '#333',
//     fontFamily: 'Fredoka_400Regular',
//     marginBottom: 6,
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 25,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//   },
//   shareButton: {
//     marginTop: 15,
//     backgroundColor: '#f5f5dc',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     alignSelf: 'center',
//   },
//   shareButtonText: {
//     fontSize: 16,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//   },
//   signature: {
//     fontSize: 14,
//     color: '#f5f5dc',
//     fontFamily: 'Fredoka_400Regular',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// // 📁 app/recipes/[id].tsx
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   TouchableOpacity,
//   Share,
// } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import { getIdToken } from '../../src/services/authTokenService';
// import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

// export default function RecipeScreen() {
//   const { id, source } = useLocalSearchParams();
//   const [recipe, setRecipe] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [fontsLoaded] = useFonts({
//     Fredoka_400Regular,
//     Fredoka_700Bold,
//   });

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const token = await getIdToken();
//         const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);
//         setRecipe(data);
//       } catch (error: any) {
//         console.error('❌ Error fetching recipe:', error);
//         Alert.alert('Error', error.message || 'Failed to load recipe');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchRecipe();
//   }, [id]);

//   const handleBackToMenu = () => {
//     router.replace('/menu');
//   };

//   const handleShare = async () => {
//     if (!recipe) return;
//     const message = `🍽️ ${recipe.title}\n\nIngredients:\n${recipe.ingredients
//       .map((item: string) => `• ${item.replace(/\\u2022/g, '').trim()}`)
//       .join('\n')}\n\nInstructions:\n${recipe.instructions
//       .map((step: string, i: number) => `${i + 1}. ${step}`)
//       .join('\n')}`;

//     try {
//       await Share.share({ message });
//     } catch (error: any) {
//       Alert.alert('Error', error.message || 'Failed to share recipe');
//     }
//   };

//   if (!fontsLoaded || loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={styles.loadingText}>Loading recipe...</Text>
//       </View>
//     );
//   }

//   if (!recipe) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Recipe not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.recipeCard}>
//         <View style={styles.headerRow}>
//           <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
//           <Text style={styles.title}>{recipe.title || 'Untitled Recipe'}</Text>
//         </View>

//         {recipe.imageUrl ? (
//           <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
//         ) : null}

//         {recipe.ingredients && recipe.ingredients.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>Ingredients</Text>
//             {recipe.ingredients.map((item: string, idx: number) => (
//               <Text key={idx} style={styles.item}>• {item.replace(/\\u2022/g, '').trim()}</Text>
//             ))}
//           </>
//         )}

//         {recipe.instructions && recipe.instructions.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>Instructions</Text>
//             {recipe.instructions.map((step: string, idx: number) => (
//               <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
//             ))}
//           </>
//         )}
//       </View>

//       {/* ✅ Updated design: Signature with heart */}
//       <Text style={styles.signature}>Generated with ❤️ by Munchly</Text>

//       {source === 'collection' && (
//         <TouchableOpacity style={styles.button} onPress={() => router.back()}>
//           <Text style={styles.buttonText}>Close</Text>
//         </TouchableOpacity>
//       )}

//       <TouchableOpacity style={styles.button} onPress={handleBackToMenu}>
//         <Text style={styles.buttonText}>Back to Menu</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
//         <Text style={styles.shareButtonText}>📤 Share Recipe</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#003366',
//     flexGrow: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#003366',
//     padding: 20,
//   },
//   loadingText: {
//     color: '#fff',
//     fontSize: 18,
//     fontFamily: 'Fredoka_400Regular',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   recipeCard: {
//     backgroundColor: '#fefefe',
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 10,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 24,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//     flexShrink: 1,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//     marginTop: 12,
//     marginBottom: 8,
//     textAlign: 'left',
//   },
//   item: {
//     fontSize: 16,
//     color: '#333',
//     fontFamily: 'Fredoka_400Regular',
//     marginBottom: 6,
//   },
//   button: {
//     marginTop: 10,
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 25,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//   },
//   shareButton: {
//     marginTop: 15,
//     backgroundColor: '#f5f5dc',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     alignSelf: 'center',
//   },
//   shareButtonText: {
//     fontSize: 16,
//     color: '#003366',
//     fontFamily: 'Fredoka_700Bold',
//   },
//   signature: {
//     fontSize: 14,
//     color: '#f5f5dc',
//     fontFamily: 'Fredoka_400Regular',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// ============================================
// File: app/recipes/[id].tsx
//
// Purpose:
// This screen displays a single recipe (usually AI-generated or stored via user interaction)
// by fetching it from the backend based on a dynamic route ID.
//
// Key Features:
// - Retrieves the recipe ID (and optional source) from the route
// - Uses Firebase token for secure fetch
// - Supports custom fonts (Fredoka)
// - Renders loading states, recipe content, and error fallback
// - Includes buttons to navigate, close, and share the recipe
// ============================================

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getIdToken } from '../../src/services/authTokenService';
import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

export default function RecipeScreen() {
  // Get recipe ID and source from route params
  const { id, source } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load fonts before showing UI
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_700Bold,
  });

  // Fetch recipe from server once component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = await getIdToken(); // get secure token
        const res = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setRecipe(data); // update recipe state
      } catch (error: any) {
        console.error('❌ Error fetching recipe:', error);
        Alert.alert('Error', error.message || 'Failed to load recipe');
      } finally {
        setLoading(false); // stop loading either way
      }
    };

    if (id) fetchRecipe(); // trigger fetch if ID exists
  }, [id]);

  // Replace current route with menu screen
  const handleBackToMenu = () => {
    router.replace('/menu');
  };

  // Share the recipe using device's share sheet
  const handleShare = async () => {
    if (!recipe) return;
    const message = `🍽️ ${recipe.title}\n\nIngredients:\n${recipe.ingredients
      .map((item: string) => `• ${item.replace(/\\u2022/g, '').trim()}`)
      .join('\n')}\n\nInstructions:\n${recipe.instructions
      .map((step: string, i: number) => `${i + 1}. ${step}`)
      .join('\n')}`;

    try {
      await Share.share({ message });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to share recipe');
    }
  };

  // While fonts or data are loading
  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  // If recipe not found after fetch
  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Recipe not found</Text>
      </View>
    );
  }

  // Main UI rendering
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.recipeCard}>
        <View style={styles.headerRow}>
          <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.title}>{recipe.title || 'Untitled Recipe'}</Text>
        </View>

        {recipe.imageUrl ? (
          <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
        ) : null}

        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((item: string, idx: number) => (
              <Text key={idx} style={styles.item}>• {item.replace(/\\u2022/g, '').trim()}</Text>
            ))}
          </>
        )}

        {recipe.instructions && recipe.instructions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.instructions.map((step: string, idx: number) => (
              <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
            ))}
          </>
        )}
      </View>

      <Text style={styles.signature}>Generated with ❤️ by Munchly</Text>

      {source === 'collection' && (
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleBackToMenu}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>📤 Share Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styling used throughout the screen
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
