import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  LogBox,
  Pressable,
} from 'react-native';
import { styles } from '../styles/style-object';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  getProducts,
  restoreUserInfo,
  setProductError,
  search,
  setUserError,
  selectProduct,
} from '../actions/action';
import ErrorDisplay from './ErrorDisplay';
import { getAllProducts } from '../helpers/API_Calls';
import { SearchBar } from './SearchBar';
import Item from './Item';
import { getData } from '../helpers/asyncStorage';
import Loading from './Loading';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const Dashboard = ({ navigation }) => {
  const { products } = useSelector((state) => state.productsReducer);
  const searchQuery = useSelector((state) => state.searchReducer);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { reset } = useForm();

  useEffect(() => {
    LogBox.ignoreLogs([
      'Each child in a list should have a unique "key" prop.',
    ]);
  }, []);
  useEffect(() => {
    // Fetch the user &(token) from storage then navigate to our appropriate place
    const fetchUser = async () => {
      let user;
      try {
        user = await getData('user');
      } catch (e) {
        dispatch(setUserError(e));
        return e;
      }

      dispatch(restoreUserInfo({ user }));
    };

    fetchUser();
  }, []);

  const fetchList = async () => {
    const response = await getAllProducts();
    if (response.error) {
      return dispatch(setProductError(response.error));
    }
    return dispatch(getProducts(response));
  };
  useEffect(() => {
    setLoading(true);
    fetchList();
    setLoading(false);
  }, [products.length]);

  /* checks if input has string if true searches for match and returns match only */

  const filteredData =
    searchQuery.length > 0
      ? products.filter((item) => {
          const searchWord = [
            item.brand,
            ...item.tags,
            item.productName,
            item.productName_jp,
            ...item.category,
            ...item.country,
            ...item.store,
          ];
          const filterUndefined = searchWord.filter(
            (item) => !undefined && item
          );
          const result = filterUndefined.filter((item) => {
            return item.toLowerCase().includes(searchQuery);
          });
          return result.length >= 1;
        })
      : products;

  const onPress = (item) => {
    dispatch(selectProduct(item));
    navigation.navigate('ItemDetails', item);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(search(''));
    wait(2000).then(() => setRefreshing(false));
  });

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Item item={item} key={item._id} />
      </TouchableOpacity>
    );
  };

  const addProductPressed = () => {
    navigation.navigate('BarcodeReader', { screen: 'BarcodeReader' });
  };
  const backPressed = () => {
    reset();
    onRefresh();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.list}>
          <SearchBar />
          <ErrorDisplay />
          {loading ? (
            <Loading text={'Loading'} />
          ) : filteredData.length < 1 ? (
            <View>
              <View style={styles.buttonContainer}>
                <Text>No Product Found</Text>
                <Text>Please scan to add a product</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={addProductPressed}>
                  <Text style={styles.buttonText}>Scan Product</Text>
                </Pressable>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={backPressed}>
                  <Text style={styles.buttonText}>Back</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => {
                return item._id;
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
