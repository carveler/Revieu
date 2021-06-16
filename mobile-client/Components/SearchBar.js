import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { styles } from '../styles/style-object';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { search } from '../actions/action';
import { Searchbar } from 'react-native-paper';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(search(data.search.toLowerCase().trim()));
  };

  return (
    <View style={styles.content}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Searchbar
            style={{ width: '100%' }}
            placeholder='Barcode, Name, Brand etc...'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            returnKeyType='search'
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
        name='search'
        rules={{ required: false }}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};
