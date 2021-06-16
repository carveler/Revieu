import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../styles/style-object';
import { signUpUser } from '../helpers/API_Calls';
import { setUserError, signup } from '../actions/action';
const { width } = Dimensions.get('window');

const Signup = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const response = await signUpUser(data);
    if (response.error) {
      return dispatch(setUserError(response.error));
    }
    dispatch(signup(response));
    navigation.navigate('Login');
    reset();
  };

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={{ width: width * 0.9, margin: 10 }}>
          <View>
            <Text style={stylesForm.label}>Username</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  textContentType='username'
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name='username'
              rules={{
                required: 'Username is required!',
                maxLength: {
                  value: 100,
                  message: 'Username is too long',
                },
              }}
            />
            {errors.username && <Text>{errors.username.message}</Text>}
          </View>
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

                maxLength: {
                  value: 100,
                  message: 'your email is too long',
                },
              }}
            />
            {errors.email && <Text>{errors.email.message}</Text>}
          </View>

          <View>
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
                  // error={errors.password}
                  // errorText={errors?.password?.message}
                />
              )}
              name='password'
              rules={{
                required: 'Password is required!',
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[~`!@#$%^&*()+_=\\|[\]{}:;"'?/,.<>-])(?=.*[A-Z]).{8,100}$/gm,
                  message:
                    'Please include at least one capital letter, one lowercase letter, one number, and one special character. ',
                },
                minLength: {
                  value: 8,
                  message: 'Minimum password length is 6',
                },
                maxLength: {
                  value: 100,
                  message: 'Your password is too long!',
                },
              }}
            />
            {errors.password && <Text>{errors.password.message}</Text>}
          </View>
          <View>
            <Text style={stylesForm.label}>Confirm Password</Text>
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
              name='confirmPassword'
              rules={{
                required: true,
                validate: (value) =>
                  value === password.current || 'These passwords do not match',
              }}
            />
            {errors.confirmPassword && (
              <Text>{errors.confirmPassword.message}</Text>
            )}
          </View>
          <View style={stylesForm.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              returnKeyType='Sign Up'
            >
              <Text style={stylesForm.textStyle}>Sign Up</Text>
            </Pressable>
          </View>
          <View style={stylesForm.buttonContainer}>
            <Text>Alredy have an account?</Text>

            <Pressable
              style={styles.button}
              onPress={() => navigation.push('Login')}
            >
              <Text style={stylesForm.textStyle}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const stylesForm = StyleSheet.create({
  label: {
    marginTop: 15,
    marginLeft: 15,
    fontWeight: '700',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  button: {
    margin: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    backgroundColor: '#68BCF1',
    fontSize: 25,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Signup;
