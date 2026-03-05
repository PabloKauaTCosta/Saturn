import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
export default function TicketQRCode({ ticketData }) {
// Se não tem dados, não renderiza nada
if (!ticketData) return null;
// PAYLOAD REAL: O que o Admin vai ler quando bipar esse código.
// Enviamos o ID do ticket e o ID do aluno para validação cruzada no backend.
const qrPayload = JSON.stringify({
ticketId: ticketData.id,
userId: ticketData.userId,
generatedAt: ticketData.created_at // Opcional, para logs
});
return (
<View style={styles.card}>
<Text style={styles.title}>Ticket Refeição</Text>
<View style={styles.qrBorder}>
{/* O QR Code é gerado aqui */}
<QRCode
value={qrPayload}
size={200}
color="black"
backgroundColor="white"
/>
</View>
<Text style={styles.hash}>ID: {ticketData.id}</Text>
<Text style={styles.instruction}>Apresente este código na cantina</Text>
</View>
);
}
const styles = StyleSheet.create({
card: {
alignItems: 'center',
backgroundColor: '#fff',
borderRadius: 20,
padding: 24,
marginVertical: 20,
width: '100%',
// Sombras para dar efeito de "Card"
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 8,
elevation: 4,
},
title: {
fontSize: 18,
fontWeight: 'bold',
color: '#333',
marginBottom: 20,
},
qrBorder: {
padding: 10,
backgroundColor: 'white',
borderRadius: 10,
borderWidth: 1,
borderColor: '#eee',
},
hash: {
marginTop: 15,
fontSize: 12,
color: '#999',
fontFamily: 'monospace', // Fonte estilo código
},
instruction: {
marginTop: 5,
fontSize: 14,
color: '#666',
}
});