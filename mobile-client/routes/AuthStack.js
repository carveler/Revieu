import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';

const AuthStack = createStackNavigator();

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name='Login'
        component={Login}
        options={{ title: 'Log In', headerShown: false }}
      />
      <AuthStack.Screen
        name='Signup'
        component={Signup}
        options={{ title: 'Sign Up', headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
