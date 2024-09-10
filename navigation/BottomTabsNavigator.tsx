// src/navigation/BottomTabsNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomepageView from '../views/HomepageView';
import PacientsView from '../views/PacientsView';
import ScheduleView from '../views/ScheduleView';
import ProfileView from '../views/ProfileView';
import LogoutView from '../views/LogoutView';


const Tab = createBottomTabNavigator();

const BottomTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomepageView} />
      <Tab.Screen name="Patients" component={PacientsView} />
      <Tab.Screen name="Agenda" component={ScheduleView} />
      <Tab.Screen name="Profile" component={ProfileView} />
      <Tab.Screen name="Logout" component={LogoutView} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
