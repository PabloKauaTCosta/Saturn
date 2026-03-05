import { useCameraPermissions } from 'expo-camera';
import TicketScannerModal from '../components/TicketScannerModal';
import ScanButton from '../components/ScanButton';
import { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { getStudents } from '../services/api';
export default function AdminHome() {
  const { logout } = useContext(AppContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.log('Erro ao buscar:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleOpenScanner = async () => {
    if (!permission) {
      return;
    }
    if (!permission.granted) {
      const result = await requestPermission();
      if (result.granted) {
        setIsScanning(true);
      }
      return;
    }
    setIsScanning(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Administrador</Text>
    
      <Text style={styles.subtitle}>
        {loading
          ? 'Buscando dados...'
          : `Alunos encontrados: ${students.length}`}
      </Text>
      <ScanButton onPress={handleOpenScanner} />
      {loading ? (
        <ActivityIndicator size='large' color='#d32f2f' style={styles.loader} />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>
                Matrícula: {item.registration || '---'}
              </Text>
              <Text style={styles.cardText}>Email: {item.email || '---'}</Text>
            </View>
          )}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TicketScannerModal
        isVisible={isScanning}
        onClose={() => setIsScanning(false)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => logout()}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Sair (Logout)</Text>
      </TouchableOpacity>
      {
/* Botão flutuante para abrir a câmera */
}
<ScanButton onPress={handleOpenScanner} />;
{
/* O Modal invisível que aguarda o comando para abrir a câmera */
}
<TicketScannerModal
visible={isScanning}
onClose={() => setIsScanning(false)}
/>;
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b71c1c',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#c62828',
    marginBottom: 20,
  },
  list: {
    width: '90%',
    flexGrow: 0,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 10,
  },
  loader: {
    marginVertical: 50,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    borderLeftWidth: 5,
    borderLeftColor: '#d32f2f',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});