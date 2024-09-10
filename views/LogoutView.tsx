// src/screens/LogoutScreen.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const LogoutView: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    // Lógica para realizar o logout (ex: limpar o AsyncStorage)
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, [navigation]);

  return (
    <View>
      <Text>Saindo...</Text>
    </View>
  );
};

export default LogoutView;
