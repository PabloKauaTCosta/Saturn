import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function StatCard({ title, value, icon, color }) {
return (
<View style={[styles.card, { borderLeftColor: color }]}>
<View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
<Ionicons name={icon} size={24} color={color} />
</View>
<View>
<Text style={styles.value}>{value}</Text>
<Text style={styles.title}>{title}</Text>
</View>
</View>
);
}
const styles = StyleSheet.create({
card: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: 'white',
width: '48%',
padding: 15,
borderRadius: 12,
marginBottom: 15,
elevation: 3,
borderLeftWidth: 4,
},
iconBox: {
padding: 10,
borderRadius: 50,
marginRight: 10,
},
value: { fontSize: 20, fontWeight: 'bold', color: '#333' },
title: { fontSize: 12, color: '#666' },
});