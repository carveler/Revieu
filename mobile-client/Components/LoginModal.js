import React from 'react';
import { Alert, Modal, Text, Pressable, View } from 'react-native';
import { styles } from '../styles/style-object';
import { stylesModal } from '../styles/style-object';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginModal = ({ setLoginModalOpen, loginModalOpen }) => {
  const navigation = useNavigation();

  const loginPress = () => {
    setLoginModalOpen(false);
    navigation.navigate('Auth', { screen: 'Login' });
  };

  return (
    <View style={stylesModal.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={loginModalOpen}
        onRequestClose={() => {
          Alert.alert('Login has been closed.');
          setLoginModalOpen(!loginModalOpen);
        }}
      >
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <MaterialIcons
              name='close'
              size={24}
              style={{ marginBottom: 20, color: 'black' }}
              onPress={() => setLoginModalOpen(false)}
            />
            <Text style={stylesModal.modalText}>Please Login</Text>
            <Pressable style={styles.button} onPress={loginPress}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginModal;
