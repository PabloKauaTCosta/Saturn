import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
export default function StudentHome() {
    const { logout } = useContext(AppContext);

 return (
 <View style={styles.container}>
 <Text style={styles.title}>Área do Aluno</Text>
 <Text style={styles.subtitle}>Bem-vindo, Estudante!</Text>
 {/* Botão customizado */}
 <TouchableOpacity
 style={styles.button}
 onPress={() => logout()}
  activeOpacity={0.8}
 >
 <Text style={styles.buttonText}>Sair (Logout)</Text>
 </TouchableOpacity>
 </View>
 );
}
const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#e0f7fa',
 },
 title: {
 fontSize: 24,
 fontWeight: 'bold',
 color: '#006064',
 marginBottom: 8,
 },
 subtitle: {
 fontSize: 16,
 color: '#00838f',
 marginBottom: 30,
 },
 button: {
 backgroundColor: '#0097a7',
 paddingVertical: 12,
 paddingHorizontal: 30,
 borderRadius: 8,
 elevation: 4,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.25,
 shadowRadius: 3.84,
 },
 buttonText: {
 color: '#ffffff',
 fontSize: 16,
 fontWeight: 'bold',
 },
});