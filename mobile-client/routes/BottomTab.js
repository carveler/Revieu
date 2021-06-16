import React from 'react';
import { Ionicons, Foundation, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardStackScreen } from './DashboardStack';
import { AuthStackScreen } from './AuthStack';
import { BarcodeStackScreen } from './BarcodeStack';

const Tab = createBottomTabNavigator();
function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name='Dashboard'
        component={DashboardStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Foundation name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='BarcodeReader'
        component={BarcodeStackScreen}
        options={{
          tabBarLabel: 'BarcodeReader',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='barcode-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Auth'
        component={AuthStackScreen}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <Feather name='user' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNav;
