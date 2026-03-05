import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
export default function PurchaseLoading({ message = 'Processando...' }) {
return (
<View style={styles.container}>
<ActivityIndicator size='large' color='#006064' />
<Text style={styles.text}>{message}</Text>
</View>
);
}
const styles = StyleSheet.create({
container: {
marginTop: 20,
alignItems: 'center',
},
text: {
marginTop: 10,
color: '#006064',
fontSize: 14,
},
});