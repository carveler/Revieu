import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Button,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { styles, stylesForm, stylesHeader } from '../styles/style-object';
import { updateProduct as updateProductAPI } from '../helpers/API_Calls';
import {
  selectProduct,
  setProductError,
  updateProduct,
} from '../actions/action';
import ExpoImagePicker from './ExpoImagePicker';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Appbar, Chip } from 'react-native-paper';
import Loading from './Loading';
const { height, width } = Dimensions.get('window');
// import { TextInput } from 'react-native-paper';

const UpdateProductForm = ({ navigation }) => {
  const { selectedProduct } = useSelector((state) => state.productsReducer);

  const {
    barcode,
    productName,
    brand,
    country,
    img,
    productName_jp,
    price,
    store,
    category,
    tags,
    _id,
  } = selectedProduct;
  const countryString = country.toString();
  const storeString = store.toString();
  const tagsString = tags.toString();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      barcode,
      productName,
      brand,
      productName_jp,
    },
  });
  const dispatch = useDispatch();
  const [data, setData] = useState(null); //Cloudinary image base 64 data
  const [image, setImage] = useState(null); //Cloudinary image URL
  const [pickImageModal, setPickImageModal] = useState(false);
  const [save, setSave] = useState(false);
  const [newPhoto, setNewPhoto] = useState(false);
  const [screenDimention, setScreenDimention] = useState({
    screenHeight: 0,
    screenWidth: 0,
  });
  const text = 'Updating Product';

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenDimention({
      screenHeight: contentHeight,
      screenWidth: contentWidth,
    });
  };
  const scrollEnabled = screenDimention.screenHeight + 50 > height;

  const onSubmit = async (formData) => {
    setSave(true);
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
        return (splitData[key] = trimData[key].split(' ').filter(Boolean));
      } else {
        return (splitData[key] = trimData[key]);
      }
    });
    splitData.img = data ? data : selectedProduct.img;

    const productData = {
      brand: splitData.brand ? splitData.brand : brand,
      category: splitData.category
        ? [...new Set([...category, ...splitData.category])]
        : category,
      country: splitData.country
        ? [...new Set([...country, ...splitData.country])]
        : country,
      tags: splitData.tags ? [...new Set([...tags, ...splitData.tags])] : tags,
      img: splitData.img,
      productName: splitData.productName ? splitData.productName : productName,
      productName_jp: splitData.productName_jp
        ? splitData.productName_jp
        : productName_jp,
      barcode: splitData.barcode ? splitData.barcode : barcode,
      price: splitData.price
        ? [...new Set([...price, ...splitData.price])]
        : price,
      store: splitData.store
        ? [...new Set([...store, ...splitData.store])]
        : store,
    };
    const response = await updateProductAPI(productData, _id);
    if (response.error) {
      return dispatch(setProductError(response.error));
    }
    dispatch(updateProduct(response));
    dispatch(selectProduct(response));
    navigation.navigate('ItemDetails');
    setSave(false);
    reset();
  };

  const changePhoto = () => {
    setNewPhoto(true);
  };

  const cancelImg = () => {
    setData(null);
    setImage(null);
  };
  const onPressBack = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={stylesUpdate.container}>
            <View style={stylesUpdate.content}>
              <Appbar.Header
                style={{ backgroundColor: 'white', width: '100%' }}
              >
                <Appbar.BackAction onPress={onPressBack} />
                <Appbar.Content title='Edit Product' />
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

              {save ? (
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
                        style={{ width: width * 0.9, margin: 10 }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        editable={false} //not from React hook form
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

                  <Text style={stylesForm.label}>
                    Country : {countryString}
                  </Text>
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
                        placeholder='Add a Distribution Country'
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
                        placeholder='Add Price'
                      />
                    )}
                  />
                  {errors.price && <Text>{errors.price.message}</Text>}

                  <Text style={stylesForm.label}>Store : {storeString}</Text>
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
                        placeholder='Add a Store'
                      />
                    )}
                  />
                  {errors.store && <Text>{errors.store.message}</Text>}

                  <Text style={stylesForm.label}>Tags : {tagsString}</Text>
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
                        placeholder='Add Tags'
                      />
                    )}
                  />
                  {errors.tags && <Text>{errors.tags.message}</Text>}
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text style={stylesForm.label}>Image</Text>
                    {img && (
                      <Image
                        source={{
                          uri: img,
                        }}
                        style={{ height: 400, width: 300, marginTop: 10 }}
                      />
                    )}
                  </View>
                  {newPhoto ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ExpoImagePicker
                        setData={setData}
                        setImage={setImage}
                        image={image}
                        setPickImageModal={setPickImageModal}
                        pickImageModal={pickImageModal}
                      />
                    </View>
                  ) : (
                    <View style={styles.buttonContainer}>
                      <Text>Do you have a better photo?</Text>
                      <Pressable style={styles.button} onPress={changePhoto}>
                        <Text style={styles.buttonText}>Yes</Text>
                      </Pressable>
                    </View>
                  )}

                  {image && (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={stylesForm.label}>Preview</Text>

                      <Pressable onPress={cancelImg} style={styles.button}>
                        <Text style={styles.buttonText}>Cancel</Text>
                      </Pressable>
                      <Image
                        source={{ uri: image }}
                        style={{ height: 200, width: 200, marginTop: 10 }}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesUpdate = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    marginTop: 10,
    width: '95%',
    flex: 1,
  },
});

export default UpdateProductForm;
