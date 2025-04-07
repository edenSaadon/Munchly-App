import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean; // ✅ נוספה תמיכה ב־disabled
};

export default function PrimaryButton({ title, onPress, disabled = false }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]} // ✅ אם הכפתור מנוטרל – שונה עיצוב
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#AAB2BD', // ✅ אפור למצב מנוטרל
  },
  textDisabled: {
    color: '#f2f2f2',
  },
});
