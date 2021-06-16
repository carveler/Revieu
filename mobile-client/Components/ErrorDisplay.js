import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
const ErrorDisplay = () => {
  const productError = useSelector((state) => state.productsReducer.error);
  const userError = useSelector((state) => state.userReducer.error);
  const reviewError = useSelector((state) => state.reviewReducer.error);
  return (
    <View>
      {/* <Text>{productError.message && productError.message}</Text>
      <Text>{userError.message && userError.message}</Text> */}
      <Text>
        {(userError.message === 'wrong password' ||
          userError.message === 'Cannot find email') &&
          'Your email or password is incorrect'}
      </Text>
      {/* <Text>{reviewError.message && reviewError.message}</Text> */}
    </View>
  );
};

export default ErrorDisplay;
