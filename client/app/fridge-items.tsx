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


// import React, { useState, useEffect } from 'react';
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
// import { getAuth, getIdToken } from 'firebase/auth';


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

//   // משתנה שיגיד אם יש למחוק את הסריקה הקודמת
//   const clearLastScan = params.clearLastScan === 'true';

//   useEffect(() => {
//     // אם יש צורך למחוק את הסריקה הקודמת, שולחים בקשה לשרת
//     if (clearLastScan) {
//       // שליחה לשרת למחוק את הסריקה הקודמת
//       fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/fridge/scan?clearLastScan=true`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ clearLastScan: true }),
//       })
//         .then(response => response.json())
//         .then(data => console.log('Last scan cleared:', data))
//         .catch(error => console.error('Error clearing last scan:', error));
//     }
//   }, [clearLastScan]);

//   const handleRemove = async (item: string) => {
//     setItems((prev) => prev.filter((i) => i !== item)); // מסננים את המוצר מה-RN
  
//     try {
//       const auth = getAuth(); // קבלת אובייקט auth
//       const user = auth.currentUser; // קבלת המשתמש הנוכחי
//       if (!user) {
//         console.error('❌ No user is signed in');
//         return;
//       }
  
//       const token = await getIdToken(user); // שליפת הטוקן של המשתמש
//       if (!token) {
//         console.error('❌ No auth token');
//         return;
//       }
  
//       // שליחה לשרת למחוק את המוצר מתוך Firestore
//       const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/fridge/remove-item/${user.uid}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ item }), // שולחים את המוצר למחיקה
//       });
  
//       const result = await response.json();
//       if (!response.ok) {
//         Alert.alert('Error', result.message || 'Failed to remove item');
//       } else {
//         console.log('✅ Product removed from fridge successfully');
//       }
//     } catch (error) {
//       console.error('❌ Error while removing product:', error);
//     }
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

//   const handleGoBack = () => {
//     // שליחה לשרת אם צריך למחוק את הסריקה הקודמת
//     fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/fridge/scan?clearLastScan=true`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ clearLastScan: true }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Last scan cleared before going back');
//         router.back(); // חזרה למסך הקודם
//       })
//       .catch(error => console.error('Error clearing last scan on back:', error));
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
//         <PrimaryButton title="Go Back" onPress={handleGoBack} />
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
//   Modal,
//   Pressable,
// } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router, useLocalSearchParams } from 'expo-router';
// import { getAuth, getIdToken } from 'firebase/auth';
// import foodItemsData from '../assets/data/food-items.json';

// export default function FridgeItemsScreen() {
//   const params = useLocalSearchParams();

//   const [items, setItems] = useState<string[]>(() => {
//     try {
//       return params.items ? JSON.parse(params.items as string) : [];
//     } catch {
//       return [];
//     }
//   });

