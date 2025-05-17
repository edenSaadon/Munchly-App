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

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ייבוא אייקון חץ

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.back()} 
    >
      <Ionicons name="arrow-back" size={30} color="white" /> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute', // ממקם את הכפתור באופן מוחלט
    bottom: 20, // מרחק מהתחתית של המסך
    left: 20, // מרחק מהצד השמאלי
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 50, // עושה את הכפתור עגול
  },
});
