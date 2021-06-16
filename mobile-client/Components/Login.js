import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../styles/style-object';
import { stylesForm } from '../styles/style-object';
import { loginUser, logOutUser } from '../helpers/API_Calls';
import { login, logout, setUserError } from '../actions/action';
import ErrorDisplay from './ErrorDisplay';
import { Alert } from 'react-native';

const Login = ({ navigation }) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.userReducer);

  const onSubmit = async (data) => {
    const response = await loginUser(data);

    if (response.error) {
      return dispatch(setUserError(response.error));
    }
    dispatch(login(response));
    navigation.navigate('Dashboard');
    reset();
  };
  const pressLogout = async () => {
    const response = await logOutUser();
    if (response.error) {
      return dispatch(setUserError(response.error));
    }
    dispatch(logout());

    navigation.navigate('Dashboard');
  };

  const createTwoButtonAlert = (title, messages) => {
    Alert.alert(`${title}`, `${messages}`, [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => pressLogout(),
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ width: windowWidth, height: windowHeight }}>
        <View style={styles.container}>
          {message && !user ? <Text>{message}</Text> : <Text></Text>}
          <View>
            {user ? (
              <View>
                <View>
                  <Text>Welcome {user.username}</Text>
                </View>

                <View>
                  <View>
                    <View>
                      <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate('BarcodeReader')}
                      >
                        <Text style={styles.buttonText}>Add Product</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View>
                  <Pressable
                    style={styles.button}
                    onPress={() =>
                      createTwoButtonAlert('Logout', 'Do you want to Logout?')
                    }
                  >
                    <Text style={styles.buttonText}>Logout</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View style={{ width: windowWidth * 0.9, margin: 10 }}>
                <View>
                  <Text style={stylesForm.label}>Email</Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                      />
                    )}
                    name='email'
                    rules={{
                      required: 'Email is required!',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'This is not a valid Email address!',
                      },
                    }}
                  />
                  {errors.email && <Text>{errors.email.message}</Text>}

                  <Text style={stylesForm.label}>Password</Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        secureTextEntry={true}
                        textContentType='password'
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                      />
                    )}
                    name='password'
                    rules={{
                      required: 'Please enter your password',
                    }}
                  />
                  {errors.password && <Text>{errors.password.message}</Text>}
                  <ErrorDisplay />
                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={styles.button}
                      onPress={handleSubmit(onSubmit)}
                    >
                      <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Text>Do not have an account?</Text>

                  <Pressable
                    style={styles.button}
                    onPress={() => navigation.push('Signup')}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
