import { Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const createTwoButtonAlert = (title, messages, component, data) => {
  // const navigation = useNavigation();
  return Alert.alert(`${title}`, `${messages}`, [
    {
      text: 'Cancel',
      // onPress: () => navigation.goback(),
      style: 'cancel',
    },
    {
      text: 'OK',
      // onPress: () => navigation.navigate(component, data),
    },
  ]);
};

export default createTwoButtonAlert;
