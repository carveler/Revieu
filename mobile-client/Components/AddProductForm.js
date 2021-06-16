import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { styles, stylesForm } from '../styles/style-object';
import { addNewProduct } from '../helpers/API_Calls';
import { addProduct, selectProduct, setProductError } from '../actions/action';
import ExpoImagePicker from './ExpoImagePicker';
import { Appbar } from 'react-native-paper';
import Loading from './Loading';
import { MaterialIcons } from '@expo/vector-icons';
const { height } = Dimensions.get('window');

const AddProductForm = ({ navigation, route }) => {
  const barcode = route.params || 'No Barcode';

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: barcode,
  });
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [pickImageModal, setPickImageModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [screenDimention, setScreenDimention] = useState({
    screenHeight: 0,
    screenWidth: 0,
  });
  const text = 'Adding Product';

  const onSubmit = async (formData) => {
    setAdding(true);

    const trimData = {};

    Object.keys(formData).map((key) =>
      Boolean(formData[key])
        ? (trimData[key] = formData[key].trim())
        : (formData[key] = formData[key])
    );

    const splitData = {};
    Object.keys(trimData).map((key) => {
      if (
        key === 'country' ||
        key === 'price' ||
        key === 'category' ||
        key === 'store' ||
        key === 'tags'
      ) {
        return (splitData[key] = trimData[key].split(' ').filter(Boolean)); //Boolean()if an expression (or a variable) is true undefined,null is a falsy value.
      } else {
        return (splitData[key] = trimData[key]);
      }
    });

    const productData = {
      brand: splitData.brand ? splitData.brand : 'Please Add Brands',
      category: [...new Set(splitData.category)],
      country: [...new Set(splitData.country)],
      img: data
        ? data
        : 'https://res.cloudinary.com/ds2g0rznm/image/upload/v1623429610/no-img_pbikmu.jpg',
      tags: [...new Set(splitData.tags)],
      productName: splitData.productName,
      productName_jp: splitData.productName_jp
        ? splitData.productName_jp
        : 'Please Add Product Name',
      barcode: splitData.barcode,
      price: [...new Set(splitData.price)],
      store: [...new Set(splitData.store)],
    };

    const response = await addNewProduct(productData);

    if (response.error) {
      return dispatch(setProductError(response.error));
    }
    dispatch(addProduct(response));
    dispatch(selectProduct(response));
    navigation.navigate('ItemDetails');
    setAdding(false);
    reset();
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenDimention({
      screenHeight: contentHeight,
      screenWidth: contentWidth,
    });
  };
  const scrollEnabled = screenDimention.screenHeight + 50 > height;
  const onPressBack = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Appbar.Header style={{ backgroundColor: 'white', width: '100%' }}>
              <Appbar.BackAction onPress={onPressBack} />
              <Appbar.Content title='Add Product' />
              <View>
                <MaterialIcons
                  name='save-alt'
                  size={27}
                  color='black'
                  onPress={handleSubmit(onSubmit)}
                  style={{ paddingRight: 15 }}
                ></MaterialIcons>
              </View>
            </Appbar.Header>

            {adding ? (
              <Loading text={text} />
            ) : (
              <View>
                <Text style={stylesForm.label}>Barcode</Text>
                <Controller
                  control={control}
                  name='barcode'
                  rules={{
                    required: 'Barcode is required!',
                    maxLength: {
                      value: 140,
                      message: 'Please Enter valid Barcode',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                />
                {errors.barcode && <Text>{errors.barcode.message}</Text>}

                <Text style={stylesForm.label}>Product Name</Text>
                <Controller
                  control={control}
                  name='productName'
                  rules={{
                    required: 'Product Name is required!',
                    maxLength: {
                      value: 200,
                      message: 'Product Name is too long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder='Product Name'
                    />
                  )}
                />
                {errors.productName && (
                  <Text>{errors.productName.message}</Text>
                )}

                {/* <Text style={styles.label}>商品名（日本語）</Text>
              <Controller
                control={control}
                name='productName_jp'
                rules={{
                  required: false,
                  maxLength: {
                    value: 200,
                    message: 'Product Name is too long',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder='商品名（日本語訳）'
                  />
                )}
              />
              {errors.productName_jp && <Text>{errors.productName_jp.message}</Text>} */}

                <Text style={stylesForm.label}>Brand</Text>
                <Controller
                  control={control}
                  name='brand'
                  rules={{
                    required: false,
                    maxLength: {
                      value: 80,
                      message: 'Please enter valid Brand Name',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder='Brand Name'
                    />
                  )}
                />

                {errors.brand && <Text>{errors.brand.message}</Text>}

                <Text style={stylesForm.label}>Country</Text>
                <Controller
                  control={control}
                  name='country'
                  rules={{
                    required: false,
                    maxLength: {
                      value: 80,
                      message: 'Please enter valid Country',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder='Country(where you can buy this product)'
                    />
                  )}
                />
                {errors.country && <Text>{errors.country.message}</Text>}

                <Text style={stylesForm.label}>Price</Text>
                <Controller
                  control={control}
                  name='price'
                  rules={{
                    required: false,
                    maxLength: {
                      value: 16,
                      message: 'Please enter correct Price',
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Please enter number',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder='Price you bought for'
                    />
                  )}
                />
                {errors.price && <Text>{errors.price.message}</Text>}

                <Text style={stylesForm.label}>Store</Text>
                <Controller
                  control={control}
                  name='store'
                  rules={{
                    required: false,
                    maxLength: {
                      value: 100,
                      message: 'Please enter correct Store Name',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder='Store(where you can buy this product)'
                    />
                  )}
                />
                {errors.store && <Text>{errors.store.message}</Text>}

                <Text style={stylesForm.label}>Tags</Text>
                <Controller
                  control={control}
                  name='tags'
                  rules={{
                    required: false,
                    maxLength: {
                      value: 100,
                      message: 'Your tag is too long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder='Tags'
                    />
                  )}
                />
                {errors.tags && <Text>{errors.tags.message}</Text>}

                <Text style={stylesForm.label}>Image</Text>
                <ExpoImagePicker
                  setData={setData}
                  setImage={setImage}
                  image={image}
                  setPickImageModal={setPickImageModal}
                  pickImageModal={pickImageModal}
                />

                {image && (
                  <View>
                    <Text style={stylesForm.label}>Preview</Text>
                    <Image
                      source={{ uri: image }}
                      style={{ width: 200, height: 200 }}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductForm;
