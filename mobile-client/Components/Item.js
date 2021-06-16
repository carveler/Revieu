import React from 'react';
import { View, Text, Image } from 'react-native';
import Card from '../shared/card';
import { styles } from '../styles/style-object';

const Item = ({ item }) => {
  const { img, productName, brand, country, _id } = item;

  return (
    <Card>
      <View>
        <View styles={styles.imgContainer}>
          {img && (
            <Image
              source={{
                uri: img,
              }}
              style={styles.image}
            />
          )}
          <View>
            <Text>{productName && productName}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Details</Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default Item;
