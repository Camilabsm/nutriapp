// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useUserDatabase } from '../utils/UserFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const userDatabase = useUserDatabase()
  const handleLogin = () => {
    if (username && password) {
      try {
        const isAuthenticated = userDatabase.getUser(username, password)
        if (isAuthenticated) {
          AsyncStorage.setItem('userToken', '123')
          navigation.navigate('Main')
        } else {
          Alert.alert('Erro', 'Usuário ou senha incorretos')
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro na autenticação')
      }
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Usuário"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => Alert.alert('Recuperar senha')}>
        Esqueceu sua senha?
      </Text>
      <Text style={styles.link} onPress={() => Alert.alert('Criar nova conta')}>
        Não possui conta? Cadastre-se aqui
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
