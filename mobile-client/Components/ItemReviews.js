import React from 'react';
import { View, Text, Image } from 'react-native';
import Card from '../shared/card';
import { styles } from '../styles/style-object';

const ItemReviews = ({ item }) => {
  const { rate, comment, goodCount, badCount } = item;

  return (
    <Card>
      <View>
        <View styles={styles.imgContainer}></View>
        <Text>UserName:{item.user && item.user.username}</Text>
        <Text>rate:{rate}</Text>
        {comment && <Text>comment:{comment}</Text>}
      </View>
    </Card>
  );
};

export default ItemReviews;
