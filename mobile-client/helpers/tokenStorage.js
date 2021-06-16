import * as SecureStore from 'expo-secure-store';

export const storeToken = async (string, value) => {
  try {
    await SecureStore.setItemAsync(string, value);
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};

export const getToken = async (string) => {
  try {
    return await SecureStore.getItemAsync(string);
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync('user');
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};
