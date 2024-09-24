// src/screens/PatientsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, TextInput, Alert, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

type RootStackParamList = {
  Patients: { userId: number }; // A rota Patients recebe userId como parâmetro
};

type Props = StackScreenProps<RootStackParamList, 'Patients'>;

const PacientsView: React.FC<Props> = ({ route }) => {
  const [patients, setPatients] = useState<any[]>([{id: 1, name: "Paciente 1", plan: "Semestral", initialDate: "2024-01-01"}, {id: 2, name: "Paciente 2", plan: "Trimestral", initialDate: "2024-08-01"}, {id: 3, name: "Paciente 3", plan: "Mensal", initialDate: "2024-09-10"}, {id: 4, name: "Paciente 4", plan: "Trimestral", initialDate: "2024-07-10"}, {id: 5, name: "Paciente 5", plan: "Semestral", initialDate: "2024-09-23"}]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');

  async function handleAddPatient() {
    Alert.alert('Sucesso!', 'Um novo paciente foi adicionado')
    setModalVisible(false)
  }

    const [date, setDate] = useState(new Date()); 
    const [show, setShow] = useState(false); 
  

    const onChange = (event: any, selectedDate?: Date) => {
      const currentDate = selectedDate || date; 
      setShow(false); 
      setDate(currentDate); 
    };
    
    const showDatePicker = () => {
      setShow(true)
    };

    const planSituation = (initialDate:string, plan: string) => {
      const remainingDays = Math.round((Date.now() - Date.parse(initialDate))/86400000)
      let situation = ''
      switch(plan) {
        case "Mensal": 
          if (30 > remainingDays && remainingDays >= 14) {
            situation = "Situação OK."
          } else if (remainingDays < 14 && remainingDays >= 7) {
            situation =  "Plano próximo ao vencimento."
          } else if (remainingDays < 7 && remainingDays > 0) {
            situation = "Ação necessária! Última semana de plano."
          } else { 
            situation = "Plano vencido."
          } 
        break;
        case "Trimestral": 
        if (90 > remainingDays && remainingDays >= 14) {
            situation = "Situação OK."
          } else if (remainingDays < 14 && remainingDays >= 7) {
            situation = "Plano próximo ao vencimento."
          } else if (remainingDays < 7 && remainingDays > 0) {
            situation = "Ação necessária! Última semana de plano."
          } else { 
            situation = "Plano vencido."
          } 
        break;
        case "Semestral":
          if (180 > remainingDays && remainingDays >= 14) {
            situation = "Situação OK."
          } else if (remainingDays < 14 && remainingDays >= 7) {
            situation = "Plano próximo ao vencimento."
          } else if (remainingDays < 7 && remainingDays > 0) {
            situation = "Ação necessária! Última semana de plano."
          } else { 
            situation = "Plano vencido."
          } 
        break;
      }
      return situation;
    }

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.patientContainer}>
            <Text>Nome: {item.name}</Text>
            <Text>Tipo do plano: {item.plan}</Text>
            <Text>Data de início do plano: {item.initialDate} </Text>
            <Text>Situação: {planSituation(item.initialDate, item.plan)}</Text>
          </View>
        )}
      />

      <Button title="Adicionar novo paciente" onPress={() => setModalVisible(true)} />

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
            <Picker
        selectedValue={plan}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setPlan(itemValue)}
      >
        <Picker.Item label="Selecione um plano" value="" />
        <Picker.Item label="Mensal" value="mensal" />
        <Picker.Item label="Trimestral" value="trimestral" />
        <Picker.Item label="Semestral" value="semestral" />
      </Picker>
      <Text style={styles.label}>Data inicial do plano: {date.toLocaleDateString()}</Text>
      <Button title="Selecionar Data" color='green' onPress={showDatePicker} />

      {show && (
        <DateTimePicker
          value={date} 
          mode="date" 
          display="default" 
          onChange={onChange}
        />
      )}
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
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ddd',
  },
  selectedValue: {
    fontSize: 16,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    borderColor: '#ddd',
  },
});

export default PacientsView;
