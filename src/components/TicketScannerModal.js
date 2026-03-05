import React, { useState } from 'react';
import {
View,
Text,
Modal,
TouchableOpacity,
StyleSheet,
Alert,
} from 'react-native';
import { CameraView } from 'expo-camera';
// Importa a função da API
import { confirmTicketUse } from '../services/api';
export default function TicketScannerModal({ visible, onClose }) {
const [scanned, setScanned] = useState(false);
const handleBarCodeScanned = async ({ data }) => {
setScanned(true); // Evita múltiplas leituras simultâneas do mesmo código
try {
const payload = JSON.parse(data);
if (!payload.ticketId) {
throw new Error('QR Code inválido.');
}
// Chama a API para dar baixa (PATCH)
await confirmTicketUse(payload.ticketId);
// Sucesso
Alert.alert('Sucesso!', `Ticket validado com sucesso!`, [
{
text: 'Continuar Lendo',
onPress: () => setScanned(false),
},
{
text: 'Fechar Câmera',
onPress: () => {
setScanned(false);
onClose();
},
},
]);
} catch (error) {
// Erro
Alert.alert(
'Erro de Validação',
'Ticket já usado ou formato inválido.',
[
{ text: 'Tentar Novamente', onPress: () => setScanned(false) },
{
text: 'Cancelar',
onPress: () => {
setScanned(false);
onClose();
},
style: 'cancel',
},
],
);
}
};
return (
<Modal visible={visible} animationType='slide' transparent={false}>
<View style={styles.cameraContainer}>
<Text style={styles.cameraTitle}>Aponte para o QR Code</Text>
<CameraView
style={styles.camera}
facing='back'
barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
/>
<TouchableOpacity style={styles.closeCameraButton} onPress={onClose}>
<Text style={styles.closeCameraText}>Cancelar e Voltar</Text>
</TouchableOpacity>
</View>
</Modal>
);
}
const styles = StyleSheet.create({
cameraContainer: {
flex: 1,
backgroundColor: '#000',
justifyContent: 'center',
alignItems: 'center',
},
cameraTitle: {
color: '#fff',
fontSize: 20,
fontWeight: 'bold',
position: 'absolute',
top: 60,
zIndex: 10,
},
camera: {
width: '100%',
height: '60%',
},
closeCameraButton: {
position: 'absolute',
bottom: 50,
backgroundColor: '#d32f2f',
padding: 15,
borderRadius: 10,
},
closeCameraText: {
color: '#fff',
fontWeight: 'bold',
fontSize: 16,
},
});