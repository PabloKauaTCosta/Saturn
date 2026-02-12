import React, { createContext, useState } from 'react';
// 1. Criar o contexto
export const AppContext = createContext();
// 2. Criar o Provedor
export const AppProvider = ({ children }) => {
 const [user, setUser] = useState(null); // null = não logado
 // Função simulada de login
 const login = (tipo) => {
 setUser({ name: 'Usuário Teste', role: tipo });
 };
 const logout = () => {
 setUser(null);
 };
 return (
 <AppContext.Provider value={{ user, login, logout }}>
 {children}
 </AppContext.Provider>
 );
};
