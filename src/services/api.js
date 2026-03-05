import axios from 'axios';
import { User } from '../models/User';
import { Ticket } from '../models/Ticket';
// IMPORTANTE:
// Em produção, isso seria um domínio fixo (ex: api.escola.com.br).
const BASE_URL = 'https://ruby-pumps-itself-applicant.trycloudflare.com';
// 1. Instância do Axios
// Criamos uma configuração padrão para não precisar digitar o endereço do servidor
// em toda requisição.
const api = axios.create({
baseURL: BASE_URL,
});
// Em getStudents, alteraramos o response.data para data.map
export const getStudents = async () => {
    try {
    const response = await api.get('/students');
    // Linha alterada
    return response.data.map((item) => new User(item));
    } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    return [];
    }
    };
    // Faça o mesmo em tickets
    export const getTickets = async () => {
    try {
    const response = await api.get('/tickets');
    // Linha alterada
    return response.data.map((item) => new Ticket(item));
    } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    return [];
    }
    };
    // ==============================================================
// 3. FUNCIONALIDADES DO ALUNO (TICKETS)
// ==============================================================
// Verifica se o aluno JÁ tem ticket HOJE
export const checkTodayTicket = async (userId) => {
    try {
    // Nova rota
    const response = await api.get(`/tickets/today/${userId}`);
    // Se o backend achar, devolve o ticket. Se não, devolve null.
    return response.data ? new Ticket(response.data) : null;
    } catch (error) {
    // Se o servidor retornar 404 (Não encontrado), sabemos que ele não tem ticket
    if (error.response && error.response.status === 404) {
    return null;
    }
    console.log('Erro ao verificar ticket do dia:', error);
    return null;
    }
    };
    // Solicita um NOVO ticket
    export const requestNewTicket = async (userId) => {
    try {
    // Tenta criar o ticket
    const response = await api.post('/tickets', { user_id: userId });
    // Se der certo (201), retorna o Ticket modelado
    return new Ticket(response.data);
    } catch (error) {
    // O Axios joga o erro pro catch se for 400 ou 500 automatically
    // Vamos repassar o erro para a tela mostrar o Alert
    throw error;
    }
    };
    // Restante do código continua igual
    // 3. ENVIAR DADOS SENSÍVEIS (POST)
    // =================================================================
    export const loginRequest = async (email, password) => {
    try {
    const response = await api.post('/login', {
    email: email,
    password: password,
    });
    // Se o servidor responder Sucesso (200):
    // Não retornamos mais o JSON solto. Retornamos um Objeto User BLINDADO.
    // Isso garante que, mesmo no login, tenhamos as regras (isAdmin, avatar) prontas.
    return new User(response.data);
    } catch (error) {
    console.log(
    'Tentativa de login falhou:',
    // error.response?.data || error.message,
    );
    // Retornamos NULL para sinalizar erro ao Contexto
    return null;
    }
    };
    export default api;

    // 6. ÁREA DO ADMIN (VALIDAÇÃO E DASHBOARD) (TESTE)
// Função para validar/consumir ticket
export const confirmTicketUse = async (ticketId) => {
    try {
    // Mandamos o servidor atualizar o status no banco.
    // Usamos PATCH para alterar apenas o campo 'status', mantendo o resto do ticket igual.
    const response = await api.patch(`/tickets/${ticketId}`, {
    status: 'USADO', // Atualiza o status no banco de dados
    });
    // Retornamos o ticket atualizado que veio do servidor
    // Passamos pelo 'new Ticket' para garantir a formatação correta (cores, datas)
    return new Ticket(response.data);
    } catch (error) {
    console.error('Erro ao consumir ticket (Real):', error);
    throw error;
    }
    };
    // Função para fazer o cálculo matemático do Dashboard
    export const getDashboardStats = async () => {
    try {
    const students = await getStudents();
    const tickets = await getTickets();
    // 1. Filtrar tickets de HOJE
    const today = new Date().toDateString();
    const todayTickets = tickets.filter(
    (t) => new Date(t.created_at).toDateString() === today,
    );
    // 2. Filtrar tickets USADOS hoje
    const used = todayTickets.filter(
    (t) => t.status === 'USADO' || t.status === 'USED',
    );
    // 3. Retorna a matemática
    return {
    totalStudents: students.length,
    totalTickets: todayTickets.length,
    usedTickets: used.length,
    percentage:
    todayTickets.length > 0
    ? Math.round((used.length / todayTickets.length) * 100)
    : 0,
    };
    } catch (error) {
    console.error('Erro no dashboard:', error);
    return { totalStudents: 0, totalTickets: 0, usedTickets: 0, percentage: 0 };
    }
    };