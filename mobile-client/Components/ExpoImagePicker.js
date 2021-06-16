import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Modal, FAB } from 'react-native-paper';
import { stylesFab } from '../styles/style-object';
import { UPLOAD_PRESET } from '@env';

const ExpoImagePicker = ({
  setData,
  setImage,
  setPickImageModal,
  pickImageModal,
}) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.7,
    base64: true,
  };

  const pickImage = async (type) => {
    let result =
      type === 'camera'
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);
    let base64Img = `data:image/jpg;base64,${result.base64}`;

    if (!result.cancelled) {
      setImage(result.uri);
      setData({
        file: base64Img,
        upload_preset: `${UPLOAD_PRESET}`,
      });
      setPickImageModal(false);
    }
  };

  return (
    <View>
      <FAB
        style={stylesFab.fab}
        small
        icon='image-plus'
        label='Upload Image'
        onPress={() => setPickImageModal(true)}
      />

      <Modal
        visible={pickImageModal}
        animationType='slide'
        onRequestClose={() => {
          Alert.alert('Add Product Form has been closed.');
          setPickImageModal(false);
        }}
      >
        <View style={{ height: 350, width: 250 }}>
          <FAB
            style={stylesFab.fab}
            small
            icon='image-search'
            label='Choose from Gallery'
            onPress={() => pickImage()}
          />
          <FAB
            style={stylesFab.fab}
            small
            icon='camera'
            label='Take a photo'
            onPress={() => pickImage('camera')}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ExpoImagePicker;
