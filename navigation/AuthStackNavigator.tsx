import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from '../views/LoginView';
import BottomTabsNavigator from './BottomTabsNavigator';
// import RegisterView from '../views/RegisterView';
// import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Main" component={BottomTabsNavigator} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Register" component={RegisterView} /> */}
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
