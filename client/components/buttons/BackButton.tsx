// import React from 'react';
// import { TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons'; // ✅ ייבוא אייקון חץ

// export default function BackButton() {
//   const router = useRouter();

//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={() => router.back()} // חזרה לדף הקודם
//     >
//       <Ionicons name="arrow-back" size={30} color="white" /> {/* חץ בצבע לבן */}
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     position: 'absolute', // ממקם את הכפתור באופן מוחלט
//     bottom: 20, // מרחק מהתחתית של המסך
//     left: 20, // מרחק מהצד השמאלי
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 10,
//     borderRadius: 50, // עושה את הכפתור עגול
//   },
// });

// import React from 'react';
// import { TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons'; // ✅ ייבוא אייקון חץ

// export default function BackButton() {
//   const router = useRouter();

//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={() => router.back()} 
//     >
//       <Ionicons name="arrow-back" size={30} color="white" /> 
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     position: 'absolute', // ממקם את הכפתור באופן מוחלט
//     bottom: 20, // מרחק מהתחתית של המסך
//     left: 20, // מרחק מהצד השמאלי
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 10,
//     borderRadius: 50, // עושה את הכפתור עגול
//   },
// });


import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ Icon library for back arrow

export default function BackButton() {
  const router = useRouter(); // 🔁 React Navigation hook from expo-router

  return (
    <TouchableOpacity
      testID="BackButtonTouchable" // ✅ Used only in testing (Jest/RTL), not visible to users
      style={styles.button}
      onPress={() => router.back()} // 🔁 Navigate back when pressed
    >
      <Ionicons name="arrow-back" size={30} color="white" /> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',             // 🔧 Position the button over the screen
    bottom: 20,                       // 📍 Distance from bottom edge
    left: 20,                         // 📍 Distance from left edge
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 🎨 Semi-transparent black background
    padding: 10,                      // 📦 Inner padding
    borderRadius: 50,                // 🟢 Fully rounded button
  },
});
