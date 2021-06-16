import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducer/index';
import BottomNav from './routes/BottomTab';
import { ModalContextProvider } from './context/ModalContext';

const store = createStore(reducers);
export default function App() {
  return (
    <Provider store={store}>
      <ModalContextProvider>
        <NavigationContainer>
          <BottomNav />
        </NavigationContainer>
      </ModalContextProvider>
    </Provider>
  );
}
