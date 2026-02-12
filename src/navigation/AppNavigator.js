import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Imports
import { AppContext } from '../context/AppContext';
import LoginScreen from '../views/LoginScreen';
import StudentHome from '../views/StudentHome';
import AdminHome from '../views/AdminHome';
const Stack = createNativeStackNavigator();
export default function AppNavigator() {
 const { user } = useContext(AppContext);
 return (
 <NavigationContainer>
 <Stack.Navigator>
 {user == null ? (
 // Se NÃO tem usuário, só mostra Login
 <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
 ) : user.role === 'admin' ? (
 // Se é ADM
 <Stack.Screen name="AdminHome" component={AdminHome} />
 ) : (
 // Se é Aluno (padrão)
 <Stack.Screen name="StudentHome" component={StudentHome} />
 )}
 </Stack.Navigator>
 </NavigationContainer>
 );
}