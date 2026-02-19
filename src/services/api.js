import axios from 'axios';
// IMPORTANTE:
// Em produção, isso seria um domínio fixo (ex: api.escola.com.br).
const BASE_URL = 'https://scotia-feel-forwarding-zoo.trycloudflare.com/';
// 1. Instância do Axios
// Criamos uma configuração padrão para não precisar digitar o endereço do servidor
// em toda requisição.
const api = axios.create({
baseURL: BASE_URL,
});
// =================================================================
// 2. BUSCAR DADOS (GET)
// =================================================================
// Função para listar alunos
export const getStudents = async () => {
try {
const response = await api.get('/students');
return response.data; // Retorna a lista crua do banco
} catch (error) {
console.error('Erro ao buscar alunos:', error);
// TRATAMENTO DE ERRO:
// Se a internet cair, retornamos uma lista vazia []
// Isso evita que a tela de listagem trave (crash) ao tentar fazer um .map()
return [];
}
};
// Função para listar tickets
export const getTickets = async () => {
try {
const response = await api.get('/tickets');
return response.data;
} catch (error) {
console.error('Erro ao buscar tickets:', error);
return []; // Mesmo princípio: evita crash retornando array vazio
}
};
// =================================================================
// 3. ENVIAR DADOS SENSÍVEIS (POST) - A Grande Mudança
// =================================================================
export const loginRequest = async (email, password) => {
try {
// DIFERENÇA CRUCIAL (GET vs POST):
// Não enviamos senha pela URL (GET). Enviamos no "corpo" da requisição (POST).
// É como enviar uma carta lacrada (POST) vs escrever num cartão postal (GET).
const response = await api.post('/login', {
email: email, // Corpo da requisição (Body)
password: password,
});
// Se o servidor responder Sucesso (200), retornamos os dados do usuário.
return response.data;
} catch (error) {
// Se o servidor responder Erro (401 - Não autorizado ou 500 - Erro interno)
console.log(
'Tentativa de login falhou:',
error.response?.data || error.message,
);
// Retornamos NULL.
// Isso sinaliza para o nosso AppContext que o login não deu certo.
return null;
}
};
export default api;