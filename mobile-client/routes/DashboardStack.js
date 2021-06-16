import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../components/Dashboard';
import ItemDetails from '../components/ItemDetails';
import AddProductForm from '../components/AddProductForm';
import UpdateProductForm from '../components/UpdateProductForm';

export const DashboardStackScreen = () => {
  const DashboardStack = createStackNavigator();
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name='Dashboard'
        component={Dashboard}
        options={{ title: 'Home', headerShown: false }}
      />
      <DashboardStack.Screen
        name='ItemDetails'
        component={ItemDetails}
        options={{
          title: '',
          headerShown: false,
        }}
      />

      <DashboardStack.Screen
        name='AddProductForm'
        component={AddProductForm}
        options={{ title: 'AddProduct', headerShown: false }}
      />
      <DashboardStack.Screen
        name='UpdateProductForm'
        component={UpdateProductForm}
        options={{ title: 'UpdateProduct', headerShown: false }}
      />
    </DashboardStack.Navigator>
  );
};
