// src/screens/PatientsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, TextInput, Alert, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { getPatientsByUser, addPatient } from '../utils/Database';

// Defina o tipo de parâmetros do stack navigator
type RootStackParamList = {
  Patients: { userId: number }; // A rota Patients recebe userId como parâmetro
};

// Defina o tipo de props da PatientsScreen usando StackScreenProps
type Props = StackScreenProps<RootStackParamList, 'Patients'>;

const PacientsView: React.FC<Props> = ({ route }) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado do modal
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const { userId } = route.params; // Pega o userId dos parâmetros da rota

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatientsByUser(userId);
        setPatients(patientsData);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar pacientes');
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    if (!name || !age || !weight || !height) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      await addPatient(userId, name, parseInt(age), parseFloat(weight), parseFloat(height));
      setModalVisible(false); // Fechar o modal
      setName('');
      setAge('');
      setWeight('');
      setHeight('');
      Alert.alert('Sucesso', 'Paciente adicionado com sucesso!');
      const patientsData = await getPatientsByUser(userId); // Atualiza a lista de pacientes
      setPatients(patientsData);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar paciente');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.patientContainer}>
            <Text>Nome: {item.name}</Text>
            <Text>Idade: {item.age}</Text>
            <Text>Peso: {item.weight} kg</Text>
            <Text>Altura: {item.height} m</Text>
          </View>
        )}
      />

      {/* Botão para abrir o modal */}
      <Button title="Adicionar Paciente" onPress={() => setModalVisible(true)} />

      {/* Modal para adicionar paciente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Adicionar Paciente</Text>
            <TextInput
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Idade"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Peso"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Altura"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button title="Adicionar" onPress={handleAddPatient} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  patientContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PacientsView;
