import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (string, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(string, jsonValue);
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};

export const getData = async (string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(string);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};
