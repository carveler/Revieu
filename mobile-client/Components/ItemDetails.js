import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  LogBox,
  StyleSheet,
} from 'react-native';
import { styles } from '../styles/style-object';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductReviews } from '../helpers/API_Calls';
import ItemReviews from './ItemReviews';
import ReviewForm from './ReviewForm';
import LoginModal from './LoginModal';
import { getReviews, selectProduct, setReviewError } from '../actions/action';
import { Rating } from 'react-native-elements';
import { Appbar } from 'react-native-paper';
import { ModalContext } from '../context/ModalContext';

const ItemDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviewReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { selectedProduct } = useSelector((state) => state.productsReducer);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { img, productName, brand, country, _id } = selectedProduct;
  const [aveRate, setAveRate] = useState();
  const { loginModalOpen, setLoginModalOpen } = useContext(ModalContext);

  useEffect(() => {
    const avarageRate = () => {
      if (reviews.length === 0) {
        return 0;
      } else {
        const rateTotal = reviews
          .map((item) => item.rate)
          .reduce((acc, cur) => acc + cur, 0);
        const ave = rateTotal / reviews.length;
        const aveMath = Math.round(ave * 10) / 10;
        return aveMath;
      }
    };
    setAveRate(avarageRate());
  }, [reviews.length]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const result = await fetchProductReviews(_id);
      if (result.error) {
        return dispatch(setReviewError(result.error));
      }
      dispatch(getReviews(result));
    };
    fetchReviews();
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => {
    return <ItemReviews item={item} />;
  };

  const onPressReview = () => {
    user ? setModalOpen(true) : setLoginModalOpen(true);
  };

  const onPressEditProduct = () => {
    dispatch(selectProduct(selectedProduct));
    user
      ? navigation.navigate('UpdateProductForm', selectedProduct)
      : setLoginModalOpen(true);
  };

  const onPressBack = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.imgContainer}>
              <Appbar.Header
                style={{ backgroundColor: 'white', width: '100%' }}
              >
                <Appbar.BackAction onPress={onPressBack} />
                <Appbar.Content title='' />
                <Appbar.Action
                  icon='square-edit-outline'
                  onPress={onPressEditProduct}
                />
              </Appbar.Header>
              <LoginModal
                setLoginModalOpen={setLoginModalOpen}
                loginModalOpen={loginModalOpen}
              />
              <Image
                source={{
                  uri: img,
                }}
                style={styles.image}
              />
              <View style={{ marginTop: 40, marginBottom: 30 }}>
                {/* <View>
                  <Text>Rating: {aveRate}</Text>
                </View> */}
                <Rating
                  readonly
                  ratingCount={5}
                  size={12}
                  imageSize={25}
                  startingValue={aveRate}
                />
              </View>
              <View>
                <View>
                  <Text>{productName}</Text>
                </View>
                <View>
                  <Text>{brand} (brand)</Text>
                </View>
                <View>
                  <Text>{country && country[0]}</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={onPressReview}>
                <Text style={styles.buttonText}>Add Review</Text>
              </Pressable>
            </View>

            <ReviewForm
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              productId={_id}
            />

            <SafeAreaView>
              <Text>
                <FlatList
                  nestedScrollEnabled={true}
                  style={styles.flatlist}
                  data={reviews}
                  renderItem={renderItem}
                  keyExtractor={(item1) => item1._id}
                />
              </Text>
            </SafeAreaView>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ItemDetails;
