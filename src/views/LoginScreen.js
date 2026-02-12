import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
export default function LoginScreen() {
 const { login } = useContext(AppContext);
 return (
 <View style={styles.container}>
 <Text style={styles.title}>Tela de Login</Text>
 {/* Botão de Aluno */}
 <TouchableOpacity
 style={[styles.button, styles.btnStudent]}
 onPress={() => login('student')}
 activeOpacity={0.7}
 >
 <Text style={styles.buttonText}>Entrar como Aluno</Text>
 </TouchableOpacity>
 <View style={styles.spacer} />
 {/* Botão de Admin */}
 <TouchableOpacity
 style={[styles.button, styles.btnAdmin]}
 onPress={() => login('admin')}
 activeOpacity={0.7}
 >
 <Text style={styles.buttonText}>Entrar como ADM</Text>
 </TouchableOpacity>
 </View>
 );
}
const styles = StyleSheet.create({
 container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#fff',
 },
 title: {
 fontSize: 24,
 marginBottom: 40,
 fontWeight: 'bold',
 color: '#333',
 },
 spacer: {
 margin: 10,
 },
 button: {
 width: '80%',
 paddingVertical: 15,
 borderRadius: 8,
 alignItems: 'center',
 elevation: 3,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.2,
 shadowRadius: 2,
 },
 // Cor específica do Aluno
 btnStudent: {
 backgroundColor: '#2196F3',
 },
 // Cor específica do Admin
 btnAdmin: {
 backgroundColor: '#d32f2f', // Vermelho alerta
 },
 buttonText: {
 color: '#fff',
 fontSize: 16,
 fontWeight: 'bold',
 textTransform: 'uppercase',
 },
});
