import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const LogoutView: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  useEffect(() => {
    AsyncStorage.removeItem('userToken')
    navigation.navigate('Login')
  })

  return (
    <View>
      <Text>Saindo...</Text>
    </View>
  );
};

export default LogoutView;
