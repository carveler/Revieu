import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = ({ text }) => {
  return (
    <View syles={stylesLoading.spinnerContainer}>
      <View style={stylesLoading.spinner}>
        <Text styles={stylesLoading.text}>{text}</Text>
      </View>
      <View style={stylesLoading.spinner}>
        <ActivityIndicator size='large' color='#03989E' />
      </View>
    </View>
  );
};
const stylesLoading = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  spinnerContainer: {
    flex: 1,
    marginTop: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    flex: 1,
    alignSelf: 'center',
  },
});
export default Loading;
