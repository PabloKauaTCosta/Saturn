import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
export default function StudentFooter({ onLogout, onChangePassword }) {
return (
<View style={styles.container}>
<TouchableOpacity
onPress={onChangePassword}
style={styles.changePassButton}
>
<Text style={styles.changePassText}>Alterar minha senha</Text>
</TouchableOpacity>
<TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
<Text style={styles.logoutText}>Sair da conta</Text>
</TouchableOpacity>
</View>
);
}
const styles = StyleSheet.create({
container: {
width: '100%',
alignItems: 'center',
marginTop: 10,
borderTopWidth: 1,
borderTopColor: '#e0e0e0',
paddingTop: 20,
},
changePassButton: {
padding: 10,
marginBottom: 10,
},
changePassText: {
color: '#006064',
textDecorationLine: 'underline',
},
logoutButton: {
padding: 10,
backgroundColor: '#ffebee',
borderRadius: 8,
width: '100%',
alignItems: 'center',
},
logoutText: {
color: '#c62828',
fontWeight: 'bold',
},
});