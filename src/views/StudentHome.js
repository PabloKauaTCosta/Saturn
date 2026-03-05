import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert} from 'react-native';
import TicketQRCode from '../components/TicketQRCode';
import TicketUsedFeedback from '../components/TicketUsedFeedback';
import PurchaseLoading from '../components/PurchaseLoading';
import StudentFooter from '../components/Footer';
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { checkMarketStatus } from '../utils/marketRules';
// IMPORTAMOS AS FUNÇÕES DO API.JS
import { checkTodayTicket} from '../services/api';
import StudentHeader from '../components/StudentHeader';
import ClockStatus from '../components/ClockStatus';
import TicketActionArea from '../components/TicketActionArea';
import { useSecureTicket } from '../viewmodels/useSecureTicket';


export default function StudentHome() {
const { user, logout } = useContext(AppContext);
const [currentTime, setCurrentTime] = useState(new Date());
const [marketStatus, setMarketStatus] = useState({
isOpen: false,
message: 'Carregando...',
});
const [currentTicket, setCurrentTicket] = useState(null);
const { purchaseTicket, loading } = useSecureTicket();


// --- 1. VERIFICAR SE JÁ COMEU HOJE ---
useEffect(() => {
const loadTicket = async () => {
if (user) {
const existingTicket = await checkTodayTicket(user.id);
setCurrentTicket(existingTicket);
}
};
loadTicket();
}, [user]);
// --- 2. RELÓGIO ---
useEffect(() => {
const timer = setInterval(() => {
const now = new Date();
setCurrentTime(now);
if (user && user.schedule) {
setMarketStatus(checkMarketStatus(user));
} else {
setMarketStatus({ isOpen: false, message: 'Sem horário definido' });
}
}, 1000);
return () => clearInterval(timer);
}, [user]);
// --- 3. PEDIR TICKET (Lógica encapsulada) ---
const handleRequestTicket = async () => {
if (!marketStatus.isOpen) return Alert.alert('Aguarde', 'Cantina fechada.');
try {
const newTicket = await requestNewTicket(user.id);
setCurrentTicket(newTicket);
Alert.alert('Sucesso!', 'Ticket garantido! Bom apetite.');
} catch (error) {
// const mensagemErro = error.response?.data?.error || 'Erro ao conectar';
Alert.alert('Atenção', mensagemErro);
}
};
const handlePressTicket = () => {
 purchaseTicket(user, marketStatus, (newTicket) => {
 setCurrentTicket(newTicket);
 });
 };
 // (Novo) - Função que decide qual UI mostrar com base no estado REAL do ticket (ciclo de vida)
const renderTicketArea = () => {
 // 1. Enquanto valida GPS / API
 if (loading) {
 return <PurchaseLoading message="Validando localização..." />;
 }
 // 2. NÃO tem ticket ainda
 if (!currentTicket) {
 return (
 <TicketActionArea
 loading={loading}
 onPress={handlePressTicket}
 isOpen={marketStatus.isOpen}
 hasTicket={false}
 />
 );
 }
 // 3. Ticket JÁ FOI USADO
 if (currentTicket.status === 'USADO') {
 return <TicketUsedFeedback ticketId={currentTicket.id} />;
 }
 // 4. Ticket EXISTE e é VÁLIDO → QR CODE
 return <TicketQRCode ticketData={currentTicket} />;
 };
const hasTicket = !!currentTicket;
if (!user) {
return (
<View style={styles.container}>
<Text>Saindo...</Text>
</View>
);
}
return (
<SafeAreaView style={styles.safeArea}>
 <ScrollView style={styles.container}>
 <StudentHeader user={user} />
<ClockStatus
currentTime={currentTime}
isOpen={marketStatus.isOpen}
message={marketStatus.message}
hasTicket={hasTicket}
/>
{renderTicketArea()}


<StudentFooter
onLogout={logout}
onChangePassword={() => setPasswordModalVisible(true)}
/>


 </ScrollView>
</SafeAreaView>
);
}


const styles = StyleSheet.create({
 safeArea: {
   flex: 1,
   backgroundColor: '#e0f7fa',
   },
container: {
flexGrow: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#e0f7fa',
padding: 20,
},
ticketInfo: {
marginBottom: 10,
alignItems: 'center',
backgroundColor: 'white',
padding: 8,
borderRadius: 8,
elevation: 2,
},
ticketId: { fontSize: 10, color: '#999', marginTop: 2 },
logoutButton: { marginTop: 20, padding: 10 },
logoutText: { color: '#006064', fontWeight: 'bold' },
loadingBox: {
 height: 50,
 justifyContent: 'center',
 alignItems: 'center',
 marginVertical: 10,
 },
});
