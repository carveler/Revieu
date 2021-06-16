import React, { useState } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { styles, stylesForm } from '../styles/style-object';
import { addReview } from '../helpers/API_Calls';
import { addNewReview, setReviewError } from '../actions/action';
import { MaterialIcons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
const { width } = Dimensions.get('window');

const ReviewForm = ({ modalOpen, setModalOpen, productId }) => {
  const dispatch = useDispatch();
  const [rateNum, setRateNum] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.userReducer);

  const ratingCompleted = (rating) => {
    setRateNum(rating);
    setDisabled(false);
  };

  const onSubmit = async (data) => {
    const { _id } = user;
    const { comment } = data;
    const review = {
      rate: rateNum,
      comment: comment && comment.trim(),
      userId: _id,
      productId,
    };

    const response = await addReview(review);
    if (response.error) {
      return dispatch(setReviewError(response.error));
    }
    dispatch(addNewReview(response));
    reset();
    setModalOpen(false);
    setRateNum(null);
    setDisabled(true);
  };

  return (
    <Modal
      visible={modalOpen}
      animationType='slide'
      onRequestClose={() => {
        Alert.alert('Review Form has been closed.');
        setModalOpen(!modalOpen);
      }}
    >
      <SafeAreaView style={stylesModal.modalContent}>
        <MaterialIcons
          name='close'
          size={24}
          onPress={() => setModalOpen(false)}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View>
            <Text style={stylesForm.label}>rate</Text>
            <AirbnbRating
              reviews={[]}
              count={5}
              size={20}
              defaultRating={0}
              showRating
              onFinishRating={ratingCompleted}
            />
            <Text style={stylesForm.label}>comment</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={stylesForm.textInputContainer}>
                  <TextInput
                    multiline
                    // numberOfLines={4}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    style={stylesForm.input}
                    style={{ width: width * 0.8, margin: 10 }}
                  />
                </View>
              )}
              name='comment'
              rules={{
                required: false,
              }}
            />
            <Text>{errors.comment?.message}</Text>

            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                <Text style={styles.buttonText}>Post</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default ReviewForm;
