import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest } from '../services/api';
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
// ESTADO 1: USER (Memória RAM)
// Guarda os dados do usuário enquanto o App está aberto. Se fechar, perde.
const [user, setUser] = useState(null);
// ESTADO 2: LOADING GLOBAL (Controle de Interface)
// Começa como 'true' para segurar a tela de Splash enquanto checamos o armazenamento.
const [loadingGlobal, setLoadingGlobal] = useState(true);
// =================================================================
// 1. PERSISTÊNCIA DE DADOS (Auto-Login)
// =================================================================
// Este useEffect roda apenas UMA vez, assim que o App abre.
// Objetivo: Verificar se o usuário já fez login anteriormente.
useEffect(() => {
async function loadStorageData() {
try {
// Busca no "HD" do celular se existe um usuário salvo
const storadUser = await AsyncStorage.getItem('@ticket:user');
if (storadUser) {
// Se achou, converte de Texto (JSON) para Objeto JavaScript
// e joga para o Estado (RAM), logando o usuário automaticamente.
setUser(JSON.parse(storadUser));
}
} catch (error) {
console.log('Erro ao recuperar dados do storage:', error);
} finally {
// INDEPENDENTE de achar o usuário ou dar erro,
// avisamos o App que o carregamento terminou para liberar a tela.
setLoadingGlobal(false);
}
}
loadStorageData();
}, []);
// Restante do código continua o mesmo=================================================================
// 2. FUNÇÃO DE LOGIN (Com Blindagem de Erro)
// =================================================================
const login = async (email, password) => {
try {
// PASSO A: Vai até o servidor (Backend) verificar email/senha
const response = await loginRequest(email, password);
// PASsO B: A BLINDAGEM (Segurança contra Crash)
// Se a API retornar 'null' (usuário não encontrado ou erro),
// nós paramos a função IMEDIATAMENTE.
// Isso evita que o App tente ler dados de um usuário que não existe.
if (!response) {
return false; // Retorna 'false' para a Tela de Login mostrar o Alerta
}
// PASSO C: SUCESSO!
// Se passou pela blindagem, o 'response' é o objeto do usuário.
// 1. Atualiza a Memória RAM (para uso imediato no App)
setUser(response);
// 2. Atualiza o Armazenamento Fixo (para lembrar amanhã)
// Precisamos transformar o Objeto em Texto (Stringify) para salvar.
await AsyncStorage.setItem('@ticket:user', JSON.stringify(response));
return true; // Retorna 'true' para a Tela de Login navegar para a Home
} catch (error) {
console.error('Erro Crítico no Context:', error);
return false;
}
};
// =================================================================
// 3. FUNÇÃO DE LOGOUT (Limpeza Total)
// =================================================================
const logout = async () => {
// Limpa a memória RAM (O usuário sai da tela na hora)
setUser(null);
// Limpa o Armazenamento (Para não logar sozinho na próxima vez)
await AsyncStorage.removeItem('@ticket:user');
};
return (
<AppContext.Provider value={{ user, login, logout, loadingGlobal }}>
{children}
</AppContext.Provider>
);
};