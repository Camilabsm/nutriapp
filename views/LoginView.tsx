import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';
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
          setPassword('')
          setUsername('')
          AsyncStorage.setItem('userToken', '123')
          navigation.navigate('Main')
        } else {
          Alert.alert('Erro', 'Usuário ou senha incorretos')
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro na autenticação')
      }
    } else {
      Alert.alert('Erro', 'Você precisa preencher todos os campos!')
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/nutriappfront.png')} style={styles.image} />
      <Text style={styles.title}>NutriApp</Text>

      <Text>Usuário</Text>
      <TextInput
        placeholder="Digite seu usuário..."
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text>Senha</Text>
      <TextInput
        placeholder="Digite sua senha..."
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button color="#316852" title="Entrar" onPress={handleLogin} />
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
  image: {
    alignSelf: 'center',
    width: 400,
    height: 400
  },
  title: {
    color: '#A92C3A',
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
  }
});

export default LoginScreen;
