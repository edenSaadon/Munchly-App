// // 📁 app/recipe/[id].tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import PrimaryButton from '../../components/buttons/PrimaryButton';

// export default function RecipeScreen() {
//   const { id } = useLocalSearchParams();
//   const [recipe, setRecipe] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/recipes/${id}`);
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message);
//         setRecipe(data);
//       } catch (error: any) {
//         Alert.alert('Error', error.message || 'Failed to load recipe');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   const handleBackToMenu = () => {
//     // 🧹 Clear temporary data (if stored locally)
//     // לדוגמה: clearFridgeItems(), clearPreferences() וכו'
//     router.replace('/menu');
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}><Text>Loading recipe...</Text></View>
//     );
//   }

//   if (!recipe) {
//     return (
//       <View style={styles.centered}><Text>Recipe not found.</Text></View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>{recipe.title}</Text>
//       {recipe.image && <Image source={{ uri: recipe.image }} style={styles.image} />}

//       <Text style={styles.sectionTitle}>🧂 Ingredients</Text>
//       {recipe.ingredients?.map((item: string, index: number) => (
//         <Text key={index} style={styles.text}>- {item}</Text>
//       ))}

//       <Text style={styles.sectionTitle}>👨‍🍳 Instructions</Text>
//       <Text style={styles.text}>{recipe.instructions}</Text>

//       <PrimaryButton title="Back to Menu" onPress={handleBackToMenu} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   centered: {
//     flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
//   },
//   title: {
//     fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333'
//   },
//   image: {
//     width: '100%', height: 200, borderRadius: 12, marginBottom: 20
//   },
//   sectionTitle: {
//     fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#007AFF'
//   },
//   text: {
//     fontSize: 16, marginBottom: 8, lineHeight: 22, color: '#444'
//   },
// // });

// // 📁 app/recipe/[id].tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import PrimaryButton from '../../components/buttons/PrimaryButton';

// // סוג מתכון מדומה לצורך בדיקה
// const sampleRecipe = {
//   title: 'פסטה ברוטב עגבניות',
//   image: 'https://images.unsplash.com/photo-1603133872878-684f207b69d4',
//   ingredients: [
//     '200 גרם פסטה',
//     '2 עגבניות מרוסקות',
//     'שום כתוש',
//     'שמן זית',
//     'מלח ופלפל'
//   ],
//   instructions: [
//     'לבשל את הפסטה לפי ההוראות על האריזה.',
//     'לטגן את השום עם שמן זית.',
//     'להוסיף את העגבניות ולבשל 10 דקות.',
//     'לערבב עם הפסטה ולתבל.'
//   ]
// };

// export default function RecipeScreen() {
//   const { id } = useLocalSearchParams();
//   const [recipe, setRecipe] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // כאן אפשר לשלוף מהשרת או מ־Firestore
//     // כרגע נטען מתכון מדומה
//     setTimeout(() => {
//       setRecipe(sampleRecipe);
//       setLoading(false);
//     }, 1000);
//   }, [id]);

//   const handleBackToMenu = () => {
//     // כאן נוכל גם לנקות state גלובלי אם צריך
//     router.replace('/menu');
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 100 }} />;
//   }

//   if (!recipe) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Recipe not found</Text>
//       </View>
//     );
//   }
  

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>{recipe.title}</Text>
//       {recipe.image && <Image source={{ uri: recipe.image }} style={styles.image} />}

//       <Text style={styles.sectionTitle}>Ingredients:</Text>
//       {recipe.ingredients.map((item: string, idx: number) => (
//         <Text key={idx} style={styles.item}>• {item}</Text>
//       ))}

//       <Text style={styles.sectionTitle}>Instructions:</Text>
//       {recipe.instructions.map((step: string, idx: number) => (
//         <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
//       ))}

//       <PrimaryButton title="Back to Menu" onPress={handleBackToMenu} />
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
//     marginBottom: 15,
//     textAlign: 'center'
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
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   error: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//   }
// });

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import PrimaryButton from '../../components/buttons/PrimaryButton';
// import { getIdToken } from '../../src/services/authTokenService'; // ✅

// export default function RecipeScreen() {
//   const { id } = useLocalSearchParams();
//   const [recipe, setRecipe] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

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

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 100 }} />;
//   }

//   if (!recipe) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Recipe not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>{recipe.title}</Text>
//       {recipe.imageUrl ? (
//         <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
//       ) : null}

//       <Text style={styles.sectionTitle}>Ingredients:</Text>
//       {recipe.ingredients?.map((item: string, idx: number) => (
//         <Text key={idx} style={styles.item}>• {item}</Text>
//       ))}

//       <Text style={styles.sectionTitle}>Instructions:</Text>
//       {recipe.instructions?.map((step: string, idx: number) => (
//         <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
//       ))}

//       <PrimaryButton title="Back to Menu" onPress={handleBackToMenu} />
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
//     marginBottom: 15,
//     textAlign: 'center',
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
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   error: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//   },
// });

// // 📁 app/recipe/[id].tsx
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import PrimaryButton from '../../components/buttons/PrimaryButton';
// import { getIdToken } from '../../src/services/authTokenService';

// export default function RecipeScreen() {
//   const { id } = useLocalSearchParams();
//   const [recipe, setRecipe] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

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

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 100 }} />;
//   }