//   const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;
//   const clearLastScan = params.clearLastScan === 'true';
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleAddItem = () => {
//     setModalVisible(true);
//   };

//   const handleSelectItem = (item: string) => {
//     if (!items.includes(item)) {
//       setItems((prev) => [...prev, item]);
//     }
//     setModalVisible(false);
//   };

//   const handleContinue = async () => {
//     if (items.length === 0) {
//       Alert.alert('Error', 'Please add at least one item');
//       return;
//     }

//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) {
//         console.error("No user signed in");
//         return;
//       }

//       const token = await getIdToken(user);
//       const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/save-fridge-items`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ items }),
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         Alert.alert('Error', result.message || 'Failed to save items');
//         return;
//       }

//       console.log('✅ Items saved:', items);
//       router.push('/menu');
//     } catch (error) {
//       console.error('❌ Error saving items:', error);
//       Alert.alert('Error', 'Failed to save items');
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>🥬 Your Fridge Items</Text>

//         {imageUrl && (
//           <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />
//         )}

//         <FlatList
//           data={items}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.itemRow}>
//               <Text style={styles.itemText}>{item}</Text>
//             </View>
//           )}
//           style={{ width: '90%' }}
//         />

//         <PrimaryButton title="➕ Add Item" onPress={handleAddItem} />
//         <PrimaryButton title="Continue to Menu" onPress={handleContinue} />

//         <Modal
//   animationType="slide"
//   transparent={true}
//   visible={modalVisible}
//   onRequestClose={() => setModalVisible(false)}
// >
//   <View style={styles.modalContainer}>
//     <View style={styles.modalContent}>
//       <Text style={styles.modalTitle}>Select an item:</Text>
//       <FlatList
//         data={Object.entries(foodItemsData)}
//         keyExtractor={([category]) => category}
//         renderItem={({ item: [category, items] }) => (
//           <View>
//             <Text style={styles.category}>{category}</Text>
//             {items.map((item: string) => (
//               <Pressable key={item} onPress={() => handleSelectItem(item)}>
//                 <Text style={styles.modalItem}>{item}</Text>
//               </Pressable>
//             ))}
//           </View>
//         )}
//       />
//       <PrimaryButton title="Close" onPress={() => setModalVisible(false)} />
//     </View>
//   </View>
// </Modal>

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
//   category: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 10,
//     color: '#555',
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
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 12,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalItem: {
//     fontSize: 18,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });


// import React, { useState } from 'react';
// import {
//   View, Text, StyleSheet, FlatList, TouchableOpacity,
//   Alert, ImageBackground, Image, Modal, Pressable
// } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router, useLocalSearchParams } from 'expo-router';
// import { getAuth, getIdToken } from 'firebase/auth';
// import foodItemsData from '../assets/data/food-items.json';

// export default function FridgeItemsScreen() {
//   const params = useLocalSearchParams();
//   const [items, setItems] = useState<string[]>(() => {
//     try {
//       return params.items ? JSON.parse(params.items as string) : [];
//     } catch {
//       return [];
//     }
//   });

//   const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;
//   const clearLastScan = params.clearLastScan === 'true';
//   const [modalVisible, setModalVisible] = useState(false);

//   const updateServerItems = async (updatedItems: string[]) => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) return;
//       const token = await getIdToken(user);
//       await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/${user.uid}/fridge/save-items`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ items: updatedItems, imageUrl }),
//       });
//     } catch (error) {
//       console.error('🔥 Error updating server items:', error);
//     }
//   };

//   const handleAddItem = () => setModalVisible(true);

//   const handleSelectItem = async (item: string) => {
//     if (!items.includes(item)) {
//       const newItems = [...items, item];
//       setItems(newItems);
//       await updateServerItems(newItems);
//     }
//     setModalVisible(false);
//   };

//   const handleRemoveItem = async (item: string) => {
//     const newItems = items.filter(i => i !== item);
//     setItems(newItems);
//     await updateServerItems(newItems);
//   };

//   const handleContinue = () => {
//     if (items.length === 0) {
//       Alert.alert('Error', 'Please add at least one item');
//       return;
//     }
//     router.push('/menu');
//   };

//   return (
//     <ImageBackground source={require('../assets/images/login-bg.png')} style={styles.background}>
//       <View style={styles.overlay}>
//         <Text style={styles.title}>🥬 Your Fridge Items</Text>
//         {imageUrl && <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />}

//         <FlatList
//           contentContainerStyle={{ paddingBottom: 20 }}
//           data={items}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.itemRow}>
//               <Text style={styles.itemText}>{item}</Text>
//               <TouchableOpacity onPress={() => handleRemoveItem(item)}>
//                 <Text style={styles.delete}>🗑️</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           style={{ width: '90%', marginBottom: 10 }}
//         />

//         <PrimaryButton title="➕ Add Item" onPress={handleAddItem} />
//         <PrimaryButton title="Continue to Menu" onPress={handleContinue} />

//         <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Select an item:</Text>
//               {Object.entries(foodItemsData).map(([category, items]) => (
//                 <View key={category}>
//                   <Text style={styles.modalCategory}>{category}</Text>
//                   {items.map((item: string) => (
//                     <Pressable key={item} onPress={() => handleSelectItem(item)}>
//                       <Text style={styles.modalItem}>{item}</Text>
//                     </Pressable>
//                   ))}
//                 </View>
//               ))}
//               <PrimaryButton title="Close" onPress={() => setModalVisible(false)} />
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   overlay: {
//     flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
//     alignItems: 'center', justifyContent: 'flex-start', padding: 20, paddingTop: 60,
//   },
//   title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
//   fridgeImage: { width: 250, height: 250, resizeMode: 'cover', borderRadius: 12, marginBottom: 15 },
//   itemRow: {
//     flexDirection: 'row', justifyContent: 'space-between',
//     backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10,
//   },
//   itemText: { fontSize: 18, color: '#333' },
//   delete: { fontSize: 20 },
//   modalContainer: {
//     flex: 1, justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 20,
//   },
//   modalContent: {
//     backgroundColor: 'white', padding: 20,
//     borderRadius: 12, maxHeight: '80%',
//   },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
//   modalCategory: { fontWeight: 'bold', marginTop: 10, fontSize: 16 },
//   modalItem: {
//     fontSize: 18, paddingVertical: 10,
//     borderBottomWidth: 1, borderBottomColor: '#ccc',
//   },
// });


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
//   Modal,
//   Pressable,
// } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router, useLocalSearchParams } from 'expo-router';
// import { getAuth, getIdToken } from 'firebase/auth';
// import foodItemsData from '../assets/data/food-items.json';

// export default function FridgeItemsScreen() {
//   const params = useLocalSearchParams();

//   const [items, setItems] = useState<string[]>(() => {
//     try {
//       return params.items ? JSON.parse(params.items as string) : [];
//     } catch {
//       return [];
//     }
//   });

//   const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;
//   const [modalVisible, setModalVisible] = useState(false);

//   const updateServerItems = async (updatedItems: string[]) => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) return;
//       const token = await getIdToken(user);

//       await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/save-fridge-items`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ items: updatedItems, imageUrl }),
//       });
//     } catch (error) {
//       console.error('❌ Error updating server items:', error);
//     }
//   };

//   const handleSelectItem = async (item: string) => {
//     if (!items.includes(item)) {
//       const newItems = [...items, item];
//       setItems(newItems);
//       await updateServerItems(newItems);

//       // שליחה גם ל־fridgeHistory
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;
//         if (user) {
//           const token = await getIdToken(user);
//           await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/${user.uid}/add-item`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ item }),
//           });
//         }
//       } catch (error) {
//         console.error('❌ Error saving manual item to history:', error);
//       }
//     }
//     setModalVisible(false);
//   };

//   const handleRemoveItem = async (item: string) => {
//     const filteredItems = items.filter((i) => i !== item);
//     setItems(filteredItems);
//     await updateServerItems(filteredItems);

//     // מחיקה גם מה־fridgeHistory
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (user) {
//         const token = await getIdToken(user);

//         await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/${user.uid}/fridge/final-snapshot`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ items, imageUrl }),
//         });
        
//         // await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/${user.uid}/remove-item`, {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //     Authorization: `Bearer ${token}`,
//         //   },
//         //   body: JSON.stringify({ item }),
//         // });
//       }
//     } catch (error) {
//       console.error('❌ Error deleting item from fridge history:', error);
//     }
//   };

//   const handleContinue = async () => {
//     if (items.length === 0) {
//       Alert.alert('Error', 'Please add at least one item');
//       return;
//     }

//     try {
//       await updateServerItems(items);
//       console.log('✅ Final items and image saved');
//       router.push('/menu');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to continue to menu');
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/images/login-bg.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>🥬 Your Fridge Items</Text>

//         {imageUrl && (
//           <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />
//         )}

//         <FlatList
//           contentContainerStyle={{ paddingBottom: 20 }}
//           data={items}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.itemRow}>
//               <Text style={styles.itemText}>{item}</Text>
//               <TouchableOpacity onPress={() => handleRemoveItem(item)}>
//                 <Text style={styles.delete}>🗑️</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           style={{ width: '90%', marginBottom: 10 }}
//         />

//         <PrimaryButton title="➕ Add Item" onPress={() => setModalVisible(true)} />
//         <PrimaryButton title="Continue to Menu" onPress={handleContinue} />

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Select an item:</Text>
//               {Object.entries(foodItemsData).map(([category, categoryItems]) => (
//                 <View key={category}>
//                   <Text style={styles.modalCategory}>{category}</Text>
//                   {categoryItems.map((item: string) => (
//                     <Pressable key={item} onPress={() => handleSelectItem(item)}>
//                       <Text style={styles.modalItem}>{item}</Text>
//                     </Pressable>
//                   ))}
//                 </View>
//               ))}
//               <PrimaryButton title="Close" onPress={() => setModalVisible(false)} />
//             </View>
//           </View>
//         </Modal>
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
//     justifyContent: 'flex-start',
//     padding: 20,
//     paddingTop: 60,
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
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 12,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalCategory: {
//     fontWeight: 'bold',
//     marginTop: 10,
//     fontSize: 16,
//   },
//   modalItem: {
//     fontSize: 18,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

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
//   Modal,
//   Pressable,
//   ScrollView,
// } from 'react-native';
// import PrimaryButton from '../components/buttons/PrimaryButton';
// import { router, useLocalSearchParams } from 'expo-router';
// import { getAuth, getIdToken } from 'firebase/auth';
// import foodItemsData from '../assets/data/food-items.json';

// const SERVER_URL = 'https://34c1-2a06-c701-ca9a-4b00-a8ac-16fe-e48f-fc17.ngrok-free.app';

// export default function FridgeItemsScreen() {
//   const params = useLocalSearchParams();

//   const [items, setItems] = useState<string[]>(() => {
//     try {
//       return params.items ? JSON.parse(params.items as string) : [];
//     } catch {
//       return [];
//     }
//   });

//   const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;
//   const [modalVisible, setModalVisible] = useState(false);

//   const updateItemOnServer = async (item: string, action: 'add' | 'remove') => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) return;
//       const token = await getIdToken(user);

//       await fetch(`${SERVER_URL}/users/${user.uid}/${action}-item`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ item }),
//       });
//     } catch (error) {
//       console.error(`❌ Error during ${action} item:`, error);
//     }
//   };

//   const handleSelectItem = async (item: string) => {
//     if (!items.includes(item)) {
//       const newItems = [...items, item];
//       setItems(newItems);
//       await updateItemOnServer(item, 'add');
//     }
//     setModalVisible(false);
//   };

//   const handleRemoveItem = async (item: string) => {
//     const filteredItems = items.filter((i) => i !== item);
//     setItems(filteredItems);
//     await updateItemOnServer(item, 'remove');
//   };

//   const handleContinue = async () => {
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

//         {imageUrl && (
//           <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />
//         )}

//         <FlatList
//           contentContainerStyle={{ paddingBottom: 20 }}
//           data={items}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.itemRow}>
//               <Text style={styles.itemText}>{item}</Text>
//               <TouchableOpacity onPress={() => handleRemoveItem(item)}>
//                 <Text style={styles.delete}>🗑️</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           style={{ width: '90%', marginBottom: 10 }}
//         />

//         <PrimaryButton title="➕ Add Item" onPress={() => setModalVisible(true)} />
//         <PrimaryButton title="Continue to Menu" onPress={handleContinue} />

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <ScrollView contentContainerStyle={styles.modalContent}>
//               <Text style={styles.modalTitle}>Select an item:</Text>
//               {Object.entries(foodItemsData).map(([category, categoryItems]) => (
//                 <View key={category}>
//                   <Text style={styles.modalCategory}>{category}</Text>
//                   {categoryItems.map((item: string) => (
//                     <Pressable key={item} onPress={() => handleSelectItem(item)}>
//                       <Text style={styles.modalItem}>{item}</Text>
//                     </Pressable>
//                   ))}
//                 </View>
//               ))}
//               <PrimaryButton title="Close" onPress={() => setModalVisible(false)} />
//             </ScrollView>
//           </View>
//         </Modal>
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
//     justifyContent: 'flex-start',
//     padding: 20,
//     paddingTop: 60,
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
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 12,
//     minHeight: '40%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalCategory: {
//     fontWeight: 'bold',
//     marginTop: 10,
//     fontSize: 16,
//   },
//   modalItem: {
//     fontSize: 18,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });


// 📁 app/fridge-items.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import { getAuth, getIdToken } from 'firebase/auth';
import foodItemsData from '../assets/data/food-items.json';

const SERVER_URL = 'https://2e16-2a06-c701-ca9a-4b00-a8ac-16fe-e48f-fc17.ngrok-free.app';

export default function FridgeItemsScreen() {
  const params = useLocalSearchParams();

  const [items, setItems] = useState<string[]>(() => {
    try {
      return params.items ? JSON.parse(params.items as string) : [];
    } catch {
      return [];
    }
  });

  const imageUrl = typeof params.imageUrl === 'string' ? params.imageUrl : null;
  const [modalVisible, setModalVisible] = useState(false);

  const updateItemOnServer = async (item: string, action: 'add' | 'remove') => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;
      const token = await getIdToken(user);

      await fetch(`${SERVER_URL}/users/${user.uid}/${action}-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item }),
      });
    } catch (error) {
      console.error(`❌ Error during ${action} item:`, error);
    }
  };

  const handleSelectItem = async (item: string) => {
    if (!items.includes(item)) {
      const newItems = [...items, item];
      setItems(newItems);
      await updateItemOnServer(item, 'add');
    }
    setModalVisible(false);
  };

  const handleRemoveItem = async (item: string) => {
    const filteredItems = items.filter((i) => i !== item);
    setItems(filteredItems);
    await updateItemOnServer(item, 'remove');
  };

  const handleContinue = async () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Please add at least one item');
      return;
    }
    router.push({ pathname: '/recipe-prompt-refiner', params: { items: JSON.stringify(items) } });
  };

  return (
    <ImageBackground
      source={require('../assets/images/login-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🥬 Your Fridge Items</Text>

        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.fridgeImage} />
        )}

        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          style={{ width: '90%', marginBottom: 10 }}
        />

        <PrimaryButton title="➕ Add Item" onPress={() => setModalVisible(true)} />
        <PrimaryButton title="Continue" onPress={handleContinue} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>Select an item:</Text>
              {Object.entries(foodItemsData).map(([category, categoryItems]) => (
                <View key={category}>
                  <Text style={styles.modalCategory}>{category}</Text>
                  {categoryItems.map((item: string) => (
                    <Pressable key={item} onPress={() => handleSelectItem(item)}>
                      <Text style={styles.modalItem}>{item}</Text>
                    </Pressable>
                  ))}
                </View>
              ))}
              <PrimaryButton title="Close" onPress={() => setModalVisible(false)} />
            </ScrollView>
          </View>
        </Modal>
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
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    minHeight: '40%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCategory: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
