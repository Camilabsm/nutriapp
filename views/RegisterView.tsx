import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { registerUser } from '../utils/Database';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
    Register: undefined;
    Login: undefined;
  };

type Props = StackScreenProps<RootStackParamList, 'Register'>;

const RegisterView: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (username && password) {
      try {
        await registerUser(username, password);
        Alert.alert('Sucesso', 'Usuário registrado com sucesso');
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Erro', 'Erro ao registrar o usuário');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha ambos os campos.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

export default RegisterView;
