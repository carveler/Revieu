import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddProductForm from '../components/AddProductForm';
import BarcodeReader from '../components/BarcodeReader';

const BarcodeStack = createStackNavigator();
export const BarcodeStackScreen = () => {
  return (
    <BarcodeStack.Navigator>
      <BarcodeStack.Screen
        name='BarcodeReader'
        component={BarcodeReader}
        options={{ title: 'BarcodeReader', headerShown: false }}
      />
    </BarcodeStack.Navigator>
  );
};
