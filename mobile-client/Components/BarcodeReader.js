import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addNewProduct, fetchOpenFoodFacts } from '../helpers/API_Calls';
import { styles } from '../styles/style-object';
import { useDispatch, useSelector } from 'react-redux';
import {
  addScannedProduct,
  selectProduct,
  setProductError,
} from '../actions/action';
import { ModalContext } from '../context/ModalContext';

const BarcodeReader = ({ navigation }) => {
  const { products } = useSelector((state) => state.productsReducer);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { loginModalOpen, setLoginModalOpen } = useContext(ModalContext);
  const { user } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const createTwoButtonAlert = (title, messages, component, screen, data) => {
    return Alert.alert(`${title}`, `${messages}`, [
      {
        text: 'Cancel',
        onPress: () => navigation.goBack(),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          navigation.navigate(component, {
            screen: screen,
            params: data,
          }),
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    alert(`Barcode ${data} has been scanned!`);
    const itemFound = await products.find((item) => item.barcode === data);
    if (itemFound) {
      dispatch(selectProduct(itemFound));
      return navigation.navigate('ItemDetails');
    } else {
      const response = await fetchOpenFoodFacts(data);
      if (response.status === 0) {
        dispatch(setProductError({ message: response.status_verbose }));

        return user
          ? createTwoButtonAlert(
              `${response.status_verbose}`,
              'Thid product is not in our database. Do you want to add Product?',
              'Dashboard',
              'AddProductForm',
              { barcode: data }
            )
          : createTwoButtonAlert(
              'Product Not Found',
              'Please Login to add Product',
              'Auth',
              'Login'
            );
      } else {
        const {
          brands,
          categories,
          countries,
          image_url,
          _keywords,
          generic_name,
          _id,
          store,
        } = response.product;

        const newProduct = {
          brand: brands ? brands : 'Please Add Brands',
          category: categories
            ? [...new Set(categories.split(','))].filter((x) => Boolean(x))
            : [],
          country: countries
            ? [...new Set(countries.split(','))].filter((x) => Boolean(x))
            : [],
          img: image_url ? image_url : 'Please Add Image',
          tags: _keywords
            ? [...new Set(_keywords)].filter((x) => Boolean(x))
            : [],
          productName: generic_name ? generic_name : 'Please add Product Name',
          barcode: _id ? _id : 'No Barcode',
          store: store
            ? [...new Set(Array(store))].filter((x) => Boolean(x))
            : [],
        };

        const product = await addNewProduct(newProduct);
        if (product.error) {
          return setProductError(product.error);
        }
        dispatch(addScannedProduct(product));
        dispatch(selectProduct(product));
        return navigation.navigate('ItemDetails', product);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <View>
          <Pressable
            onPress={() => {
              setScanned(false);
            }}
          >
            <Text style={styles.buttonText}>Tap to Scan Again</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default BarcodeReader;
