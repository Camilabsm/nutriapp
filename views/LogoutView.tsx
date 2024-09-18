// src/screens/LogoutScreen.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const LogoutView: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  useEffect(() => {
    AsyncStorage.removeItem('userToken')
    navigation.reset({
      index: 0, // Define o índice inicial
      routes: [{ name: 'Login' }], // Define a tela 'Login' como a única na pilha
    })
  })

  return (
    <View>
      <Text>Saindo...</Text>
    </View>
  );
};

export default LogoutView;