//   if (!recipe) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Recipe not found</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>{recipe.title || 'Untitled Recipe'}</Text>

//       {recipe.imageUrl ? (
//         <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
//       ) : null}

//       {recipe.ingredients && recipe.ingredients.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>Ingredients:</Text>
//           {recipe.ingredients.map((item: string, idx: number) => (
//             <Text key={idx} style={styles.item}>• {item}</Text>
//           ))}
//         </>
//       )}

//       {recipe.instructions && recipe.instructions.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>Instructions:</Text>
//           {recipe.instructions.map((step: string, idx: number) => (
//             <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
//           ))}
//         </>
//       )}

//       <PrimaryButton title="Back to Menu" onPress={handleBackToMenu} />
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
//     marginBottom: 15,
//     textAlign: 'center',
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
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   error: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'red',
//   },
// });


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
// } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import { getIdToken } from '../../src/services/authTokenService';
// import { useFonts, Fredoka_400Regular, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

// export default function RecipeScreen() {
//   const { id } = useLocalSearchParams();
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

//   if (!fontsLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading fonts...</Text>
//       </View>
//     );
//   }

//   if (loading) {
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
//       <Text style={styles.title}>{recipe.title || 'Untitled Recipe'}</Text>

//       {recipe.imageUrl ? (
//         <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
//       ) : null}

//       {recipe.ingredients && recipe.ingredients.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>Ingredients</Text>
//           {recipe.ingredients.map((item: string, idx: number) => (
//             <Text key={idx} style={styles.item}>• {item}</Text>
//           ))}
//         </>
//       )}

//       {recipe.instructions && recipe.instructions.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>Instructions</Text>
//           {recipe.instructions.map((step: string, idx: number) => (
//             <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
//           ))}
//         </>
//       )}

//       <TouchableOpacity style={styles.button} onPress={handleBackToMenu}>
//         <Text style={styles.buttonText}>Back to Menu</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingTop: 5,
//     paddingBottom: 40,
//     backgroundColor: '#003366',
//     flexGrow: 1,
//     alignItems: 'stretch',
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
//   title: {
//     fontSize: 28,
//     color: '#fff',
//     fontFamily: 'Fredoka_700Bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     color: '#f5f5dc',
//     fontFamily: 'Fredoka_700Bold',
//     marginTop: 12,
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   item: {
//     fontSize: 16,
//     color: '#f5f5dc',
//     fontFamily: 'Fredoka_400Regular',
//     marginBottom: 6,
//     paddingHorizontal: 10,
//   },
//   button: {
//     marginTop: 30,
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
// });

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
//   const { id } = useLocalSearchParams();
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
//     const message = `🍽️ ${recipe.title}\n\nIngredients:\n- ${recipe.ingredients.join(
//       '\n- '
//     )}\n\nInstructions:\n${recipe.instructions
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
//       <View style={styles.headerRow}>
//         <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
//         <Text style={styles.title}>{recipe.title || 'Untitled Recipe'}</Text>
//       </View>

//       {recipe.imageUrl ? (
//         <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
//       ) : null}

//       {recipe.ingredients && recipe.ingredients.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>Ingredients</Text>
//           {recipe.ingredients.map((item: string, idx: number) => (
//             <Text key={idx} style={styles.item}>• {item}</Text>
//           ))}
//         </>
//       )}

//       {recipe.instructions && recipe.instructions.length > 0 && (
//         <>
//           <Text style={styles.sectionTitle}>Instructions</Text>
//           {recipe.instructions.map((step: string, idx: number) => (
//             <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
//           ))}
//         </>
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
//     paddingHorizontal: 20,
//     paddingTop: 5,
//     paddingBottom: 40,
//     backgroundColor: '#003366',
//     flexGrow: 1,
//     alignItems: 'stretch',
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
//     color: '#fff',
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
//     color: '#f5f5dc',
//     fontFamily: 'Fredoka_700Bold',
//     marginTop: 12,
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   item: {
//     fontSize: 16,
//     color: '#f5f5dc',
//     fontFamily: 'Fredoka_400Regular',
//     marginBottom: 6,
//     paddingHorizontal: 10,
//   },
//   button: {
//     marginTop: 30,
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
// });


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
//   const { id } = useLocalSearchParams();
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
//     const message = `🍽️ ${recipe.title}\n\nIngredients:\n- ${recipe.ingredients.join(
//       '\n- '
//     )}\n\nInstructions:\n${recipe.instructions
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
//               <Text key={idx} style={styles.item}>\u2022 {item}</Text>
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
//   const { id } = useLocalSearchParams();
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

      
//       <TouchableOpacity style={styles.button} onPress={() => router.back()}>
//   <Text style={styles.buttonText}>Close</Text>
// </TouchableOpacity>

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


// ✅ Updated RecipeScreen.tsx
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
import PrimaryButton from 'components/buttons/PrimaryButton';

export default function RecipeScreen() {
  const { id, source } = useLocalSearchParams(); // 🟢 הוספנו source
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setRecipe(data);
      } catch (error: any) {
        console.error('❌ Error fetching recipe:', error);
        Alert.alert('Error', error.message || 'Failed to load recipe');
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
