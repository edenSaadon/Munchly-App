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

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { getIdToken } from '../../src/services/authTokenService'; // ✅

export default function RecipeScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 100 }} />;
  }

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      {recipe.imageUrl ? (
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      ) : null}

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.ingredients?.map((item: string, idx: number) => (
        <Text key={idx} style={styles.item}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions:</Text>
      {recipe.instructions?.map((step: string, idx: number) => (
        <Text key={idx} style={styles.item}>{idx + 1}. {step}</Text>
      ))}

      <PrimaryButton title="Back to Menu" onPress={handleBackToMenu} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
});
