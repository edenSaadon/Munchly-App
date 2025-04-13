// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   ImageBackground,
//   Image,
// } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router, useLocalSearchParams } from 'expo-router';

// export default function FridgeItemsScreen() {
//   const params = useLocalSearchParams();

//   const [items, setItems] = useState<string[]>(() => {
//     try {
//       return params.items ? JSON.parse(params.items as string) : [];
//     } catch {
//       return [];
//     }
//   });

//   // תמונה שהתקבלה מהסריקה
//   const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;

//   const handleRemove = (item: string) => {
//     setItems((prev) => prev.filter((i) => i !== item));
//   };

//   const handleAddItem = () => {
//     const newItem = 'Cucumber';
//     if (!items.includes(newItem)) {
//       setItems((prev) => [...prev, newItem]);
//     }
//   };

//   const handleContinue = () => {
//     if (items.length === 0) {
//       Alert.alert('Error', 'Please add at least one item');
//       return;
//     }
//     router.push('/menu');
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>🥬 Your Fridge Items</Text>

//         {/* אם יש תמונה שנשלחה, הצג אותה */}
//         {imageUrl && (
//           <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />
//         )}

//         <FlatList
//           data={items}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.itemRow}>
//               <Text style={styles.itemText}>{item}</Text>
//               <TouchableOpacity onPress={() => handleRemove(item)}>
//                 <Text style={styles.delete}>🗑️</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           style={{ width: '90%' }}
//         />

//         <PrimaryButton title="➕ Add Item" onPress={handleAddItem} />
//         <PrimaryButton title="Continue to Menu" onPress={handleContinue} />
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//   },
//   fridgeImage: {
//     width: 250,
//     height: 250,
//     resizeMode: 'cover',
//     borderRadius: 12,
//     marginBottom: 15,
//   },
//   itemRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   itemText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   delete: {
//     fontSize: 20,
//   },
// });


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import { getAuth, getIdToken } from 'firebase/auth';


export default function FridgeItemsScreen() {
  const params = useLocalSearchParams();

  const [items, setItems] = useState<string[]>(() => {
    try {
      return params.items ? JSON.parse(params.items as string) : [];
    } catch {
      return [];
    }
  });

  // תמונה שהתקבלה מהסריקה
  const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;

  // משתנה שיגיד אם יש למחוק את הסריקה הקודמת
  const clearLastScan = params.clearLastScan === 'true';

  useEffect(() => {
    // אם יש צורך למחוק את הסריקה הקודמת, שולחים בקשה לשרת
    if (clearLastScan) {
      // שליחה לשרת למחוק את הסריקה הקודמת
      fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/fridge/scan?clearLastScan=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clearLastScan: true }),
      })
        .then(response => response.json())
        .then(data => console.log('Last scan cleared:', data))
        .catch(error => console.error('Error clearing last scan:', error));
    }
  }, [clearLastScan]);

  const handleRemove = async (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item)); // מסננים את המוצר מה-RN
  
    try {
      const auth = getAuth(); // קבלת אובייקט auth
      const user = auth.currentUser; // קבלת המשתמש הנוכחי
      if (!user) {
        console.error('❌ No user is signed in');
        return;
      }
  
      const token = await getIdToken(user); // שליפת הטוקן של המשתמש
      if (!token) {
        console.error('❌ No auth token');
        return;
      }
  
      // שליחה לשרת למחוק את המוצר מתוך Firestore
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/fridge/remove-item/${user.uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item }), // שולחים את המוצר למחיקה
      });
  
      const result = await response.json();
      if (!response.ok) {
        Alert.alert('Error', result.message || 'Failed to remove item');
      } else {
        console.log('✅ Product removed from fridge successfully');
      }
    } catch (error) {
      console.error('❌ Error while removing product:', error);
    }
  };
  
  
  

  const handleAddItem = () => {
    const newItem = 'Cucumber';
    if (!items.includes(newItem)) {
      setItems((prev) => [...prev, newItem]);
    }
  };

  const handleContinue = () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Please add at least one item');
      return;
    }
    router.push('/menu');
  };

  const handleGoBack = () => {
    // שליחה לשרת אם צריך למחוק את הסריקה הקודמת
    fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/fridge/scan?clearLastScan=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clearLastScan: true }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Last scan cleared before going back');
        router.back(); // חזרה למסך הקודם
      })
      .catch(error => console.error('Error clearing last scan on back:', error));
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🥬 Your Fridge Items</Text>

        {/* אם יש תמונה שנשלחה, הצג אותה */}
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />
        )}

        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemove(item)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          style={{ width: '90%' }}
        />

        <PrimaryButton title="➕ Add Item" onPress={handleAddItem} />
        <PrimaryButton title="Continue to Menu" onPress={handleContinue} />
        <PrimaryButton title="Go Back" onPress={handleGoBack} />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  fridgeImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  delete: {
    fontSize: 20,
  },
});
