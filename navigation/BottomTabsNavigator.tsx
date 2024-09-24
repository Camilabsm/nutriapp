import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomepageView from '../views/HomepageView';
import PacientsView from '../views/PacientsView';
import MetricsView from '../views/MetricsView';
import ProfileView from '../views/ProfileView';
import LogoutView from '../views/LogoutView';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const BottomTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home' 
            : 'home-outline'; 
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Pacientes') {
          iconName = focused ? 'clipboard' : 'clipboard-outline';
        } else if (route.name === 'Metricas') {
          iconName = focused ? 'pie-chart' : 'pie-chart-outline';
        } else if (route.name === 'Logout') {
          iconName = 'exit-outline';
        }
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#316852',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={HomepageView} />
      <Tab.Screen name="Pacientes" component={PacientsView} />
      <Tab.Screen name="Metricas" component={MetricsView} />
      <Tab.Screen name="Perfil" component={ProfileView} />
      <Tab.Screen name="Logout" component={LogoutView} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
