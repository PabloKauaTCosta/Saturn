import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function ScanButton({ onPress }) {
return (
<TouchableOpacity
style={styles.button}
onPress={onPress}
activeOpacity={0.7}
>
<Ionicons name='qr-code-outline' size={32} color='#fff' />
</TouchableOpacity>
);
}
const styles = StyleSheet.create({
button: {
position: 'absolute',
bottom: 30,
right: 30,
width: 65,
height: 65,
borderRadius: 35,
backgroundColor: '#d32f2f',
justifyContent: 'center',
alignItems: 'center',
// Android
elevation: 8,
// iOS
shadowColor: '#000',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.3,
shadowRadius: 4,
zIndex: 10,
},
});